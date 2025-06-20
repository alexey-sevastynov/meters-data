import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getAll } from "@/store/crud-service";
import { BillingAccount } from "@/store/models/billing-account";
import { statusNames, StatusName } from "@/constants/status";
import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { sliceNames } from "@/store/slice-names";

export const getAllBillingAccounts = createAsyncThunk<BillingAccount[], void, { rejectValue: AxiosError }>(
    actionNames.billingAccount.getAll,
    async () => getAll<BillingAccount>(apiEndpointNames.billingAccounts)
);

interface IBillingAccountSlice {
    items: BillingAccount[];
    status: StatusName;
    errorMessage?: string;
}

const initialState: IBillingAccountSlice = {
    items: [],
    status: statusNames.inactive,
    errorMessage: undefined,
};

const billingAccountSlice = createSlice({
    name: sliceNames.billingAccounts,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllBillingAccounts.pending, (state) => {
            state.items = [];
            state.status = statusNames.loading;
            state.errorMessage = undefined;
        });
        builder.addCase(getAllBillingAccounts.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = statusNames.loaded;
            state.errorMessage = undefined;
        });
        builder.addCase(getAllBillingAccounts.rejected, (state, action) => {
            state.items = [];
            state.status = statusNames.error;
            state.errorMessage = action.error.message;
        });
    },
});

export const billingAccountsReducer = billingAccountSlice.reducer;
