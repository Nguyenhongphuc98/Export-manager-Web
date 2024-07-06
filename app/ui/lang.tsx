"use client";

import React from "react";
import Lang from "../core/lang/lang";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { LangKey } from "../core/lang/lang-key";

const LangElement: React.FunctionComponent<{ textKey: string }> = ({
  textKey,
}) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  Lang.setLang(params.get("lang") as LangKey);

  return <>{Lang.text(textKey)}</>;
};

export default LangElement;
