import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";
import { TypeListUtilityPrices } from "@/types/constants";
import { toast } from "react-toastify";

export const fetchAllServices = createAsyncThunk<TypeListUtilityPrices, void, { rejectValue: AxiosError }>(
    "services/fetchAllServices",
    async () => {
        const { data } = await axios.get<TypeListUtilityPrices>(`${API_URL}prices`);

        return data;
    }
);

export const editServicePrice = createAsyncThunk<TypeListUtilityPrices, { _id: string; value: number }>(
    "editServicePrice/fetchAllServices",
    async (params) => {
        const { _id, value } = params;

        const { data }: { data: TypeListUtilityPrices } = await axios.patch(`${API_URL}prices/${_id}`, {
            value,
        });

        return data;
    }
);

interface IServicesSlice {
    services: {
        items: TypeListUtilityPrices;
        status: string;
    };

    patch: {
        status: string;
    };
}

const initialState: IServicesSlice = {
    services: {
        items: [],
        status: "loading",
    },
    patch: {
        status: "inactive",
    },
};

const ServicesSlice = createSlice({
    name: "ServicesSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllServices.pending, (state) => {
            state.services.items = [];
            state.services.status = "loading";
        });
        builder.addCase(fetchAllServices.fulfilled, (state, action) => {
            state.services.items = action.payload;
            state.services.status = "loaded";
        });
        builder.addCase(fetchAllServices.rejected, (state, action) => {
            state.services.items = [];
            state.services.status = `Error message: "${action.error.message}"`;
        });
        builder.addCase(editServicePrice.pending, (state) => {
            toast.loading("Loading...");
            state.patch.status = "loading";
        });
        builder.addCase(editServicePrice.fulfilled, (state) => {
            toast.dismiss();
            toast.success("Price changed, success! 👌");

            state.patch.status = "loaded";
        });
        builder.addCase(editServicePrice.rejected, (state) => {
            toast.dismiss();
            toast.error("Request error 🤯 😣");
            state.patch.status = "error";
        });
    },
});

export const servicesReducer = ServicesSlice.reducer;
