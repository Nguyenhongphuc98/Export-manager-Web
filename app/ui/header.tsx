'use client'

import React, { useState } from "react";
import Image from "next/image";
import LangElement from "./lang";
import { useChannelName } from "../hook/use-channel-name";
import { HeaderTag } from "../core/type";
import useAudioCtxPlayer from "../hook/use-audio-ctx";
// import useAudioPlayer from "../hook/useAudio";

const Header: React.FunctionComponent<{
  tag: HeaderTag;
  connected: boolean;
}> = (host) => {
  const channel = useChannelName(host.tag);
  // const { play, pause, stop } = useAudioPlayer('/phone.mp3');
  const { mute, unmute } = useAudioCtxPlayer();
  
  const [muted, setMuted] = useState(true);

  return host.connected ? (
    <div className="flex flex-none justify-center items-center mb-2 h-8 rounded w-full bg-[#E5EFFF]">
       <Image
        className="px-1 w-6"
        src={muted ? "/mute.png" : "/speaker.png"}
        width={40}
        height={40}
        alt="connected-icon"
        onClick={() => {
          if (muted) {
            unmute();
          } else {
            mute();
          }
          setMuted(!muted);
        }}
      />
      {host.tag && <>
      <LangElement style="text-[#5198FF] font-semibold" textKey={host.tag}/>
      <div className="w-0.5 h-5 bg-[#969595] mx-2"></div>
      </>}
      <span className="text-[#5198FF] max-w-52 truncate">
        <LangElement style="" textKey={channel} />
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
    <div className="flex flex-none justify-center items-center mb-2 h-8 rounded w-full bg-[#FFF9D0]">
      <span className="text-red-500">
        <LangElement style="" textKey={channel} />
      </span>
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
