import { createSlice } from "@reduxjs/toolkit";

interface IAuthSlice {
    isAuth: boolean;
}

const initialState: IAuthSlice = {
    // Trying to load isAuth from localStorage, if unsuccessful, set the default value (false)
    isAuth: loadAuthFromLocalStorage() || false,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        logIn: (state) => {
            state.isAuth = true;
            // We save isAuth in localStorage upon successful login
            saveAuthToLocalStorage(true);
        },
        logOut: (state) => {
            state.isAuth = false;
            // Saving isAuth in localStorage upon exit
            saveAuthToLocalStorage(false);
        },
    },
});

export const { logIn, logOut } = AuthSlice.actions;

export const authReducer = AuthSlice.reducer;

function loadAuthFromLocalStorage() {
    try {
        const serializedAuth = localStorage.getItem("isAuth");

        if (!serializedAuth) return undefined;

        const isAuth = JSON.parse(serializedAuth) as boolean;

        return isAuth;
    } catch (err) {
        return undefined;
    }
}

function saveAuthToLocalStorage(isAuth: boolean) {
    const serializedAuth = JSON.stringify(isAuth);
    localStorage.setItem("isAuth", serializedAuth);
}
