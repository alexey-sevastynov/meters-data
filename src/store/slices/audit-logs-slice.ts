import { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sliceNames } from "@/store/slice-names";
import { AuditLogWithObjectId } from "@/store/models/audit-logs";
import { StatusName, statusNames } from "@/constants/status";
import { deleteOne, getAll, getOne } from "@/store/crud-service";
import { actionNames } from "@/store/action-names";
import { apiEndpointNames } from "@/store/api-endpoint-names";
import { WithId } from "@/types/with-id";

export const getAllAuditLogs = createAsyncThunk<AuditLogWithObjectId[], void, { rejectValue: AxiosError }>(
    actionNames.auditLogs.getAll,
    async () => getAll<AuditLogWithObjectId>(apiEndpointNames.auditLogs),
);

export const getOneAuditLog = createAsyncThunk<AuditLogWithObjectId, WithId>(
    actionNames.auditLogs.getOne,
    async (params) => {
        return getOne<AuditLogWithObjectId>(apiEndpointNames.auditLogs, params.id);
    },
);

export const deleteAuditLog = createAsyncThunk<AuditLogWithObjectId, WithId>(
    actionNames.auditLogs.deleteOne,
    async (params) => {
        return deleteOne<AuditLogWithObjectId>(apiEndpointNames.auditLogs, params.id);
    },
);

interface IAuditLogs {
    items: AuditLogWithObjectId[];
    status: StatusName;
    item?: AuditLogWithObjectId;
}

const initialState: IAuditLogs = {
    items: [],
    status: statusNames.inactive,
    item: undefined,
};

const AuditLogsSlice = createSlice({
    name: sliceNames.auth,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllAuditLogs.pending, (state) => {
            state.items = [];
            state.status = statusNames.loading;
        });
        builder.addCase(getAllAuditLogs.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = statusNames.loaded;
        });
        builder.addCase(getAllAuditLogs.rejected, (state) => {
            state.items = [];
            state.status = statusNames.error;
        });

        builder.addCase(deleteAuditLog.fulfilled, (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload._id);
        });
        builder.addCase(getOneAuditLog.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });
        builder.addCase(getOneAuditLog.rejected, (state) => {
            state.status = statusNames.error;
        });

        builder.addCase(deleteAuditLog.rejected, (state) => {
            state.status = statusNames.error;
        });
        builder.addCase(deleteAuditLog.pending, (state) => {
            state.status = statusNames.loading;
        });
        builder.addCase(getOneAuditLog.pending, (state) => {
            state.status = statusNames.loading;
        });
    },
});

export const auditLogsReducer = AuditLogsSlice.reducer;
