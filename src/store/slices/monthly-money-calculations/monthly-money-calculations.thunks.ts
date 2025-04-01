import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { createOne, deleteOne, getAll, getOne, updateOne } from "@/store/crud-service";
import {
    MonthlyMoneyCalculations,
    MonthlyMoneyCalculationsWithObjectId,
} from "@/store/models/monthly-money-calculations";
import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllMonthlyMoneyCalculations = createAsyncThunk<MonthlyMoneyCalculationsWithObjectId[]>(
    actionNames.monthlyMoneyCalculations.getAll,
    async () => getAll<MonthlyMoneyCalculationsWithObjectId>(apiEndpointNames.monthlyMoneyCalculations)
);

export const getOneMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationsWithObjectId,
    { id: string }
>(actionNames.monthlyMoneyCalculations.getOne, async ({ id }) =>
    getOne<MonthlyMoneyCalculationsWithObjectId>(apiEndpointNames.monthlyMoneyCalculations, id)
);

export const createMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculations,
    { address: string; data: CalculationDataWithId[]; sumMoney: number }
>(actionNames.monthlyMoneyCalculations.createOne, async ({ address, data, sumMoney }) =>
    createOne<MonthlyMoneyCalculations>(apiEndpointNames.monthlyMoneyCalculations, {
        address,
        data,
        sumMoney,
    })
);

export const deleteMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationsWithObjectId,
    { id: string }
>(actionNames.monthlyMoneyCalculations.deleteOne, async ({ id }) =>
    deleteOne<MonthlyMoneyCalculationsWithObjectId>(apiEndpointNames.monthlyMoneyCalculations, id)
);

export const updateMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculations[],
    {
        _id: string;
        data: CalculationDataWithId[];
        sumMoney: number;
    }
>(actionNames.monthlyMoneyCalculations.updateOne, async ({ _id, data, sumMoney }) => {
    return updateOne<MonthlyMoneyCalculations>(apiEndpointNames.monthlyMoneyCalculations, _id, {
        data,
        sumMoney,
    });
});
