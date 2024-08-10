import { atom, selector } from "recoil";
import { TextKey } from "../core/lang/text-key";

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

export const itemState = atom({
  key: "item",
  default: "",
  // default: "d asda sdasdsa",
  // default: {
  //   QRNum: "14567",
  //   Invoice: "100.000.000 VNĐ",
  //   ItemNum: "xias124",
  //   BoxNum: "65",
  //   Amount: "34356",
  //   Remark: "asdf32f2133 asd asd adsa d dasd432",
  // },
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
  default: "Sản phẩm này đã được quét!",
});

export const channelState = atom({
  key: "channel",
  default: "",
});
