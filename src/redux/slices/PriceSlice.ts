import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { ListInfoDataMonthType } from "./MetersDataSlice";
import { TypeListUtylityPrices } from "@/types/constants";
import { MonthlyMoneyCalculationsType } from "@/types/MonthlyMoneyCalculationsType";
import axios, { AxiosError } from "axios";
import { API_URL } from "@/constants";
import { AddressType } from "@/types/MeterDataType";

export const fetchAllMonthlyMoneyCalculations = createAsyncThunk<
  MonthlyMoneyCalculationsType[],
  void,
  { rejectValue: AxiosError }
>(
  "MonthlyMoneyCalculations/fetchAllMonthlyMoneyCalculations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<MonthlyMoneyCalculationsType[]>(
        `${API_URL}monthlymoneycalculations`
      );
      return data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error as AxiosError);
    }
  }
);

export const getOneMonthMoneyCalculations = createAsyncThunk<
  MonthlyMoneyCalculationsType,
  { id: string }
>("MonthlyMoneyCalculations/getOneMonthMoneyCalculations", async ({ id }) => {
  const { data } = await axios.get(`${API_URL}monthlymoneycalculations/${id}`);

  return data;
});

export const fetchPostMonthMoneyCalculations = createAsyncThunk<
  MonthlyMoneyCalculationsType,
  { address: AddressType; data: ListInfoDataMonthType[]; sumMoney: number }
>(
  "MonthlyMoneyCalculations/fetchPostMonthMoneyCalculations",
  async (params) => {
    const { data } = await axios.post(
      `${API_URL}monthlymoneycalculations`,
      params
    );
    return data;
  }
);

export const deleteMonthMoneyCalculations = createAsyncThunk<
  MonthlyMoneyCalculationsType,
  { id: string }
>("MonthlyMoneyCalculations/deleteMonthMoneyCalculations", async (params) => {
  const { id } = params;
  const { data } = await axios.delete(
    `${API_URL}monthlymoneycalculations/${id}`
  );
  return data;
});

export const editMonthMoneyCalculations = createAsyncThunk<
  TypeListUtylityPrices,
  {
    _id: string;
    data: ListInfoDataMonthType[];
    sumMoney: number;
  }
>("MonthlyMoneyCalculations/editMonthMoneyCalculations", async (params) => {
  const { _id, data, sumMoney } = params;

  const { data: responseData } = await axios.patch(
    `${API_URL}monthlymoneycalculations/${_id}`,
    {
      data,
      sumMoney,
    }
  );

  return responseData;
});

interface IPriceSlice {
  itemsMonthlyMoneyCalculations: {
    status: string;
    items: MonthlyMoneyCalculationsType[] | null;
    isEdit: boolean;
    idEdit: null | string;
  };
  currentItem: ListInfoDataMonthType[] | null;
  sumMoney: number;
}

const initialState: IPriceSlice = {
  itemsMonthlyMoneyCalculations: {
    status: "inactive",
    items: null,
    isEdit: false,
    idEdit: null,
  },
  currentItem: null,
  sumMoney: 0,
};

