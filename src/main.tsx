import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@/components/context/theme-provider/ThemeProvider";
import App from "@/App.tsx";
import "@/styles/index.scss";
import store from "@/store/store.ts";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/meters-data">
                <PersistGate persistor={persistor}>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
