import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/slice-names";

interface IConfirmPopup {
    isOpen: boolean;
    message: string;
    isActionDeleteItem: boolean;
    isActionExit: boolean;
    idDeleteItem: null | string;
}

const initialState: IConfirmPopup = {
    isOpen: false,
    message: "",
    isActionDeleteItem: false, // signal for component ItemMetersData, useEffect
    isActionExit: false, // signal for component Auth, useEffect for exit for app
    idDeleteItem: null, // id item in component ItemMetersData for delete item !
};

const ConfirmPopup = createSlice({
    name: sliceNames.confirm,
    initialState,
    reducers: {
        openPopup: (state) => {
            state.isOpen = true;
        },
        closePopup: (state) => {
            state.isOpen = false;
        },
        setQuestion: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        isActionToggle: (state, action: PayloadAction<boolean>) => {
            state.isActionDeleteItem = action.payload;
        },
        confirmActionOnDelete: (state, action: PayloadAction<boolean>) => {
            state.isOpen = false;
            state.isActionDeleteItem = action.payload;
        },
        confirmActionExit: (state, action: PayloadAction<boolean>) => {
            state.isOpen = false;
            state.isActionExit = action.payload;
        },
        setIdDelete: (state, action: PayloadAction<string | null>) => {
            state.idDeleteItem = action.payload;
        },
    },
});

export const {
    openPopup,
    closePopup,
    setQuestion,
    isActionToggle,
    confirmActionOnDelete,
    setIdDelete,
    confirmActionExit,
} = ConfirmPopup.actions;

export const confirmReducer = ConfirmPopup.reducer;
