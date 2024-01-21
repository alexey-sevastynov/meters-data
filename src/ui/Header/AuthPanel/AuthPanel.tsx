import Styles from "./authPanel.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { logOut } from "../../../redux/slices/AuthSlice";
import {
  closePopup,
  confirmActionExit,
  confirmActionOnDelete,
  openPopup,
  setIdDelete,
  setQuestion,
} from "../../../redux/slices/ConfirmPopupSlice";
import { useEffect } from "react";
import { smoothScrollOnLoad } from "../../../helpers/smoothScrollOnLoad";

export const AuthPanel = () => {
  const dispatch = useAppDispatch();
  const isExit = useAppSelector((props) => props.confirm.isActionExit);
  const idDeleteItem = useAppSelector((props) => props.confirm.idDeleteItem);

  const exit = () => {
    smoothScrollOnLoad();
    dispatch(openPopup());

    dispatch(setQuestion("Do you really want to exit?"));
    dispatch(setIdDelete(null));
  };

  useEffect(() => {
    if (isExit && idDeleteItem === null) {
      dispatch(logOut());

      dispatch(closePopup());
      dispatch(confirmActionOnDelete(false));
      dispatch(confirmActionExit(false));
    }
  }, [isExit]);

  return (
    <div className={Styles.authPanel}>
      <h5>Hello, alexseva94@gmail.com</h5>
      <span />
      <button type="button" onClick={exit}>
        Sign out
      </button>
    </div>
  );
};
