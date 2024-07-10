import React from "react";
import { useRecoilValue } from "recoil";
import { itemState } from "../state";
import Image from "next/image"
import LangElement from "./lang";
import { TextKey } from "../core/lang/text-key";

const ScanedData: React.FunctionComponent = () => {
  const item = useRecoilValue<any>(itemState);

  const stringView = () => {
    return (
      <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
        <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu text</div>
        <div className="truncate">{item}</div>
      </div>
    );
  };

  const objectView = () => {
    return (
      <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
        <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu cấu trúc</div>
        {item &&
          Object.keys(item).map((k) => {
            return (
              <div className="flex w-full mt-1.5 border-b" key={k}>
                <div
                  className="flex w-2/6 text-start text-[#7B7B7D] font-semibold items-center truncate"
                >
                  <span className="truncate">{k}</span>
                </div>
                <div
                  className="flex w-4/6 font-semibold items-center text-[#001A33]"
                >
                  <span className="truncate">{item[k]}</span>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const getContent = () => {
    if (!item) return null;
    if (typeof item == "string") return stringView();
    return objectView();
  };

  if (!item) return null;

  return <div className="flex flex-col bg-white justify-center m-4">
      <div className="flex  mb-0.5 bg-[#EEEEEE] p-1 rounded-t-md">
      <Image src="/success-green.png" alt ="success icon" width={24} height={24}/>
        <span className="mx-1 text-[#00C578] font-semibold"><LangElement style="" textKey={TextKey.SCAN_SUCCESS}/></span>
      </div>
      <div className=" bg-[#F8F8F8]">
        {getContent()}
      </div>
    </div>
};

export default React.memo(ScanedData);
