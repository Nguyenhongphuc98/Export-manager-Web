import { LangKey } from "./lang-key";
import { LangMaping, TextKey } from "./text-key";

class Lang {
    activeLang: LangKey;
    
    constructor() {
        this.activeLang = LangKey.VietNam;
    }

    setLang(key: LangKey) {
        if (Object.values(Object.values(LangKey)[0]).includes(key)) {
            this.activeLang = key;
        }
    }

    text(textKey: string) {
        if (LangMaping[textKey]) {
            return LangMaping[textKey][this.activeLang];
        } else {
            console.error("use invalid text key.", textKey);
        }
    }
}



const lang = new Lang();
export default lang;
