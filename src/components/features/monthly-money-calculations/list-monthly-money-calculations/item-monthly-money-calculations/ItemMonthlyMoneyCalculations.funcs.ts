import { smoothScrollTo } from "@/utils/scroll";
import {
    deleteMonthMoneyCalculations,
    getAllMonthlyMoneyCalculations,
    getOneMonthMoneyCalculations,
} from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";

import { AppDispatch } from "@/store/store";

export async function deleteItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(deleteMonthMoneyCalculations({ id }));

    if (response.payload) await dispatch(getAllMonthlyMoneyCalculations());
}

export async function editItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(getOneMonthMoneyCalculations({ id }));

    if (response.payload) smoothScrollTo();
}
