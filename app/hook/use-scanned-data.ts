import { useRecoilState } from "recoil";
import { itemState, notiState } from "../state";
import { useEffect } from "react";
import { MetaData } from "../core/qr/meta-data";
import { startScanQR } from "../core/qr/handler";
import { useSearchParams } from "next/navigation";
import { ENCRYPT_KEY_PARAM, SESSION_ID_PARAM } from "../core/const";
import { TextKey } from "../core/lang/text-key";
export function useScannedData(endpoint: string) {
  const [item, setItem] = useRecoilState<any>(itemState);
  const [noti, setNoti] = useRecoilState(notiState);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const session = params.get(SESSION_ID_PARAM);
  const key = params.get(ENCRYPT_KEY_PARAM);

  useEffect(() => {
    if (!session || !key) {
      window.location.replace('/');
      return;
    }

    MetaData.instance().initSession(endpoint, session, key);

    startScanQR((data) => {
      MetaData.instance()
          .getFullData(data)
          .then((v) => {
            setNoti(TextKey.EMPTY);
            setItem(v);
          });
    });
  }, []);
}
