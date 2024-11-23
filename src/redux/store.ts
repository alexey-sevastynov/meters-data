import { configureStore } from "@reduxjs/toolkit";
import { servicesReducer } from "./slices/ServicesSlice";
import { metersDataReducer } from "./slices/MetersDataSlice";
import { pricesReducer } from "./slices/PriceSlice";
import { authReducer } from "./slices/AuthSlice";
import { confirmReducer } from "./slices/ConfirmPopupSlice";
import { i18nReducer } from "./slices/I18next";
import { addressDataReducer } from "./slices/AddressDataSlice";

const store = configureStore({
  reducer: {
    addressData: addressDataReducer,
    services: servicesReducer,
    metersData: metersDataReducer,
    prices: pricesReducer,
    auth: authReducer,
    confirm: confirmReducer,
    i18n: i18nReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
