import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getAllResource, updateResource } from "@/store/crud-service";
import { UtilityPrice } from "@/store/models/utility-price";
import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { StatusName, statusNames } from "@/constants/status";
import { toastService } from "@/store/toast-service";

const sliceName = "utilityPrices";
const messageSuccessUpdate = "Price changed, success! 👌";

export const getAllUtilityPrice = createAsyncThunk<UtilityPrice[], void, { rejectValue: AxiosError }>(
    actionNames.utilityPrice.getAll,
    async () => getAllResource<UtilityPrice>(apiEndpointNames.utilityPrises)
);

export const updateUtilityPrice = createAsyncThunk<UtilityPrice[], { _id: string; value: number }>(
    actionNames.utilityPrice.update,
    async ({ _id, value }) => {
        return updateResource<UtilityPrice>(apiEndpointNames.utilityPrises, _id, { value });
    }
);

interface IUtilityPriceState {
    items: UtilityPrice[];
    status: StatusName;
    errorMessage?: string;
}

const initialState: IUtilityPriceState = {
    items: [],
    status: statusNames.inactive,
};

const utilityPriceSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllUtilityPrice.pending, (state) => {
            state.items = [];
            state.status = statusNames.loading;
            state.errorMessage = undefined;
        });
        builder.addCase(getAllUtilityPrice.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = statusNames.loaded;
            state.errorMessage = undefined;
        });
        builder.addCase(getAllUtilityPrice.rejected, (state, action) => {
            state.items = [];
            state.status = statusNames.error;
            state.errorMessage = action.error.message;
        });

        builder.addCase(updateUtilityPrice.pending, () => {
            toastService.loading();
        });
        builder.addCase(updateUtilityPrice.fulfilled, () => toastService.success(messageSuccessUpdate));
        builder.addCase(updateUtilityPrice.rejected, () => toastService.error());
    },
});

export const servicesReducer = utilityPriceSlice.reducer;
