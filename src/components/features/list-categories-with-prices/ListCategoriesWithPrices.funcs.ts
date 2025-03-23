import { titlesForMeterReadings } from "@/constants/titlesForMeterReadings";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";
import {
    disableEdit,
    editMonthMoneyCalculations,
    fetchAllMonthlyMoneyCalculations,
    fetchPostMonthMoneyCalculations,
} from "@/redux/slices/PriceSlice";
import { AppDispatch } from "@/redux/store";

interface ThunkResponse {
    payload?: unknown;
}

export async function editItem(
    currentItem: ListInfoDataMonthType[] | null,
    sumMoney: number,
    idEdit: string | null,
    dispatch: AppDispatch
) {
    if (currentItem && idEdit) {
        const response = await dispatch(
            editMonthMoneyCalculations({
                _id: idEdit,
                data: currentItem,
                sumMoney,
            })
        );

        if (!response) return;

        handleResponse(response, dispatch);
        dispatch(disableEdit());
    }
}

export async function saveItemDB(
    currentItem: ListInfoDataMonthType[] | null,
    sumMoney: number,
    isUniqueObj: boolean,
    currentPageName: string,
    dispatch: AppDispatch
) {
    if (currentItem && sumMoney && isUniqueObj) {
        const response = await dispatch(
            fetchPostMonthMoneyCalculations({
                address: currentPageName,
                data: currentItem,
                sumMoney,
            })
        );

        if (!response) return;

        handleResponse(response, dispatch);
    }
}

export function isShowDeleteButton(title: string) {
    const excludedTitles: string[] = [
        titlesForMeterReadings.date,
        titlesForMeterReadings.lightDay,
        titlesForMeterReadings.lightNight,
        titlesForMeterReadings.gas,
        titlesForMeterReadings.water,
    ];

    return !excludedTitles.includes(title);
}

function handleResponse(response: ThunkResponse, dispatch: AppDispatch) {
    if (response.payload) dispatch(fetchAllMonthlyMoneyCalculations());
}
