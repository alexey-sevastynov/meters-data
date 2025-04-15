import { TableAction } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { smoothScrollOnLoad } from "@/helpers/smooth-scroll-on-load";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { openPopup, setIdDelete, setQuestion } from "@/store/slices/confirm-popup-slice";
import { setMeterDataEdit, showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import { AppDispatch } from "@/store/store";

export function getActionsTableRow(
    item: MeterDataWithObjectId,
    firstDate: string,
    latestDate: string,
    dispatch: AppDispatch
) {
    const actions: TableAction[] = [
        getViewAction(item, firstDate, dispatch),
        getEditAction(dispatch),
        getDeleteAction(item, latestDate, dispatch),
    ];

    return actions;
}

function getViewAction(item: MeterDataWithObjectId, firstDate: string, dispatch: AppDispatch) {
    const viewAction: TableAction = {
        icon: iconNames.view,
        label: "Переглянути",
        visible: item.date !== firstDate,
        onClick: (action) => {
            dispatch(showMeterReadingCalc({ id: String(action.id), address: String(action.address) }));
            smoothScrollOnLoad();
        },
    };

    return viewAction;
}

function getEditAction(dispatch: AppDispatch) {
    const editAction: TableAction = {
        icon: iconNames.edit,
        label: "Редагувати",
        visible: true,
        onClick: (action) => {
            dispatch(
                setMeterDataEdit({
                    _id: String(action.id),
                    address: String(action.address),
                    date: String(action.date),
                    light: Number(action.light),
                    lightDay: Number(action.lightDay),
                    lightNight: Number(action.lightNight),
                    gas: Number(action.gas),
                    water: Number(action.water),
                    createdAt: String(action.createdAt),
                    updatedAt: String(action.updatedAt),
                })
            );
        },
    };

    return editAction;
}

function getDeleteAction(item: MeterDataWithObjectId, latestDate: string, dispatch: AppDispatch) {
    const deleteAction: TableAction = {
        icon: iconNames.delete,
        label: "Видалити",
        visible: item.date === latestDate,
        onClick: (action) => {
            dispatch(openPopup());
            dispatch(setQuestion("Do you really want to delete?"));
            dispatch(setIdDelete(String(action.id)));
        },
    };

    return deleteAction;
}
