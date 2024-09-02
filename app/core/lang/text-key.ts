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
    SCAN_NO_ITEM = 'SCAN_NO_ITEM',
    SCAN_SUCCESS_MESSAGE = 'SCAN_SUCCESS_MESSAGE',
    SCAN_DUP_MESSAGE = 'SCAN_DUP_MESSAGE',
    SCAN_INVALID_MESSAGE = 'SCAN_INVALID_MESSAGE',
    SCAN_NO_SESSION_MESSAGE = 'SCAN_NO_SESSION_MESSAGE',
    SCAN_NO_ITEM_MESSAGE = 'SCAN_NO_ITEM_MESSAGE',
    WEIGH_FIELD_NAME = 'WEIGH_FIELD_NAME',
    SUBMIT = 'SUBMIT',
    ERR_RETRY = 'ERR_RETRY',
    ERR_SCAN_AGIAN = 'ERR_SCAN_AGIAN',
    PROCESSING = 'PROCESSING',
    CONFIRM = 'CONFIRM',
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
        vi: "QUÉT TRÙNG",
        en: "Duplicated",
        zh: "重複的",
    },
    [TextKey.SCAN_INVALID]: {
        vi: "QUÉT SAI PHIÊN",
        en: "SCAN_INVALID",
        zh: "SCAN_INVALID",
    },
    [TextKey.SCAN_NO_SESSION]: {
        vi: "KHÔNG CÓ PHIÊN",
        en: "No session",
        zh: "沒有會話處理",
    },
    [TextKey.SCAN_NO_ITEM]: {
        vi: "SANE PHẨM KHÔNG TỒN TẠI",
        en: "The item does not exist",
        zh: "此產品不存在",
    },
    [TextKey.SCAN_SUCCESS_MESSAGE]: {
        vi: "Quét thành công",
        en: "SCAN SUCCESS",
        zh: "掃描碼成功",
    },
    [TextKey.SCAN_DUP_MESSAGE]: {
        vi: "Sản phẩm này đã được quét!",
        en: "This item has already been scanned",
        zh: "該商品已掃描",
    },
    [TextKey.SCAN_INVALID_MESSAGE]: {
        vi: "Sản phẩm này không nằm trong phiên",
        en: "This product is not available in session!",
        zh: "該產品在會話中不可用",
    },
    [TextKey.SCAN_NO_SESSION_MESSAGE]: {
        vi: "Phiên xử lý này không tồn tại!",
        en: "Session does not exist",
        zh: "會話不存在",
    },
    [TextKey.SCAN_NO_ITEM_MESSAGE]: {
        vi: "Sản phẩm này không tồn tại!",
        en: "This item does not exist",
        zh: "此產品不存在",
    },
    [TextKey.WEIGH_FIELD_NAME]: {
        vi: "Cân nặng",
        en: "weight",
        zh: "重量",
    },
    [TextKey.SUBMIT]: {
        vi: "Nhập",
        en: "Submit",
        zh: "輸入資料",
    },
    [TextKey.ERR_RETRY]: {
        vi: "Có lỗi, thử lại sau",
        en: "Error, retry later",
        zh: "錯誤，稍後重試",
    },
    [TextKey.ERR_SCAN_AGIAN]: {
        vi: "Có lỗi, hãy quét lại.",
        en: "Error, please scan again.",
        zh: "錯誤，請重新掃描",
    },
    [TextKey.PROCESSING]: {
        vi: "Đang xử lý.",
        en: "Processing.",
        zh: "處理中",
    },
    [TextKey.CONFIRM]: {
        vi: "Đã hiểu",
        en: "Confirm",
        zh: " 确认",
    },
}
