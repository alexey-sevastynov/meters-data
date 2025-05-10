import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import englishTranslate from "@/store/i18n/en/translation.json";
import ukraineTranslate from "@/store/i18n/ua/translation.json";
import { defaultLang, supportedLangs } from "@/constants/language";
import { RootState } from "@/store/store";
import { SupportedLang, TranslationsByLang } from "@/types/i-18-next-types";
import { sliceNames } from "@/store/slice-names";
import { nameOf } from "@/utils/name-of";

export const I18nProps = {
    lang: nameOf<I18nState>("lang"),
    supportedLangs: nameOf<I18nState>("supportedLangs"),
    translations: nameOf<I18nState>("translations"),
} as const;

interface I18nState {
    lang: SupportedLang;
    supportedLangs: typeof supportedLangs;
    translations: TranslationsByLang;
}

const initialState: I18nState = {
    lang: defaultLang,
    supportedLangs: { ...supportedLangs },
    translations: {
        en: englishTranslate,
        ua: ukraineTranslate,
    },
};

const i18nSlice = createSlice({
    name: sliceNames.i18n,
    initialState,
    reducers: {
        setLang: (state, action: PayloadAction<SupportedLang>) => {
            state.lang = action.payload;
        },
    },
});

export const { setLang } = i18nSlice.actions;

export const selectTranslations = (state: RootState) => state.i18n.translations[state.i18n.lang];

export const i18nReducer = i18nSlice.reducer;
