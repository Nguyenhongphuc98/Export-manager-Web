import { LangKey } from "./lang-key"

export enum TextKey {
    EMPTY = '',
    SESSION_EXPIRE = 'SESSION_EXPIRE',
    GUIDE_SCAN = 'GUI_SCAN',
    EXPORT = 'EXPORT',
    WEIGH = 'WEIGH',
    SCAN_SUCCESS = 'SCAN_SUCCESS',
    SCAN_DUP = 'SCAN_DUP',
    SCAN_INVALID = 'SCAN_INVALID',
    SCAN_NO_SESSION = 'SCAN_NO_SESSION',
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
    [TextKey.GUIDE_SCAN]: {
        vi: "Đưa camera tới QR code để quét.",
        en: "Scan the QR code with your camera.",
        zh: "使用相机扫描 QR 码",
    },
    [TextKey.WEIGH]: {
        vi: "CÂN HÀNG",
        en: "WEIGH",
        zh: "衡量",
    },
    [TextKey.EXPORT]: {
        vi: "XUẤT HÀNG",
        en: "EXPORT",
        zh: "輸出",
    },
    [TextKey.SCAN_SUCCESS]: {
        vi: "QUÉT THÀNH CÔNG",
        en: "SCAN SUCCESS",
        zh: "掃描碼成功",
    },
    [TextKey.SCAN_DUP]: {
        vi: "Sản phẩm này đã được quét!",
        en: "SCAN_DUP",
        zh: "SCAN_DUP",
    },
    [TextKey.SCAN_INVALID]: {
        vi: "Sản phẩm này không có trong phiên!",
        en: "SCAN_INVALID",
        zh: "SCAN_INVALID",
    },
    [TextKey.SCAN_NO_SESSION]: {
        vi: "Phiên xử lý này không tồn tại!",
        en: "SCAN_DUP",
        zh: "SCAN_DUP",
    },
}
