import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "@/App.tsx";
import "@/styles/index.scss";
import store from "@/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter basename="/meters-data">
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
