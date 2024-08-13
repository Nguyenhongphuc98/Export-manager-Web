import AppConfig from "../app-config";
import { CONNECT_ENDPOINT, SUBMIT_WEIGH_ENDPOINT } from "../const";
import { TextKey } from "../lang/text-key";
import { ConnectScannerStatus, DataResult, ErrorCode } from "../type";
import secure from "./secure";
import { ScannedItemData, ScannedItemStatus } from "./type";

type JSONResponse = {
  error_code: number;
  data: any;
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

  getChanelName(type: "eid | wid", sessionId: string, key: string) {
    if (!type) {
      return Promise.resolve(TextKey.SESSION_EXPIRE);
    }

    const endpoint = `${CONNECT_ENDPOINT}?${type}=${sessionId}`;

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

        throw new Error(`fetch channel stt: ${jsonRes.error_code}`);
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
        subId: this.getLastData()?.id,
      }),
    })
  }
}
