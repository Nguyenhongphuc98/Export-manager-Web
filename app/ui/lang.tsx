"use client";

import React from "react";
import Lang from "../core/lang/lang";

const LangElement: React.FunctionComponent<{ style: string, textKey: string }> = ({
  style,
  textKey,
}) => {
  return <div className={style}>{Lang.instance().text(textKey) || textKey}</div>;
};

export default LangElement;
