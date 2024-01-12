import { createSlice } from "@reduxjs/toolkit";

interface IAuthSlice {
  isAuth: boolean;
}

const initialState: IAuthSlice = {
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuth = true;
    },
    logOut: (state) => {
      state.isAuth = false;
    },
  },
});

export const { logIn, logOut } = AuthSlice.actions;

export const authReducer = AuthSlice.reducer;
