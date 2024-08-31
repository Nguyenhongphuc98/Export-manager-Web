import { useRecoilState } from "recoil";
import { itemState, notiState, weighSubmittedState } from "../state";
import { useEffect } from "react";
import { MetaData } from "../core/qr/meta-data";
import { startScanQR } from "../core/qr/handler";
import { ENCRYPT_KEY_PARAM, EXPORT_ID_PARAM, SCAN_STATUS_MESSAGE_MAP, SESSION_ID_PARAM, WEIGH_ID_PARAM } from "../core/const";
import { TextKey } from "../core/lang/text-key";
import { useParamsValue } from "./use-params-value";
import { ScannedItemData, ScannedItemStatus } from "../core/qr/type";
import popupManager from "../core/popup-manager";
import Lang from "../core/lang/lang";
import toaster from "../core/toast-manager";

export function useScannedData(endpoint: string) {
  const [item, setItem] = useRecoilState<ScannedItemData>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);

  const [submitted, setSubmitted] =
    useRecoilState<boolean>(weighSubmittedState);

  const { sid, ek } = useParamsValue(SESSION_ID_PARAM, ENCRYPT_KEY_PARAM);

  useEffect(() => {
    const kickout = () => {
      window.location.replace("/");
    }
    if (!sid || !ek) {
      kickout();
      return;
    }

    MetaData.instance().initSession(endpoint, sid, ek);

    startScanQR((data) => {
      toaster.show(Lang.instance().text(TextKey.PROCESSING) || "");
      MetaData.instance()
        .getFullData(data)
        .then((v) => {
          setNoti(TextKey.EMPTY);
          setItem(v);
          setSubmitted(false);

          if (v.status !== ScannedItemStatus.Success) {
            popupManager.show(Lang.instance().text(SCAN_STATUS_MESSAGE_MAP.get(v.status)));
          }
        })
        .catch((e) => {
          console.error('scan error: ', e);
          kickout();
        });
    });
  }, [endpoint, sid, ek]);

  return item;
}
