import AppConfig from "./app-config";
import { TextKey } from "./lang/text-key";
import { ScannedItemStatus } from "./qr/type";
import { HeaderTag } from "./type";

export const LANG_PARAM = "lang";
export const EXPORT_ID_PARAM = "eid";
export const WEIGH_ID_PARAM = "wid";
export const ENCRYPT_KEY_PARAM = "ek";
export const SESSION_ID_PARAM = "sid";


// const params = {
//     cn: "Packing list - 22/11/2024"
// };

// const encodedParams = new URLSearchParams(params).toString();


export const CONNECT_WEIGH_ENDPOINT = AppConfig.BaseUrl + 'scanner/connectw';
export const CONNECT_EXPORT_ENDPOINT = AppConfig.BaseUrl + 'scanner/connecte';
export const EXPORT_ENDPOINT = AppConfig.BaseUrl + 'scanner/export';
export const GET_WEIGH_ENDPOINT = AppConfig.BaseUrl + 'scanner/gweigh';
export const SUBMIT_WEIGH_ENDPOINT = AppConfig.BaseUrl + 'scanner/uweigh';

export enum PAGE_PATH {
    HOME = '/',
    EXPORT = '/export',
    WEIGH = '/weigh',
} 

export const SCAN_STATUS_HEADER_MAP = new Map([
    [ScannedItemStatus.Success, TextKey.SCAN_SUCCESS],
    [ScannedItemStatus.Duplicate, TextKey.SCAN_DUP],
    [ScannedItemStatus.InvalidItem, TextKey.SCAN_INVALID],
    [ScannedItemStatus.NoSession, TextKey.SCAN_NO_SESSION],
    [ScannedItemStatus.ItemNotFound, TextKey.SCAN_NO_ITEM],
]);

export const SCAN_STATUS_MESSAGE_MAP = new Map([
    [ScannedItemStatus.Success, TextKey.SCAN_SUCCESS_MESSAGE],
    [ScannedItemStatus.Duplicate, TextKey.SCAN_DUP_MESSAGE],
    [ScannedItemStatus.InvalidItem, TextKey.SCAN_INVALID_MESSAGE],
    [ScannedItemStatus.NoSession, TextKey.SCAN_NO_SESSION_MESSAGE],
    [ScannedItemStatus.ItemNotFound, TextKey.SCAN_NO_ITEM_MESSAGE],
]);


export const VISIBLE_SCANNED_FIELDS = new Set(['packageSeries', 'po', 'packageId']);
