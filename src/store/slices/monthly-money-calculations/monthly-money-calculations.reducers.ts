import { PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { UtilityPrice } from "@/store/models/utility-price";
import { calculateUtilityData } from "@/store/slices/monthly-money-calculations/calculate-utility-data";
import { UtilityCost } from "@/types/utility-cost";
import { IMonthlyMoneyCalculationsSlice } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.types";
import { stringToNumber } from "@/utils/conversion";

export function calculatePrice(
    state: IMonthlyMoneyCalculationsSlice,
    action: PayloadAction<{ listInfoDataMonth: UtilityCost[] | null; utilityPrices: UtilityPrice[] }>
) {
    const { updatedItems, totalSum } = calculateUtilityData(
        action.payload.listInfoDataMonth,
        action.payload.utilityPrices
    );

    state.utilityCosts = updatedItems;
    state.sumMoney = totalSum;
}

export function addUtilityItem(
    state: IMonthlyMoneyCalculationsSlice,
    action: PayloadAction<{ title: string; description: string; percentDifference: number }>
) {
    const isUniqueCategory = !state.utilityCosts?.some((item) => item.title === action.payload.title);

    if (state.utilityCosts && isUniqueCategory) {
        state.utilityCosts = [
            ...state.utilityCosts,
            {
                id: v4(),
                title: action.payload.title,
                description: action.payload.description,
                percentDifference: action.payload.percentDifference,
            },
        ];

        state.sumMoney = +(state.sumMoney + stringToNumber(action.payload.description)).toFixed(1);
    }
}

export function deleteUtilityItem(
    state: IMonthlyMoneyCalculationsSlice,
    action: PayloadAction<{ title: string; value: number }>
) {
    if (state.utilityCosts) {
        const { title, value } = action.payload;
        state.utilityCosts = state.utilityCosts?.filter((item) => item.title !== title);
        state.sumMoney = +(state.sumMoney - value).toFixed(1);
    }
}

export function resetEdit(state: IMonthlyMoneyCalculationsSlice) {
    state.isEdit = false;
    state.idEdit = null;
}
