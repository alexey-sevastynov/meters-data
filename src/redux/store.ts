import { configureStore } from "@reduxjs/toolkit";
import { servicesReducer } from "./slices/ServicesSlice";

const store = configureStore({
  reducer: {
    services: servicesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
