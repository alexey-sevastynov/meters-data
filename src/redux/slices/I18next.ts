import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import englishTranslate from "../i18n/en/translation.json";
import ukraineTranslate from "../i18n/ua/translation.json";

import { defaultLang, supportedLangs } from "../i18n/config";

interface i18n {
  lang: string;
  supportedLangs: {};
  translations: any;
}

// Function to get initial language from local storage
const getInitialLang = (): string => {
  const storedLang = localStorage.getItem("lang");
  return storedLang || defaultLang;
};

const initialState: i18n = {
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
    setLang: (state, action: PayloadAction<string>) => {
      // Update language in state
      state.lang = action.payload;
      // Save language to local storage
      localStorage.setItem("lang", action.payload);
    },
  },
});
export const { setLang } = i18nSlice.actions;

export const selectTranslations = (state: any) =>
  state.i18n.translations[state.i18n.lang];

export const i18nReducer = i18nSlice.reducer;
