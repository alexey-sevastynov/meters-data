import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { utilityPricesReducer } from "@/store/slices/utility-price-slice";
import { metersDataReducer } from "@/store/slices/meters-data/slice";
import { monthlyMoneyCalculationsReducer } from "@/store/slices/monthly-money-calculations/slice";
import { authReducer } from "@/store/slices/auth-slice";
import { confirmReducer } from "@/store/slices/confirm-popup-slice";
import { i18nReducer } from "@/store/slices/i-18-next";
import { billingAccountsReducer } from "@/store/slices/billing-account-slice";
import { sliceNames } from "@/store/slice-names";
import { i18nPersistConfig } from "@/store/i18n/i-18-n-persist-config";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        sliceNames.billingAccounts,
        sliceNames.utilityPrices,
        sliceNames.metersData,
        sliceNames.monthlyMoneyCalculations,
        sliceNames.auth,
        sliceNames.confirm,
    ],
};

const reducer = combineReducers({
    billingAccounts: billingAccountsReducer,
    utilityPrices: utilityPricesReducer,
    metersData: metersDataReducer,
    monthlyMoneyCalculations: monthlyMoneyCalculationsReducer,
    auth: authReducer,
    confirm: confirmReducer,
    i18n: persistReducer(i18nPersistConfig, i18nReducer),
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
