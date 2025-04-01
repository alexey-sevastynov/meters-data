import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.types";
import { extraReducers } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.builders";
import * as reducers from "@/store/slices/monthly-money-calculations/monthly-money-calculations.reducers";

export const sliceName = "monthlyMoneyCalculations";

const monthlyMoneyCalculationsSlice = createSlice({
    name: sliceName,
    initialState,
    reducers,
    extraReducers,
});

export const { calculatePrice, addUtilityItem, deleteUtilityItem, resetEdit } =
    monthlyMoneyCalculationsSlice.actions;

export const monthlyMoneyCalculationsReducer = monthlyMoneyCalculationsSlice.reducer;
