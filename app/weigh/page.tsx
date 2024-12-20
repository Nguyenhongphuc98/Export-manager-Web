"use client";

import Header from "../ui/header";
import Noti from "../ui/noti";
import ScannedData from "../ui/scanned-data";
import { EXPORT_ENDPOINT, GET_WEIGH_ENDPOINT } from "../core/const";
import { HeaderTag } from "../core/type";
import LangElement from "../ui/lang";
import { TextKey } from "../core/lang/text-key";
import { useRecoilState } from "recoil";
import { itemState, weighSubmittedState } from "../state";
import Image from "next/image";
import { MetaData } from "../core/qr/meta-data";
import { useState } from "react";
import { ScannedItemData } from "../core/qr/type";
import toaster from "../core/toast-manager";

export default function Weigh() {
  const [submitted, setSubmitted] =
    useRecoilState<boolean>(weighSubmittedState);
  const [weighInput, setWeighInput] = useState("");
  const [item, setItem] = useRecoilState<ScannedItemData>(itemState);

  const submitWeighData = () => {
    if (!item || !item.info || !item.info.id) {
      toaster.show(TextKey.ERR_SCAN_AGIAN, 2000);
      return;
    }

    MetaData.instance()
      .submitWeighData(Number(item?.info?.id), Number(weighInput))
      .then((success) => {
        if (success) {
          setSubmitted(true);
        }
      });
  };

  const onWeighInputChange = (e: any) => {
    setWeighInput(e.target.value);
  };

  const weighInputView = () => {
    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="flex w-full mt-1 px-4 py-2 bg-[#EEEEEE]" key="wfn">
          <div className="flex w-3/6 text-start text-[#414E5A] font-semibold items-center truncate">
            <span className="truncate">
              <LangElement style="" textKey={TextKey.WEIGH_FIELD_NAME} />
            </span>
          </div>
          <div className="flex w-3/6 font-semibold items-center text-[#001A33]">
            <div className="flex space-x-1">
              {submitted && (
                <div className="flex">
                  <input
                    onChange={onWeighInputChange}
                    value={weighInput}
                    type="number"
                    id="wip"
                    className="w-24 border rounded-sm border-[#66DCAE]"
                  ></input>
                  <Image
                    className="px-1 w-6 relative right-6"
                    src="/tick.svg"
                    width={50}
                    height={50}
                    alt="connected-icon"
                  />
                </div>
              )}

              {!submitted && (
                <input
                  onChange={onWeighInputChange}
                  value={weighInput}
                  type="number"
                  id="wip"
                  className="w-24 border rounded-sm border-[#F9B582]"
                ></input>
              )}
              <div className="text-red-500 bg-[#FCFCFC] w-12 rounded-sm text-center">
                Kg
              </div>
            </div>
          </div>
        </div>
        {!allowHitButton && (
          <button
            className={`mb-10 text-white font-semibold rounded-md h-10 w-3/4 bg-[#D9D9D9]`}
          >
            <LangElement style="" textKey={TextKey.SUBMIT} />
          </button>
        )}
        {allowHitButton && (
          <button
            className={`mb-10 text-white font-semibold rounded-md h-10 w-3/4 bg-[#0068FF] active:bg-blue-500`}
            onClick={submitWeighData}
          >
            <LangElement style="" textKey={TextKey.SUBMIT} />
          </button>
        )}
      </div>
    );
  };

  const allowHitButton = !submitted && weighInput;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <Header tag={HeaderTag.WEIGH} connected={true} />

      <div className="flex-none w-full justify-center items-center">
        <div id="reader" className=" bg-red-200 w-62"></div>
      </div>

      <div className="bg-white flex flex-col w-full h-1/2 items-center justify-between pt-2">
        <div className="flex flex-col w-full items-center">
          <Noti />
          <ScannedData submitTo={GET_WEIGH_ENDPOINT} footerr={weighInputView} />
        </div>
        <div></div>
      </div>
      {/* <Toast /> */}
    </main>
  );
}
