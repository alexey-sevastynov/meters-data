import { openPopup, setIdDelete, setQuestion } from "@/store/slices/confirm-popup-slice";
import { AppDispatch } from "@/store/store";

export function exitAccount(dispatch: AppDispatch) {
    dispatch(openPopup());
    dispatch(setQuestion("Do you really want to exit?"));
    dispatch(setIdDelete(null));
}
