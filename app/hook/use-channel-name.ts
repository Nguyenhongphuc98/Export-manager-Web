'use client';

import { useRecoilState } from "recoil";
import { channelState } from "../state";
import { useEffect } from "react";
import { MetaData } from "../core/qr/meta-data";
import { ENCRYPT_KEY_PARAM, HEADER_PARAMS_MAP } from "../core/const";
import { useParamsValue } from "./use-params-value";
import { HeaderTag } from "../core/type";

export function useChannelName(tag: HeaderTag) {
  const [channel, setChannel] = useRecoilState<any>(channelState);

  const type = HEADER_PARAMS_MAP.get(tag) || '';

  const { eid, wid, ek } = useParamsValue(type, ENCRYPT_KEY_PARAM);

  useEffect(() => {
    const kickout = () => {
        window.location.replace('/');
    };

    if (type && !eid && !wid) {
      kickout();
      return;
    }

    //@ts-ignore
    MetaData.instance().getChanelName(type, eid ?? wid, ek).then(name => {
        setChannel(name);
    }).catch(e => {
        kickout();
    });
  }, [eid, wid, ek, type]);

  return channel;
}
