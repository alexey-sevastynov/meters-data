import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/store/crud-service";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filter-and-sort-items-by-address-and-date";
import { getKeyOnPage } from "@/helpers/get-key-on-page";
import { findPreviousDateById } from "@/store/helpers/find-previous-date-by-id";
import { calculateDifference } from "@/store/helpers/calculate-difference";
import { findPenultimateDate } from "@/store/helpers/find-penultimate-date";
import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";
import { MeterData } from "../models/meter-data";

export interface ListInfoDataMonthType {
    id: string;
    title: string;
    description: string;
    percentDifference: number;
}

export interface InfoMeterReadingType {
    address_001: null | ListInfoDataMonthType[];
    address_002: null | ListInfoDataMonthType[];
    address_003: null | ListInfoDataMonthType[];
    address_004: null | ListInfoDataMonthType[];
    address_005: null | ListInfoDataMonthType[];
}

interface ParamsMeterDataType {
    _id?: string;
    date: string; // "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
    address: string;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
}

export const fetchAllMetersData = createAsyncThunk<MeterData[], void, { rejectValue: AxiosError }>(
    "metersData/fetchAllMetersData",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<MeterData[]>(`${apiUrl}metersdatas`);

            return data;
        } catch (e) {
            if (e instanceof AxiosError && !e.response) {
                throw e;
            }

            return rejectWithValue(e as AxiosError);
        }
    }
);

export const fetchPostMetersData = createAsyncThunk<MeterData, ParamsMeterDataType>(
    "metersData/fetchPostMetersData",
    async (params) => {
        const { data }: { data: MeterData } = await axios.post(`${apiUrl}metersdatas`, params);

        return data;
    }
);

export const deleteMeterData = createAsyncThunk<MeterData, { id: string }>(
    "metersData/deleteMeterData",
    async (params) => {
        const { id } = params;
        const { data }: { data: MeterData } = await axios.delete(`${apiUrl}metersdatas/${id}`);

        return data;
    }
);

export const editMeterData = createAsyncThunk<MeterData, ParamsMeterDataType>(
    "metersData/editMeterData",
    async (params) => {
        const { _id, date, address, light, lightDay, lightNight, gas, water } = params;

        const { data }: { data: MeterData } = await axios.patch(`${apiUrl}metersdatas/${_id}`, {
            date,
            address,
            light,
            lightDay,
            lightNight,
            gas,
            water,
        });

        return data;
    }
);

interface IMetersDataSlice {
    metersData: {
        items: MeterData[];
        status: string;
    };

    meterDataEdit: MeterData | null; // for the form, we will take data from this object for editing
    isEdit: boolean;

    infoMeterReading: InfoMeterReadingType;
}

const initialState: IMetersDataSlice = {
    metersData: {
        items: [],
        status: "inactive",
    },
    meterDataEdit: null,
    isEdit: false,

    infoMeterReading: {
        address_001: null,
        address_002: null,
        address_003: null,
        address_004: null,
        address_005: null,
    },
};

const MetersDataSlice = createSlice({
    name: "MetersDataSlice",
    initialState,
    reducers: {
        setMeterDataEdit: (state, action: PayloadAction<MeterData>) => {
            state.meterDataEdit = action.payload;
            state.isEdit = true;
        },

        setNotEdit: (state) => {
            state.meterDataEdit = null;
            state.isEdit = false;
        },

        showMeterReadingCalc: (state, action: PayloadAction<{ id: string; address: string }>) => {
            const listItemsAddress = filterAndSortItemsByAddressAndDate(
                state.metersData.items,
                action.payload.address
            );

            const currentItem = listItemsAddress.find((item) => item._id === action.payload.id);

            const previousItem = findPreviousDateById(listItemsAddress, action.payload.id);

            if (!previousItem) {
                state.infoMeterReading = {
                    ...state.infoMeterReading,
                    [getKeyOnPage(action.payload.address)]: null,
                };
            }

            if (previousItem && currentItem) {
                state.infoMeterReading = {
                    ...state.infoMeterReading,
                    [getKeyOnPage(action.payload.address)]: calculateDifference(
                        currentItem,
                        previousItem,
                        findPreviousDateById(listItemsAddress, previousItem?._id)!
                    ),
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMetersData.pending, (state) => {
            state.metersData.items = [];
            state.metersData.status = "loading";
        });
        builder.addCase(fetchAllMetersData.fulfilled, (state, action) => {
            state.metersData.items = action.payload;
            state.metersData.status = "loaded";

            function setCurrentMetersDataPage(address: string): ListInfoDataMonthType[] | null {
                const items = filterAndSortItemsByAddressAndDate(action.payload, address);

                if (items.length > 0) {
                    const latestItem = items[items.length - 1];
                    const secondLatestItem = items[items.length - 2];

                    const secondLatestItemDate = findPenultimateDate(latestItem.date);
                    const thirdLatestItemDate = findPenultimateDate(secondLatestItem.date);

                    const secondMostRecentItem = items.find((item) => item.date === secondLatestItemDate);
                    const thirdMostRecentItem = items.find((item) => item.date === thirdLatestItemDate);

                    if (secondMostRecentItem && thirdMostRecentItem) {
                        return calculateDifference(latestItem, secondMostRecentItem, thirdMostRecentItem);
                    } else {
                        return null;
                    }
                }

                return null;
            }

            state.infoMeterReading = {
                address_001: setCurrentMetersDataPage(getStringEnv(envKeys.address001)),
                address_002: setCurrentMetersDataPage(getStringEnv(envKeys.address002)),
                address_003: setCurrentMetersDataPage(getStringEnv(envKeys.address003)),
                address_004: setCurrentMetersDataPage(getStringEnv(envKeys.address004)),
                address_005: setCurrentMetersDataPage(getStringEnv(envKeys.address005)),
            };
        });
        builder.addCase(fetchAllMetersData.rejected, (state, action) => {
            state.metersData.items = [];
            state.metersData.status = `Error message: "${action.error.message}"`;
        });

        builder.addCase(fetchPostMetersData.pending, () => {
            toast.loading("Loading...");
        });
        builder.addCase(fetchPostMetersData.fulfilled, () => {
            toast.dismiss();
            toast.success("Success! Month was added 👌");
        });
        builder.addCase(fetchPostMetersData.rejected, () => {
            toast.dismiss();
            toast.error("Request error 🤯 😣");
        });
    },
});

export const { setMeterDataEdit, setNotEdit, showMeterReadingCalc } = MetersDataSlice.actions;

export const metersDataReducer = MetersDataSlice.reducer;
