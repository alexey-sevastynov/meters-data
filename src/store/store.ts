import { configureStore } from "@reduxjs/toolkit";
import { utilityPricesReducer } from "@/store/slices/utility-price-slice";
import { metersDataReducer } from "@/store/slices/meters-data/slice";
import { monthlyMoneyCalculationsReducer } from "@/store/slices/monthly-money-calculations/slice";
import { authReducer } from "@/store/slices/auth-slice";
import { confirmReducer } from "@/store/slices/confirm-popup-slice";
import { i18nReducer } from "@/store/slices/i-18-next";
import { billingAccountsReducer } from "@/store/slices/billing-account-slice";

const store = configureStore({
    reducer: {
        billingAccounts: billingAccountsReducer,
        utilityPrices: utilityPricesReducer,
        metersData: metersDataReducer,
        monthlyMoneyCalculations: monthlyMoneyCalculationsReducer,
        auth: authReducer,
        confirm: confirmReducer,
        i18n: i18nReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
