import AppConfig from "./app-config";
import { HeaderTag } from "./type";

export const LANG_PARAM = "lang";
export const EXPORT_ID_PARAM = "eid";
export const ENCRYPT_KEY_PARAM = "ek";


// const params = {
//     cn: "Packing list - 22/11/2024"
// };

// const encodedParams = new URLSearchParams(params).toString();


export const CONNECT_ENDPOINT = AppConfig.BaseUrl + 'scanner/connect';
export const EXPORT_ENDPOINT = AppConfig.BaseUrl + 'scanner/export';
export const WEIGH_ENDPOINT = "http://164.90.186.39:8080/api/v1/mobile/weigh";

export const HEADER_PARAMS_MAP = new Map([
    [HeaderTag.EXPORT, 'eid'],
    [HeaderTag.WEIGH, 'eid'],
])