const PriceSlice = createSlice({
  name: "PriceSlice",
  initialState,
  reducers: {
    calcPrice: (
      state,
      action: PayloadAction<{
        itemValue: null | ListInfoDataMonthType[];
        priceServices: TypeListUtylityPrices;
      }>
    ) => {
      let sum = 0;
      const { itemValue, priceServices } = action.payload;

      if (itemValue && priceServices.length > 0) {
        const priceLightDay = priceServices.find(
          (item) => item.category === "Light day"
        )?.value;

        const priceLightNight = priceServices.find(
          (item) => item.category === "Light night"
        )?.value;

        const priceGas = priceServices.find(
          (item) => item.category === "Gas"
        )?.value;

        const priceWater = priceServices.find(
          (item) => item.category === "Water"
        )?.value;

        const newItem = itemValue.map((item) => {
          if (item.title === "Light day" && priceLightDay) {
            const result = Number(item.description) * priceLightDay;
            sum += result;
            const textDescription = `${
              item.description
            } kW * ${priceLightDay} uah = ${result.toFixed(2)}`;
            return { ...item, description: textDescription };
          } else if (item.title === "Light night" && priceLightNight) {
            const result = Number(item.description) * priceLightNight;
            sum += result;
            const textDescription = `${
              item.description
            } kW * ${priceLightNight} uah = ${result.toFixed(2)}`;
            return { ...item, description: textDescription };
          } else if (item.title === "Gas General" && priceGas) {
            const result = Number(item.description) * priceGas;
            sum += result;
            const textDescription = `${
              item.description
            } m³ * ${priceGas} uah = ${result.toFixed(2)}`;
            return { ...item, description: textDescription };
          } else if (
            item.title === "Water general" &&
            priceWater &&
            item.description !== "0.00"
          ) {
            const result = Number(item.description) * priceWater;
            sum += result;
            const textDescription = `${
              item.description
            } m³ * ${priceWater} uah = ${result.toFixed(2)}`;
            return { ...item, description: textDescription };
          } else {
            return item;
          }
        });

        state.currentItem = newItem.filter(
          (item) =>
            item.title !== "Light general" && item.description !== "0.00"
        );
      } else {
        state.currentItem = null;
      }
      state.sumMoney = Number(sum.toFixed(1));
    },

    addServiceToCurrentItem: (
      state,
      action: PayloadAction<{
        title: string;
        description: string | number;
        percentDifference: number;
      }>
    ) => {
      const isUniqueCategory = !state.currentItem?.some(
        (item) => item.title === action.payload.title
      );
      if (state.currentItem && isUniqueCategory) {
        state.currentItem = [
          ...state.currentItem,
          {
            id: v4(),
            title: action.payload.title,
            description: action.payload.description,
            percentDifference: action.payload.percentDifference,
          },
        ];

        state.sumMoney = +(
          state.sumMoney + Number(action.payload.description)
        ).toFixed(1);
      }
    },

    deleteServiceWithCurrentItem: (
      state,
      action: PayloadAction<{
        title: string;
        value: number;
      }>
    ) => {
      if (state.currentItem) {
        const { title, value } = action.payload;
        state.currentItem = state.currentItem?.filter(
          (item) => item.title !== title
        );

        state.sumMoney = +(state.sumMoney - value).toFixed(1);
      }
    },

    dissableEdit: (state) => {
      state.itemsMonthlyMoneyCalculations.isEdit = false;
      state.itemsMonthlyMoneyCalculations.idEdit = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMonthlyMoneyCalculations.pending, (state) => {
      state.itemsMonthlyMoneyCalculations.items = [];
      state.itemsMonthlyMoneyCalculations.status = "loading";
    });
    builder.addCase(
      fetchAllMonthlyMoneyCalculations.fulfilled,
      (state, action) => {
        state.itemsMonthlyMoneyCalculations.items = action.payload;
        state.itemsMonthlyMoneyCalculations.status = "loaded";
      }
    );
    builder.addCase(
      fetchAllMonthlyMoneyCalculations.rejected,
      (state, action) => {
        state.itemsMonthlyMoneyCalculations.items = [];
        state.itemsMonthlyMoneyCalculations.status = `Error message: "${action.error.message}"`;
      }
    );

    builder.addCase(getOneMonthMoneyCalculations.fulfilled, (state, action) => {
      const dataWithPercentDifference = action.payload.data.map((item) => ({
        ...item,
        id: item._id,
        percentDifference: 0,
      }));

      state.currentItem = dataWithPercentDifference;
      state.sumMoney = action.payload.sumMoney;
      state.itemsMonthlyMoneyCalculations.isEdit = true;
      if (action.payload._id) {
        state.itemsMonthlyMoneyCalculations.idEdit = action.payload._id;
      }
    });
  },
});

export const {
  calcPrice,
  addServiceToCurrentItem,
  deleteServiceWithCurrentItem,
  dissableEdit,
} = PriceSlice.actions;

export const pricesReducer = PriceSlice.reducer;
