import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ListInfoDataMonthType } from "./MetersDataSlice";
import { TypeListUtylityPrices } from "../../types/constants";

interface IPriceSlice {
  currentItem: ListInfoDataMonthType[] | null;
  sumMoney: number;
}

const initialState: IPriceSlice = {
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
      }>
    ) => {
      const isUniqueCategory = !state.currentItem?.some(
        (item) => item.title === action.payload.title
      );
      if (state.currentItem && isUniqueCategory) {
        state.currentItem = [
          ...state.currentItem,
          {
            title: action.payload.title,
            description: action.payload.description,
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

        const findItemValue = state.currentItem.find(
          (item) => item.title === title
        )?.description;

        state.sumMoney = +(state.sumMoney - value).toFixed(1);
      }
    },
  },
});

export const {
  calcPrice,
  addServiceToCurrentItem,
  deleteServiceWithCurrentItem,
} = PriceSlice.actions;

export const pricesReducer = PriceSlice.reducer;
