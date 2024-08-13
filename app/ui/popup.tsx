import React, { useEffect } from "react";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { popupState } from "../state";
import popupManager from "../core/popup-manager";
import Lang from "../core/lang/lang";
import { useSearchParams } from "next/navigation";
import { LangKey } from "../core/lang/lang-key";
import { LANG_PARAM } from "../core/const";

const Popup: React.FunctionComponent = (props: any) => {
  const [message, setMessage] = useRecoilState<any>(popupState);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  Lang.instance().setLang(params.get(LANG_PARAM) as LangKey);

  useEffect(
    () => {
      popupManager.setExecutor(setMessage);
      return () => {};
    },
    //eslint-disable-next-line
    []
  );

  const closePopup = () => {
    console.log("clickkk");
    popupManager.close();
  };

  if (message == "") {
    return null;
  }

  return (
    <>
      <div className="fixed flex justify-center items-center w-screen h-screen z-30 top-0 bg-black bg-opacity-40">
        <div className="flex flex-col justify-center items-center bg-white text-[#EF4E49] w-5/6 h-fit rounded-md py-2 wrap text-center">
          <Image
            className="px-1"
            src="/warning.png"
            width={52}
            height={52}
            alt="connected-icon"
          />
          <span className="font-bold m-2">{message}</span>
          <button
            onClick={closePopup}
            className="bg-[#F5832F] w-fit py-1 px-4 m-4 rounded-md text-white text-lg focus:bg-[#f96a01]"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Popup);
