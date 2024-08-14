import AppConfig from "../app-config";
import { CONNECT_EXPORT_ENDPOINT, CONNECT_WEIGH_ENDPOINT, PAGE_PATH, SUBMIT_WEIGH_ENDPOINT } from "../const";
import Lang from "../lang/lang";
import { TextKey } from "../lang/text-key";
import toaster from "../toast-manager";
import { ConnectScannerStatus, DataResult, ErrorCode } from "../type";
import secure from "./secure";
import { ScannedItemData, ScannedItemStatus } from "./type";

type JSONResponse = {
  error_code: number;
  data: any;
  message: string;
};

export class MetaData {
  /**
   * endpoint to submit export or weigh
   */
  endpoint: string = "";

  /**
   * session of export<exportId> | weigh<pklId>
   * Server use this to detect session expire
   */
  sessionId: string = "";

  lastData: any;

  static _instance: MetaData;

  constructor() {}

  static instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  initSession(url: string, sesionId: string, encryptedKey: string) {
    this.endpoint = url;
    this.sessionId = sesionId;
    secure.init(encryptedKey);
  }

  getFullData(data: any): Promise<ScannedItemData> {
    return new Promise((resolve) => {
      const onDone = (meta: ScannedItemData) => {
        this.lastData = meta;
        resolve(meta);
      };

      if (this.endpoint == "") {
        console.log("endpoint not set, use default");
        return onDone(data);
      }

      return fetch(this.endpoint + `?sid=${this.sessionId}`, {
        method: "post",
        headers: { "Content-Type": "text/plain" },
        body: secure.aesEncrypt({
          subId: data,
        }),
      })
        .then(async (res) => {
          const jsonRes: JSONResponse = await res.json();

          const data: ScannedItemData =
            jsonRes.error_code == ErrorCode.SessionNotFound
              ? jsonRes.data
              : (secure.aesDecrypt(jsonRes.data) as ScannedItemData);

          switch (data.status) {
            case ScannedItemStatus.Success:
            case ScannedItemStatus.Duplicate:
            case ScannedItemStatus.InvalidItem:
            case ScannedItemStatus.ItemNotFound: {
              onDone(data);
              break;
            }
            case ScannedItemStatus.NoSession: {
              throw new Error("No session");
              break;
            }

            default:
              break;
          }
        })
        .catch((e) => {
          console.log("fail to submit data", e);
          onDone(data);
        });
    });
  }

  getLastData() {
    return this.lastData;
  }

  getChanelName(pagePath: PAGE_PATH, sessionId: string, key: string) {
    const endpoint = `${pagePath === PAGE_PATH.WEIGH ? CONNECT_WEIGH_ENDPOINT : CONNECT_EXPORT_ENDPOINT}?sid=${sessionId}`;

    return fetch(endpoint, {
      method: "get",
      headers: { "Content-Type": "text/plain" },
    })
      .then(async (res) => {

        const jsonRes: JSONResponse = await res.json();
        if (jsonRes.error_code == ErrorCode.Success) {
          const rawData: any = secure.aesDecryptUseKey(
            key,
            jsonRes.data
          ) as ScannedItemData;
          if (rawData.status === ConnectScannerStatus.Success) {
            return rawData.info.channelName;
          }
        }

        throw new Error(`fetch channel stt: ${jsonRes.error_code} - ${jsonRes.message}`);
      })
      .catch((e) => {
        console.log("fail to get chanel name", e);
        throw e;
      });
  }

  submitWeighData(weigh: number) {
    return fetch(SUBMIT_WEIGH_ENDPOINT + `?sid=${this.sessionId}`, {
      method: "post",
      headers: { "Content-Type": "text/plain" },
      body: secure.aesEncrypt({
        subId: 501,
        weigh: weigh,
      }),
    }).then(async (res) => {
      const jsonRes: JSONResponse = await res.json();
      console.log('submitWeighData done: ', jsonRes.error_code, jsonRes.message);

      if (jsonRes.error_code == ErrorCode.Success) {
        return true;
      }
      
      throw new Error('fail: ' + jsonRes.error_code);
    }).catch(e => {
      toaster.show(Lang.instance().text(TextKey.ERR_RETRY)  || '', 2000);
      console.error('submitWeighData err: ', e);
      return false;
    });
  }
}
