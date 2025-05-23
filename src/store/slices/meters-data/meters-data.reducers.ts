import { PayloadAction } from "@reduxjs/toolkit";
import { IMetersDataSlice } from "@/store/slices/meters-data/meters-data.types";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { findPreviousDateById } from "@/store/helpers/find-previous-date-by-id";
import { getKeyOnPage } from "@/helpers/address/get-key-on-page";
import { calculateDifference } from "@/store/helpers/calculate-difference";

export function setMeterDataEdit(state: IMetersDataSlice, action: PayloadAction<MeterDataWithObjectId>) {
    state.meterDataEdit = action.payload;
    state.isEdit = true;
}

export function setNotEdit(state: IMetersDataSlice) {
    state.meterDataEdit = null;
    state.isEdit = false;
}

export function showMeterReadingCalc(
    state: IMetersDataSlice,
    action: PayloadAction<{ id: string; address: string }>
) {
    const listItemsAddress = filterMeterDataByAddressAndSortByDate(state.items, action.payload.address);

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
}
