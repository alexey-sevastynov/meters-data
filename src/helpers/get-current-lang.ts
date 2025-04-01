import { localStorageKeys } from "@/enums/local-storage-keys";
import { getValueFromLocalStorage } from "./get-value-from-local-storage";
import { languageKeys } from "@/enums/language-keys";

export function getCurrentLang() {
    const lang = getValueFromLocalStorage(localStorageKeys.lang);

    if (!lang || (lang !== languageKeys.en && lang !== languageKeys.ua)) {
        return languageKeys.en;
    }

    return lang;
}
