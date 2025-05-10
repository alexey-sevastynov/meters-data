import storage from "redux-persist/es/storage";
import { sliceNames } from "@/store/slice-names";
import { I18nProps } from "@/store/slices/i-18-next";

export const i18nPersistConfig = {
    key: sliceNames.i18n,
    storage,
    whitelist: [I18nProps.lang],
};
