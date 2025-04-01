import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { UtilityCost } from "@/types/utility-cost";
import {
    createMonthMoneyCalculations,
    getAllMonthlyMoneyCalculations,
    updateMonthMoneyCalculations,
} from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";
import { resetEdit } from "@/store/slices/monthly-money-calculations/slice";
import { AppDispatch } from "@/store/store";
import { CalculationDataWithId } from "@/types/calculation-data-with-id";

interface ThunkResponse {
    payload?: unknown;
}

export async function editItem(
    currentItem: UtilityCost[] | null,
    sumMoney: number,
    idEdit: string | null,
    dispatch: AppDispatch
) {
    if (currentItem && idEdit) {
        const response = await dispatch(
            updateMonthMoneyCalculations({
                _id: idEdit,
                data: currentItem,
                sumMoney,
            })
        );

        console.log(response);

        if (!response) return;

        handleResponse(response, dispatch);
        dispatch(resetEdit());
    }
}

export async function saveItemDB(
    currentItem: UtilityCost[] | null,
    sumMoney: number,
    isUniqueObj: boolean,
    currentPageName: string,
    dispatch: AppDispatch
) {
    if (currentItem && sumMoney && isUniqueObj) {
        const calculationData: CalculationDataWithId[] = [];

        for (const item of currentItem) {
            calculationData.push({
                id: item.id,
                title: item.title,
                description: item.description,
            });
        }

        const response = await dispatch(
            createMonthMoneyCalculations({
                address: currentPageName,
                data: calculationData,
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
    if (response.payload) dispatch(getAllMonthlyMoneyCalculations());
}
