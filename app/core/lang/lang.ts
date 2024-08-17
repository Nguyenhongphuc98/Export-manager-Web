'use client'

import { LangKey } from "./lang-key";
import { LangMaping, TextKey } from "./text-key";

const DEFAULT_LANG_KEY = 'd_l_k';

export default class Lang {
    activeLang: LangKey;

    private static _instance: Lang;
    
    constructor() {
        const lang = typeof window !== 'undefined' && localStorage.getItem(DEFAULT_LANG_KEY);
        this.activeLang = lang as LangKey || LangKey.VietNam;
        // this.activeLang = LangKey.VietNam;
    }

    public static instance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    setLang(key: LangKey) {
        if (key) {
            this.activeLang = key;
            typeof window !== 'undefined' && localStorage.setItem(DEFAULT_LANG_KEY, key);
        }
    }

    text(textKey: string = '') {
        if (!textKey) {
            return '';
        }

        if (LangMaping[textKey]) {
            return LangMaping[textKey][this.activeLang];
        } else {
            console.info("use invalid text key.", textKey);
            return textKey;
        }
    }
}
