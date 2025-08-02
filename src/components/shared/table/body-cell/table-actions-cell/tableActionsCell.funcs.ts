import { emitMetaDataSocketEvent } from "@/infra/socket/socket-client";
import { socketEventNames } from "@/infra/socket/socket-event-names";
import { confirmActionExit, confirmActionOnDelete, setIdDelete } from "@/store/slices/confirm-popup-slice";
import { deleteMeterData, getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import { AppDispatch } from "@/store/store";

export function deleteItemMeterData(id: string, dispatch: AppDispatch) {
    dispatch(deleteMeterData({ id })).then((response) => {
        if (response.payload) dispatch(getAllMetersData());

        emitMetaDataSocketEvent(socketEventNames.deleteItem, response.payload);
    });

    dispatch(confirmActionOnDelete(false));
    dispatch(confirmActionExit(false));
    dispatch(setIdDelete(null));
}
