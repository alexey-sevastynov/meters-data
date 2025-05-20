import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { confirmActionExit, confirmActionOnDelete, setIdDelete } from "@/store/slices/confirm-popup-slice";
import { deleteMeterData, getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import { setMeterDataEdit } from "@/store/slices/meters-data/slice";
import { AppDispatch } from "@/store/store";

export function deleteItemMeterData(id: string, dispatch: AppDispatch) {
    dispatch(deleteMeterData({ id })).then((response) => {
        if (response.payload) dispatch(getAllMetersData());
    });

    dispatch(confirmActionOnDelete(false));
    dispatch(confirmActionExit(false));
    dispatch(setIdDelete(null));
}

export function editItem(dispatch: AppDispatch, meterData: MeterDataWithObjectId) {
    dispatch(setMeterDataEdit(meterData));
}
