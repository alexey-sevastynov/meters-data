import Styles from "./authPanel.module.scss";
import { useAppDispatch } from "../../../redux/hook";
import { logOut } from "../../../redux/slices/AuthSlice";

export const AuthPanel = () => {
  const dispatch = useAppDispatch();
  const exit = () => {
    dispatch(logOut());
  };

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
