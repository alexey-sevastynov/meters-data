import { addToastNotifications } from "@/store/toast-service";
import {
    getAllMonthlyMoneyCalculations,
    createMonthMoneyCalculations,
    updateMonthMoneyCalculations,
    deleteMonthMoneyCalculations,
    getOneMonthMoneyCalculations,
} from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";
import { statusNames } from "@/constants/status";
import { IMonthlyMoneyCalculationsSlice } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.types";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { MonthlyMoneyCalculationWithObjectId } from "@/store/models/monthly-money-calculation";

const messageSuccessAddCalculation = "Monthly expense calculations added successfully! 👌";
const messageSuccessUpdateCalculation = "Monthly expense calculations updated successfully! 👌";
const messageSuccessDeleteCalculation = "Monthly expense calculations deleted successfully! 👌";

export function extraReducers(builder: ActionReducerMapBuilder<IMonthlyMoneyCalculationsSlice>) {
    builder.addCase(getAllMonthlyMoneyCalculations.pending, (state: IMonthlyMoneyCalculationsSlice) => {
        state.items = [];
        state.status = statusNames.loading;
    });
    builder.addCase(
        getAllMonthlyMoneyCalculations.fulfilled,
        (
            state: IMonthlyMoneyCalculationsSlice,
            action: PayloadAction<MonthlyMoneyCalculationWithObjectId[]>
        ) => {
            state.items = action.payload;
            state.status = statusNames.loaded;
        }
    );
    builder.addCase(getOneMonthMoneyCalculations.fulfilled, (state, action) => {
        const dataWithPercentDifference = action.payload.data.map((item) => ({
            ...item,
            id: item.id,
            percentDifference: 0,
        }));

        state.utilityCosts = dataWithPercentDifference;
        state.sumMoney = action.payload.sumMoney;
        state.isEdit = true;

        if (action.payload._id) {
            state.idEdit = action.payload._id;
        }
    });

    addToastNotifications(builder, createMonthMoneyCalculations, { success: messageSuccessAddCalculation });
    addToastNotifications(builder, updateMonthMoneyCalculations, {
        success: messageSuccessUpdateCalculation,
    });
    addToastNotifications(builder, deleteMonthMoneyCalculations, {
        success: messageSuccessDeleteCalculation,
    });
}
