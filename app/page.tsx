import Image from "next/image";
import Header from "./ui/header";
import { TextKey } from "./core/lang/text-key";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header connected={false} channel={TextKey.SESSION_EXPIRE} />
    </main>
  );
}
