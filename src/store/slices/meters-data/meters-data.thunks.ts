import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { createOne, deleteOne, getAll, updateOne } from "@/store/crud-service";
import { MeterData, MeterDataWithObjectId } from "@/store/models/meter-data";
import { WithId } from "@/types/with-id";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllMetersData = createAsyncThunk<MeterDataWithObjectId[]>(
    actionNames.metersData.getAll,
    async () => getAll<MeterDataWithObjectId>(apiEndpointNames.meterData)
);

export const createMetersData = createAsyncThunk<MeterData, MeterData>(
    actionNames.metersData.createOne,
    async (params) => {
        return createOne<MeterData>(apiEndpointNames.meterData, params);
    }
);

export const deleteMeterData = createAsyncThunk<MeterDataWithObjectId, WithId>(
    actionNames.metersData.deleteOne,
    async (params) => {
        return deleteOne<MeterDataWithObjectId>(apiEndpointNames.meterData, params.id);
    }
);

export const updateMeterData = createAsyncThunk<MeterDataWithObjectId[], MeterDataWithObjectId>(
    actionNames.metersData.updateOne,
    async (params) => {
        return updateOne<MeterDataWithObjectId>(apiEndpointNames.meterData, params._id, params);
    }
);
