"use client";

import React from "react";
import Lang from "../core/lang/lang";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { LangKey } from "../core/lang/lang-key";
import { LANG_PARAM } from "../core/const";

const LangElement: React.FunctionComponent<{ style: string, textKey: string }> = ({
  style,
  textKey,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  Lang.setLang(params.get(LANG_PARAM) as LangKey);

  return <div className={style}>{Lang.text(textKey) || textKey}</div>;
};

export default LangElement;
