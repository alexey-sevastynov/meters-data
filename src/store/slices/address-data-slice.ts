import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";
import { BillingAccount } from "@/store/models/billing-account";
import { statusNames, StatusType } from "@/constants/status";
import { API_PATH } from "@/constants/api-path";
import { ERROR_MESSAGE } from "@/constants/error-message";
import { actionNames } from "../action-names";

export const fetchAllAddressData = createAsyncThunk<BillingAccount[], void, { rejectValue: AxiosError }>(
    actionNames.addressData.fetchAll,
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<BillingAccount[]>(`${API_URL}${API_PATH.utilityAccounts}`);
            return data;
        } catch (error: unknown) {
            if (error instanceof AxiosError && !error.response) {
                throw error;
            }

            return rejectWithValue(error as AxiosError);
        }
    }
);

interface IAddressDataSlice {
    items: BillingAccount[];
    status: StatusType;
    error: string | null;
}

const initialState: IAddressDataSlice = {
    items: [],
    status: statusNames.inactive,
    error: null,
};

const AddressDataSlice = createSlice({
    name: "AddressDataSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllAddressData.pending, (state) => {
            state.items = [];
            state.status = statusNames.loading;
            state.error = null;
        });
        builder.addCase(fetchAllAddressData.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = statusNames.loaded;
            state.error = null;
        });
        builder.addCase(fetchAllAddressData.rejected, (state, action) => {
            state.items = [];
            state.status = statusNames.error;
            state.error = `${ERROR_MESSAGE} "${action.error.message}"`;
        });
    },
});

export const addressDataReducer = AddressDataSlice.reducer;
