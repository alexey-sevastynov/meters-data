import { smoothScrollOnLoad } from "@/helpers/smoothScrollOnLoad";
import {
  deleteMonthMoneyCalculations,
  fetchAllMonthlyMoneyCalculations,
  getOneMonthMoneyCalculations,
} from "@/redux/slices/PriceSlice";
import { AppDispatch } from "@/redux/store";

export async function deleteItem(id: string, dispatch: AppDispatch) {
  const response = await dispatch(
    deleteMonthMoneyCalculations({ id })
  ).unwrap();

  if (!response) {
    console.error("Error deleting item: response is falsy");

    return;
  }

  dispatch(fetchAllMonthlyMoneyCalculations());
}

export async function editItem(id: string, dispatch: AppDispatch) {
  const payload = await dispatch(getOneMonthMoneyCalculations({ id })).unwrap();

  if (!payload) {
    console.error("Error fetching item data: payload is falsy");

    return;
  }

  smoothScrollOnLoad();
}
