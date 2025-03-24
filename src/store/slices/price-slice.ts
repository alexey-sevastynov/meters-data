import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import axios, { AxiosError } from "axios";
import { ListInfoDataMonthType } from "@/store/slices/meters-data-slice";
import { TypeListUtilityPrices } from "@/types/constants";
import { MonthlyMoneyCalculationsType } from "@/types/monthly-money-calculations-type";
import { API_URL } from "@/constants";
import { actionNames } from "@/store/action-names";
import { API_PATH } from "@/constants/api-path";

const monthlyMoneyCalculationsUrl = API_URL + API_PATH.monthlyMoneyCalculations;

export const fetchAllMonthlyMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationsType[],
    void,
    { rejectValue: AxiosError }
>(actionNames.price.getAll, async () => {
    const { data } = await axios.get<MonthlyMoneyCalculationsType[]>(monthlyMoneyCalculationsUrl);

    return data;
});

export const getOneMonthMoneyCalculations = createAsyncThunk<MonthlyMoneyCalculationsType, { id: string }>(
    actionNames.price.getOne,
    async ({ id }) => {
        const { data }: { data: MonthlyMoneyCalculationsType } = await axios.get(
            `${monthlyMoneyCalculationsUrl}/${id}`
        );

        return data;
    }
);

export const fetchPostMonthMoneyCalculations = createAsyncThunk<
    MonthlyMoneyCalculationsType,
    { address: string; data: ListInfoDataMonthType[]; sumMoney: number }
>(actionNames.price.post, async (params) => {
    const { data }: { data: MonthlyMoneyCalculationsType } = await axios.post(
        monthlyMoneyCalculationsUrl,
        params
    );

    return data;
});

export const deleteMonthMoneyCalculations = createAsyncThunk<MonthlyMoneyCalculationsType, { id: string }>(
    actionNames.price.delete,
    async (params) => {
        const { id } = params;
        const { data }: { data: MonthlyMoneyCalculationsType } = await axios.delete(
            `${monthlyMoneyCalculationsUrl}/${id}`
        );

        return data;
    }
);

export const editMonthMoneyCalculations = createAsyncThunk<
    TypeListUtilityPrices,
    {
        _id: string;
        data: ListInfoDataMonthType[];
        sumMoney: number;
    }
>(actionNames.price.edit, async (params) => {
    const { _id, data, sumMoney } = params;

    const { data: responseData }: { data: TypeListUtilityPrices } = await axios.patch(
        `${monthlyMoneyCalculationsUrl}/${_id}`,
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
                priceServices: TypeListUtilityPrices;
            }>
        ) => {
            let sum = 0;
            const { itemValue, priceServices } = action.payload;

            if (itemValue && priceServices.length > 0) {
                const priceLightDay = priceServices.find((item) => item.category === "Light day")?.value;

                const priceLightNight = priceServices.find((item) => item.category === "Light night")?.value;

                const priceGas = priceServices.find((item) => item.category === "Gas")?.value;

                const priceWater = priceServices.find((item) => item.category === "Water")?.value;

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
                        const textDescription = `${item.description} m³ * ${priceGas} uah = ${result.toFixed(
                            2
                        )}`;
                        return { ...item, description: textDescription };
                    } else if (item.title === "Water general" && priceWater && item.description !== "0.00") {
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
                    (item) => item.title !== "Light general" && item.description !== "0.00"
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
                description: string;
                percentDifference: number;
            }>
        ) => {
            const isUniqueCategory = !state.currentItem?.some((item) => item.title === action.payload.title);

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

                state.sumMoney = +(state.sumMoney + Number(action.payload.description)).toFixed(1);
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
                state.currentItem = state.currentItem?.filter((item) => item.title !== title);

                state.sumMoney = +(state.sumMoney - value).toFixed(1);
            }
        },

        disableEdit: (state) => {
            state.itemsMonthlyMoneyCalculations.isEdit = false;
            state.itemsMonthlyMoneyCalculations.idEdit = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMonthlyMoneyCalculations.pending, (state) => {
            state.itemsMonthlyMoneyCalculations.items = [];
            state.itemsMonthlyMoneyCalculations.status = "loading";
        });
        builder.addCase(fetchAllMonthlyMoneyCalculations.fulfilled, (state, action) => {
            state.itemsMonthlyMoneyCalculations.items = action.payload;
            state.itemsMonthlyMoneyCalculations.status = "loaded";
        });
        builder.addCase(fetchAllMonthlyMoneyCalculations.rejected, (state, action) => {
            state.itemsMonthlyMoneyCalculations.items = [];
            state.itemsMonthlyMoneyCalculations.status = `Error message: "${action.error.message}"`;
        });

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

export const { calcPrice, addServiceToCurrentItem, deleteServiceWithCurrentItem, disableEdit } =
    PriceSlice.actions;

export const pricesReducer = PriceSlice.reducer;
