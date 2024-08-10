import React from "react";
import { useRecoilValue } from "recoil";
import { itemState } from "../state";
import Image from "next/image"
import LangElement from "./lang";
import { TextKey } from "../core/lang/text-key";
import { HeaderTag } from "../core/type";
import { useScannedData } from "../hook/use-scanned-data";
import { SCAN_STATUS_HEADER_MAP } from "../core/const";
import { ExportedItemData } from "../core/qr/type";

const ScanedData: React.FunctionComponent<{submitTo: string}> = ({submitTo}) => {
  const item = useScannedData(submitTo);

  // const stringView = (text: string) => {
  //   return (
  //     <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
  //       <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu text</div>
  //       <div className="truncate">{text}</div>
  //     </div>
  //   );
  // };

  const objectView = (data: ExportedItemData['info']) => {
    return (
      <div className="flex flex-col w-full h-full px-4 overflow-y-auto" style={{height: "30vh"}}>
        {/* <div className="bg-emerald-400 text-white rounded w-fit px-1 py-0.5 my-1">Dữ liệu cấu trúc</div> */}
        {data &&
          Object.keys(data).map((k) => {
            //@ts-ignore
            const value = data[k];
            return (
              <div className="flex w-full mt-1.5 border-b" key={k}>
                <div
                  className="flex w-3/6 text-start text-[#7B7B7D] font-semibold items-center truncate"
                >
                  <span className="truncate">{k}</span>
                </div>
                <div
                  className="flex w-3/6 font-semibold items-center text-[#001A33]"
                >
                  <span className="truncate">{value}</span>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  const getContent = () => {
    if (!item) return null;
    // if (typeof item == "string") return stringView(item);
    return objectView(item.info);
  };

  if (!item) return null;

  const headerTextKey = SCAN_STATUS_HEADER_MAP.get(item.status) || '';
  console.log('aabc', item);

  return <div className="flex flex-col bg-white justify-center m-4">
      <div className="flex  mb-0.5 bg-[#EEEEEE] p-1 rounded-t-md">
      <Image src="/success-green.png" alt ="success icon" width={24} height={24}/>
        <span className="mx-1 text-[#00C578] font-semibold"><LangElement style="" textKey={headerTextKey}/></span>
      </div>
      <div className=" bg-[#F8F8F8]">
        {getContent()}
      </div>
    </div>
};

export default React.memo(ScanedData);
