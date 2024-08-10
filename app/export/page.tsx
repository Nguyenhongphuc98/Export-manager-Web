"use client";

import { useRecoilState } from "recoil";

import { TextKey } from "../core/lang/text-key";
import Header from "../ui/header";
import Noti from "../ui/noti";
import ScannedData from "../ui/scanned-data";
import { itemState, notiState } from "../state";
import { useScannedData } from "../hook/use-scanned-data";
import { EXPORT_ENDPOINT } from "../core/const";
import { HeaderTag } from "../core/type";


export default function Export() {

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <Header tag={HeaderTag.EXPORT} connected={true}/>

      <div className="flex-none w-full justify-center items-center">
        <div id="reader" className=" bg-red-200 w-62"></div>
      </div>

      <div className="bg-white flex flex-col w-full h-1/2 items-center justify-between pt-2">
        <div className="flex flex-col w-full">
          <Noti />
          <ScannedData submitTo={EXPORT_ENDPOINT}/>
        </div>
        <div></div>
      </div>
      {/* <Toast /> */}
    </main>
  );
}
