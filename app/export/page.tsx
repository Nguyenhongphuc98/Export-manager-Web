import { TextKey } from "../core/lang/text-key";
import Header from "../ui/header";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header connected={false} channel={TextKey.SESSION_EXPIRE} />

      <div className="flex-none w-full justify-center items-center z-0">
        <div id="reader" className="h-72 bg-gray-200"></div>
        {/* <div className="w-full h-72 bg-black"></div> */}
      </div>

      {/* <div className="bg-white flex flex-col w-full h-full items-center justify-between pt-2 z-40">
        <div className="flex flex-col w-full">
          <Noti />
          <ScannedData />
        </div>
        {!noti && !item && <div></div>}
        <CopyAction />
      </div>
      <Toast /> */}
    </main>
  );
}
