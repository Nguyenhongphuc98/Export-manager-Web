import { atom, selector } from "recoil";
import { TextKey } from "../core/lang/text-key";
import { ScannedItemData, ScannedItemStatus } from "../core/qr/type";

export const hostState = atom({
  key: "host",
  default: {
    connected: false,
  },
  // default: {
  //   connected: true,
  //   host: "this is url",
  //   channel: "Cty TNHH LongView VNdsa dasfsd fdsfasdfadsf",
  // },
});


const defaultItemState: ScannedItemData = {
  uniqueId: Math.random(),
  status: ScannedItemStatus.Success,
  exportId: '1',
  info: {
    id: '1',
    packageSeries: [1,2],
    po: "po",
    // sku: "sku",
    packageId: "packageId",
    // itemsInPackage: 12,
    // netWeight: 100,
    // grossWeight: 20,
    // width: 45,
    // length: 354,
    // height: 3453,
  },
}
export const itemState = atom<ScannedItemData>({
  key: "item",//@ts-ignore
  default: "",
  // default: defaultItemState
});

export const notiState = atom({
  key: "noti",
  default: TextKey.GUIDE_SCAN,
  // default: "",
});

export const toastState = atom({
  key: "toast",
  default: "",
});

export const popupState = atom({
  key: "popup",
  default: "",
});

export const channelState = atom({
  key: "channel",
  default: "",
});

export const weighSubmittedState = atom<boolean>({
  key: "weighState",
  default: false,
});
