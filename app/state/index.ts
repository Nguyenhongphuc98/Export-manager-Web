import { atom, selector } from "recoil";
import { TextKey } from "../core/lang/text-key";
import { ExportedItemData, ExportedItemStatus } from "../core/qr/type";

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


const defaultItemState: ExportedItemData = {
  status: ExportedItemStatus.Success,
  info: {
    packageSeries: "packageSeries",
    po: "po",
    sku: "sku",
    packageId: "packageId",
    itemsInPackage: 12,
    netWeight: 100,
    grossWeight: 20,
    width: 45,
    length: 354,
    height: 3453,
  },
}
export const itemState = atom<ExportedItemData>({
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
  default: "dasdasdaf asfdsfsafas",
});

export const channelState = atom({
  key: "channel",
  default: "",
});
