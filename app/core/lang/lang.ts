import { LangKey } from "./lang-key";
import { LangMaping, TextKey } from "./text-key";

const DEFAULT_LANG_KEY = 'd_l_k';

class Lang {
    activeLang: LangKey;
    
    constructor() {
        const lang = typeof window !== 'undefined' && localStorage.getItem(DEFAULT_LANG_KEY);
        this.activeLang = lang as LangKey || LangKey.VietNam;
    }

    setLang(key: LangKey) {
        if (key) {
            this.activeLang = key;
            typeof window !== 'undefined' && localStorage.setItem(DEFAULT_LANG_KEY, key);
        }
    }

    text(textKey: string) {
        if (LangMaping[textKey]) {
            return LangMaping[textKey][this.activeLang];
        } else {
            console.info("use invalid text key.", textKey);
        }
    }
}



const lang = new Lang();
export default lang;
