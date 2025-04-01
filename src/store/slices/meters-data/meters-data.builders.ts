import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IMetersDataSlice } from "@/store/slices/meters-data/meters-data.types";
import { statusNames } from "@/constants/status";
import {
    createMetersData,
    deleteMeterData,
    getAllMetersData,
    updateMeterData,
} from "@/store/slices/meters-data/meters-data.thunks";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filter-and-sort-items-by-address-and-date";
import { findPenultimateDate } from "@/store/helpers/find-penultimate-date";
import { calculateDifference } from "@/store/helpers/calculate-difference";
import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { addToastNotifications } from "@/store/toast-service";

const messageSuccessAddMeterData = "Success! Meter data was added 👌";
const messageSuccessUpdateMeterData = "Success! Meter data was updated 👌";
const messageSuccessDeleteMeterData = "Success! Meter data was deleted 👌";

export function extraReducers(builder: ActionReducerMapBuilder<IMetersDataSlice>) {
    builder.addCase(getAllMetersData.pending, (state) => {
        state.items = [];
        state.status = statusNames.loading;
    });
    builder.addCase(getAllMetersData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = statusNames.loaded;
        state.infoMeterReading = {
            address001: setCurrentMetersDataPage(action, getStringEnv(envKeys.address001)),
            address002: setCurrentMetersDataPage(action, getStringEnv(envKeys.address002)),
            address003: setCurrentMetersDataPage(action, getStringEnv(envKeys.address003)),
            address004: setCurrentMetersDataPage(action, getStringEnv(envKeys.address004)),
            address005: setCurrentMetersDataPage(action, getStringEnv(envKeys.address005)),
        };
    });
    builder.addCase(getAllMetersData.rejected, (state) => {
        state.items = [];
        state.status = statusNames.error;
    });

    addToastNotifications(builder, createMetersData, { success: messageSuccessAddMeterData });
    addToastNotifications(builder, updateMeterData, { success: messageSuccessUpdateMeterData });
    addToastNotifications(builder, deleteMeterData, { success: messageSuccessDeleteMeterData });
}

function setCurrentMetersDataPage(action: PayloadAction<MeterDataWithObjectId[]>, address: string) {
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
