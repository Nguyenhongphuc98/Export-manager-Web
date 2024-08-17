const USE_PROXY = true;
const PROXY_URL = "/api/proxy";

export class API {
  static async fetch(url: string, options: RequestInit) {
    if (USE_PROXY) {
      return fetch(PROXY_URL + "?o=" + url, options);
    } else {
      return fetch(url, options);
    }
  }
}
