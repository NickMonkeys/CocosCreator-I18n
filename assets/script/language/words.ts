import I18n, { ELanguage, ELanguageEventType } from "./I18n";
import CH from "./i18n/CH";
import EN from "./i18n/EN";

const words = new Proxy(CH, {
    get: (target, p: string, receiver: any) => {
        if (I18n.language === ELanguage.EN) {
            target = EN;
        }
        return target[p];
    },
});
export default words;
