import { configureStore } from "@reduxjs/toolkit";
import { servicesReducer } from "./slices/services-slice";
import { metersDataReducer } from "./slices/meters-data-slice";
import { pricesReducer } from "./slices/price-slice";
import { authReducer } from "./slices/auth-slice";
import { confirmReducer } from "./slices/confirm-popup-slice";
import { i18nReducer } from "./slices/i-18-next";
import { addressDataReducer } from "./slices/address-data-slice";

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
