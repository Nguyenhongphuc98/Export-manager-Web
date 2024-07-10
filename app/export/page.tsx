"use client"

import { useRecoilState } from "recoil";

import { TextKey } from "../core/lang/text-key";
import Header from "../ui/header";
import Noti from "../ui/noti";
import ScannedData from "../ui/scanned-data";
import { itemState, notiState } from "../state";
import { useScannedData } from "../hook/use-scanned-data";
import { CHANNEL_NAME_PARAM, EXPORT_ENDPOINT } from "../core/const";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [item] = useRecoilState<any>(itemState);
  const [noti] = useRecoilState(notiState);

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const channel = params.get(CHANNEL_NAME_PARAM) || '';

  useScannedData(EXPORT_ENDPOINT);

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-white">
      <Header tag="EXPORT" connected={true} channel={channel} />

      <div className="flex-none w-full justify-center items-center z-0">
        <div id="reader" className=" bg-gray-200"></div>
      </div>

      <div className="bg-white flex flex-col w-full h-full items-center justify-between pt-2 z-40">
        <div className="flex flex-col w-full">
          <Noti />
          <ScannedData />
        </div>
        <div></div>
      </div>
      {/* <Toast /> */}
    </main>
  );
}
