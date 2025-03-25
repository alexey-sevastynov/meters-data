import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import englishTranslate from "@/store/i18n/en/translation.json";
import ukraineTranslate from "@/store/i18n/ua/translation.json";
import { defaultLang, supportedLangs } from "@/store/i18n/config";
import { RootState } from "@/store/store";
import { SupportedLang, TranslationsByLang } from "@/types/i-18-next-types";
import { langKey } from "@/constants/language";

interface I18nState {
    lang: SupportedLang;
    supportedLangs: typeof supportedLangs;
    translations: TranslationsByLang;
}

const initialState: I18nState = {
    lang: getInitialLang(),
    supportedLangs: { ...supportedLangs },
    translations: {
        en: englishTranslate,
        ua: ukraineTranslate,
    },
};

const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<SupportedLang>) => {
            state.lang = action.payload;
            localStorage.setItem(langKey, action.payload);
        },
    },
});

export const { setLang } = i18nSlice.actions;

export const selectTranslations = (state: RootState) => state.i18n.translations[state.i18n.lang];

export const i18nReducer = i18nSlice.reducer;

function getInitialLang() {
    const storedLang = localStorage.getItem(langKey);

    if (!storedLang) return defaultLang;

    return storedLang as SupportedLang;
}
