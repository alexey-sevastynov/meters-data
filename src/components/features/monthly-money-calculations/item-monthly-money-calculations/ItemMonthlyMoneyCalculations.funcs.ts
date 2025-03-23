import { smoothScrollOnLoad } from "@/helpers/smoothScrollOnLoad";
import {
    deleteMonthMoneyCalculations,
    fetchAllMonthlyMoneyCalculations,
    getOneMonthMoneyCalculations,
} from "@/redux/slices/PriceSlice";
import { AppDispatch } from "@/redux/store";

export async function deleteItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(deleteMonthMoneyCalculations({ id }));

    if (response.payload) await dispatch(fetchAllMonthlyMoneyCalculations());
}

export async function editItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(getOneMonthMoneyCalculations({ id }));

    if (response.payload) smoothScrollOnLoad();
}
