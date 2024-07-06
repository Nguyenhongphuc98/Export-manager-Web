import React from "react";
import Image from "next/image";
import LangElement from '../ui/lang';


const Header: React.FunctionComponent<{connected: boolean, channel: string}> = (host) => {


  return host.connected ? (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded bg-sky-100 w-ful"
    >
      <span className="text-sky-600 max-w-52 truncate">
        <LangElement textKey={host.channel}/>
        </span>
      <Image
        className="px-1 w-6"
        src="/tick.svg"
        width={40}
        height={40}
        alt="connected-icon"
      />
    </div>
  ) : (
    <div
      className="flex flex-none justify-center items-center mb-2 h-8 rounded w-full bg-[#FFF9D0]"
    >
      <span className="text-red-500"><LangElement textKey={host.channel}/></span>
      <Image
        className="px-1 w-6"
        src="/warning.png"
        width={40}
        height={40}
        alt="connected-icon"
      />
    </div>
  );
};

export default Header;
