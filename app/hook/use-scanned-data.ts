import { useRecoilState } from "recoil";
import { itemState, notiState } from "../state";
import { useEffect } from "react";
import { MetaData } from "../core/qr/meta-data";
import { startScanQR } from "../core/qr/handler";
import { useSearchParams } from "next/navigation";
import { ENCRYPT_KEY_PARAM, EXPORT_ID_PARAM, SCAN_STATUS_HEADER_MAP } from "../core/const";
import { TextKey } from "../core/lang/text-key";
import { useParamsValue } from "./use-params-value";
import { ExportedItemData, ExportedItemStatus } from "../core/qr/type";
import popupManager from "../core/popup-manager";

export function useScannedData(endpoint: string) {
  const [item, setItem] = useRecoilState<ExportedItemData>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);

  const { eid, ek } = useParamsValue(EXPORT_ID_PARAM, ENCRYPT_KEY_PARAM);

  useEffect(() => {
    if (!eid || !ek) {
      window.location.replace("/");
      return;
    }

    MetaData.instance().initSession(endpoint, eid, ek);

    startScanQR((data) => {
      MetaData.instance()
        .getFullData(data)
        .then((v) => {
          setNoti(TextKey.EMPTY);
          setItem(v);

          if (v.status !== ExportedItemStatus.Success) {
            popupManager.show(SCAN_STATUS_HEADER_MAP.get(v.status) || '');
          }
        })
        .catch((e) => {
          window.location.replace("/");
        });
    });
  }, []);

  return item;
}
