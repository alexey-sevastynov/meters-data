import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants";
import { TypeListUtylityPrices } from "../../types/constants";

export const fetchAllServices = createAsyncThunk<TypeListUtylityPrices>(
  "services/fetchAllServices",
  async () => {
    const { data } = await axios.get(`${API_URL}prices`);

    return data;
  }
);

interface IServicesSlice {
  services: {
    items: TypeListUtylityPrices;
    status: string;
  };
}

const initialState: IServicesSlice = {
  services: {
    items: [],
    status: "loading",
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
    builder.addCase(fetchAllServices.rejected, (state) => {
      state.services.items = [];
      state.services.status = "error";
    });
  },
});

export const servicesReducer = ServicesSlice.reducer;
