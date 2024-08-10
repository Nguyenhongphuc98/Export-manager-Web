'use-client'
import Image from "next/image";
import Header from "./ui/header";
import { TextKey } from "./core/lang/text-key";
import { HeaderTag } from "./core/type";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center p-4 bg-white">
      <Header tag={HeaderTag.NO_SESSION} connected={false}/>

      <div className="flex justify-center w-full mt-20">
        <div className="flex px-4 py-6 bg-[#F5F5F5] w-60 justify-center border-2 border-[#D9D9D9] p-4">
          <Image
            className="px-1"
            src="/qrcode.png"
            width={200}
            height={200}
            alt="connected-icon"
          />
        </div>
      </div>
    </main>
  );
}
