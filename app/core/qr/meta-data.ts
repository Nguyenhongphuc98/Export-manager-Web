import secure from "./secure";

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
   * session of export | weigh
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


  initSession(url: string, sessionId: string, encryptedKey: string) {
    this.endpoint = url;
    this.sessionId = sessionId;
    secure.init(encryptedKey);
  }

  getFullData(data: any) {
    return new Promise((resolve) => {
      const onDone = (meta: any) => {
        this.lastData = meta;
        resolve(meta);
      };

      if (this.endpoint == "") {
        console.log("endpoint not set, use default");
        return onDone(data);
      }
      

      return fetch(this.endpoint, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: secure.aesEncrypt(data)
        })
      })
        .then(async (res) => {
          const jsonRes: JSONResponse = await res.json();
          if (jsonRes.error_code == 0) {
            onDone(secure.aesDecrypt(jsonRes.data));
          } else {
            onDone(data);
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
}
