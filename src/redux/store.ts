import { configureStore } from "@reduxjs/toolkit";
import { servicesReducer } from "./slices/ServicesSlice";
import { metersDataReducer } from "./slices/MetersDataSlice";
import { pricesReducer } from "./slices/PriceSlice";

const store = configureStore({
  reducer: {
    services: servicesReducer,
    metersData: metersDataReducer,
    prices: pricesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
