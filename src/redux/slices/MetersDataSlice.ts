import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants";
import { AddressType, MeterDataType } from "../../types/MeterDataType";
import { findPenultimateDate } from "../helpers/findPenultimateDate";
import { filterAndSortItemsByAddressAndDate } from "../../helpers/filterAndSortItemsByAddressAndDate";
import { findPreviousDateById } from "../helpers/findPreviousDateById";
import { calculateDifference } from "../helpers/calculateDifference";
import { getKeyOnPage } from "../../helpers/getKeyOnPage";
import { toast } from "react-toastify";

export type ListInfoDataMonthType = {
  title: string;
  description: string | number;
};

type ParamsMeterDataType = {
  _id?: string;
  date: string; // "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
  address: AddressType;
  light: number;
  lightDay: number;
  lightNight: number;
  gas: number;
  water?: number;
};

export const fetchAllMetersData = createAsyncThunk<
  MeterDataType[],
  void,
  { rejectValue: AxiosError }
>("metersData/fetchAllMetersData", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<MeterDataType[]>(`${API_URL}metersdatas`);
    return data;
  } catch (error: any) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error as AxiosError);
  }
});

export const fetchPostMetersData = createAsyncThunk<
  MeterDataType,
  ParamsMeterDataType
>("metersData/fetchPostMetersData", async (params) => {
  const { data } = await axios.post(`${API_URL}metersdatas`, params);
  return data;
});

export const deleteMeterData = createAsyncThunk<MeterDataType, { id: string }>(
  "metersData/deleteMeterData",
  async (params) => {
    const { id } = params;
    const { data } = await axios.delete(`${API_URL}metersdatas/${id}`);
    return data;
  }
);

export const editMeterData = createAsyncThunk<
  MeterDataType,
  ParamsMeterDataType
>("metersData/editMeterData", async (params) => {
  const { _id, date, address, light, lightDay, lightNight, gas, water } =
    params;

  const { data } = await axios.patch(`${API_URL}metersdatas/${_id}`, {
    date,
    address,
    light,
    lightDay,
    lightNight,
    gas,
    water,
  });

  return data;
});

interface IMetersDataSlice {
  metersData: {
    items: MeterDataType[];
    status: string;
  };

  meterDataEdit: MeterDataType | null; // for the form, we will take data from this object for editing
  isEdit: boolean;

  infoMeterReading: {
    chelyuskina: null | ListInfoDataMonthType[];
    slobozhansky: null | ListInfoDataMonthType[];
    antonovicha73: null | ListInfoDataMonthType[];
    antonovicha75: null | ListInfoDataMonthType[];
  };
}

const initialState: IMetersDataSlice = {
  metersData: {
    items: [],
    status: "inactive",
  },
  meterDataEdit: null,
  isEdit: false,

  infoMeterReading: {
    chelyuskina: null,
    slobozhansky: null,
    antonovicha73: null,
    antonovicha75: null,
  },
};

const MetersDataSlice = createSlice({
  name: "MetersDataSlice",
  initialState,
  reducers: {
    setMeterDataEdit: (state, action: PayloadAction<MeterDataType>) => {
      state.meterDataEdit = action.payload;
      state.isEdit = true;
    },

    setNotEdit: (state) => {
      state.meterDataEdit = null;
      state.isEdit = false;
    },

    showMeterReadingCalc: (
      state,
      action: PayloadAction<{ id: string; address: AddressType }>
    ) => {
      const listItemsAddress = filterAndSortItemsByAddressAndDate(
        state.metersData.items,
        action.payload.address
      );

      const currentItem = listItemsAddress.find(
        (item) => item._id === action.payload.id
      );

      const previousItem = findPreviousDateById(
        listItemsAddress,
        action.payload.id
      );

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
            previousItem
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

      function setCurrentMetersDataPage(
        address: AddressType
      ): ListInfoDataMonthType[] | null {
        const items = filterAndSortItemsByAddressAndDate(
          action.payload,
          address
        );

        if (items.length > 0) {
          const itemLast = items[items.length - 1];

          const itemPenulimateDate = findPenultimateDate(itemLast.date);
          const itemPenulimate = items.find(
            (item) => item.date === itemPenulimateDate
          );

          if (itemPenulimate) {
            return calculateDifference(itemLast, itemPenulimate);
          } else {
            return null;
          }
        }

        return null;
      }

      state.infoMeterReading = {
        chelyuskina: setCurrentMetersDataPage("chelyuskina"),
        slobozhansky: setCurrentMetersDataPage("slobozhansky-68a"),
        antonovicha73: setCurrentMetersDataPage("antonovicha-73"),
        antonovicha75: setCurrentMetersDataPage("antonovicha-75"),
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

export const { setMeterDataEdit, setNotEdit, showMeterReadingCalc } =
  MetersDataSlice.actions;
export const metersDataReducer = MetersDataSlice.reducer;
