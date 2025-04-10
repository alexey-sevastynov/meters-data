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

const persistConfig = {
    key: "root",
    storage,
};

const reducer = combineReducers({
    billingAccounts: billingAccountsReducer,
    utilityPrices: utilityPricesReducer,
    metersData: metersDataReducer,
    monthlyMoneyCalculations: monthlyMoneyCalculationsReducer,
    auth: authReducer,
    confirm: confirmReducer,
    i18n: i18nReducer,
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
