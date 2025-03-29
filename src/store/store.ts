import { configureStore } from "@reduxjs/toolkit";
import { servicesReducer as utilityPricesReducer } from "@/store/slices/utility-price-slice";
import { metersDataReducer } from "@/store/slices/meters-data-slice";
import { pricesReducer } from "@/store/slices/price-slice";
import { authReducer } from "@/store/slices/auth-slice";
import { confirmReducer } from "@/store/slices/confirm-popup-slice";
import { i18nReducer } from "@/store/slices/i-18-next";
import { addressDataReducer } from "@/store/slices/address-data-slice";

const store = configureStore({
    reducer: {
        addressData: addressDataReducer,
        utilityPrices: utilityPricesReducer,
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
