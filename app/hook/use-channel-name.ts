"use client";

import { useRecoilState } from "recoil";
import { channelState } from "../state";
import { useEffect } from "react";
import { MetaData } from "../core/qr/meta-data";
import { ENCRYPT_KEY_PARAM, PAGE_PATH, SESSION_ID_PARAM } from "../core/const";
import { useParamsValue } from "./use-params-value";
import { HeaderTag } from "../core/type";
import { TextKey } from "../core/lang/text-key";

export function useChannelName(tag: HeaderTag) {
  const [channel, setChannel] = useRecoilState<any>(channelState);
  const { sid, ek } = useParamsValue(SESSION_ID_PARAM, ENCRYPT_KEY_PARAM);

  useEffect(() => {
    let pagePath = PAGE_PATH.HOME;
    if (window.location.pathname.includes(PAGE_PATH.EXPORT)) {
      pagePath = PAGE_PATH.EXPORT;
    }
    if (window.location.pathname.includes(PAGE_PATH.WEIGH)) {
      pagePath = PAGE_PATH.WEIGH;
    }

    if (window.location.pathname == "/") {
      setChannel(TextKey.SESSION_EXPIRE);
      return;
    }

    const kickout = (e: any) => {
      if (window.location.pathname !== "/") {
        console.log('errshould kickout', e);
        // window.location.replace("/");
      }
    };

    if (!sid) {
      kickout('nosid');
      return;
    }

    //@ts-ignore
    MetaData.instance()
      .getChanelName(pagePath, sid, ek)
      .then((name) => {
        setChannel(name);
      })
      .catch((e) => {
        kickout(e);
      });
  }, [sid, ek]);

  return channel;
}
