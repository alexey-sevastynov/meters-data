import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { createOne, deleteOne, getAll, getOne, updateOne } from "@/store/crud-service";
import {
    MonthlyMoneyCalculation,
    MonthlyMoneyCalculationWithObjectId,
} from "@/store/models/monthly-money-calculation";
import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllMonthlyMoneyCalculations = createAsyncThunk<MonthlyMoneyCalculationWithObjectId[]>(
    actionNames.monthlyMoneyCalculations.getAll,
    async () => getAll<MonthlyMoneyCalculationWithObjectId>(apiEndpointNames.monthlyMoneyCalculations)
);

export const getOneMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationWithObjectId,
    { id: string }
>(actionNames.monthlyMoneyCalculations.getOne, async ({ id }) =>
    getOne<MonthlyMoneyCalculationWithObjectId>(apiEndpointNames.monthlyMoneyCalculations, id)
);

export const createMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculation,
    { address: string; data: CalculationDataWithId[]; sumMoney: number }
>(actionNames.monthlyMoneyCalculations.createOne, async ({ address, data, sumMoney }) =>
    createOne<MonthlyMoneyCalculation>(apiEndpointNames.monthlyMoneyCalculations, {
        address,
        data,
        sumMoney,
    })
);

export const deleteMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationWithObjectId,
    { id: string }
>(actionNames.monthlyMoneyCalculations.deleteOne, async ({ id }) =>
    deleteOne<MonthlyMoneyCalculationWithObjectId>(apiEndpointNames.monthlyMoneyCalculations, id)
);

export const updateMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculation[],
    {
        _id: string;
        data: CalculationDataWithId[];
        sumMoney: number;
    }
>(actionNames.monthlyMoneyCalculations.updateOne, async ({ _id, data, sumMoney }) => {
    return updateOne<MonthlyMoneyCalculation>(apiEndpointNames.monthlyMoneyCalculations, _id, {
        data,
        sumMoney,
    });
});
