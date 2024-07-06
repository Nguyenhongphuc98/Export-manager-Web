import { LangKey } from "./lang-key"

export enum TextKey {
    SESSION_EXPIRE = 'SESSION_EXPIRE',
};

type LangMapingItem = {
    [LangKey.VietNam]: string,
    [LangKey.English]: string,
    [LangKey.Chinese]: string,
}

export const LangMaping: Record<string, LangMapingItem> = {
    [TextKey.SESSION_EXPIRE]: {
        vi: "Phiên xử lý đã hết hạn.",
        en: "The session has expired.",
        zh: "会话已过期",
    },
}
