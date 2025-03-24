import { smoothScrollOnLoad } from "@/helpers/smooth-scroll-on-load";
import {
    deleteMonthMoneyCalculations,
    fetchAllMonthlyMoneyCalculations,
    getOneMonthMoneyCalculations,
} from "@/store/slices/price-slice";
import { AppDispatch } from "@/store/store";

export async function deleteItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(deleteMonthMoneyCalculations({ id }));

    if (response.payload) await dispatch(fetchAllMonthlyMoneyCalculations());
}

export async function editItem(id: string, dispatch: AppDispatch) {
    const response = await dispatch(getOneMonthMoneyCalculations({ id }));

    if (response.payload) smoothScrollOnLoad();
}
