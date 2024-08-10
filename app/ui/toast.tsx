import React, { Children, useEffect } from "react";

import { useRecoilState } from "recoil";
import { toastState } from "../state";

import Toaster from "../core/toast-manager";

const Toast: React.FunctionComponent = (props: any) => {
  const [toast, setToast] = useRecoilState<any>(toastState);

  useEffect(
    () => {
      Toaster.setExecutor(setToast);
      return () => {};
    },
    //eslint-disable-next-line
    []
  );

  if (toast == "") {
    return null;
  }

  return (
    <>
      <div className="fixed flex justify-center items-center w-screen h-screen z-50">
        <div className="flex justify-center bg-black text-white w-2/3 h-fit rounded-md py-2 wrap text-center opacity-70">
          {toast}
        </div>
      </div>
    </>
  );
};

export default React.memo(Toast);
