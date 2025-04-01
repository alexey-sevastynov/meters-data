import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/store/slices/meters-data/meters-data.types";
import * as reducers from "@/store/slices/meters-data/meters-data.reducers";
import { extraReducers } from "@/store/slices/meters-data/meters-data.builders";

const sliceName = "metersData";

const metersDataSlice = createSlice({
    name: sliceName,
    initialState,
    reducers,
    extraReducers,
});

export const { setMeterDataEdit, setNotEdit, showMeterReadingCalc } = metersDataSlice.actions;

export const metersDataReducer = metersDataSlice.reducer;
