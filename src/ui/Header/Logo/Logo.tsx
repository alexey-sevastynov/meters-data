import Styles from "./logo.module.scss";
import { getIconUrl } from "../../../helpers/getIconUrl";
import { useDispatch } from "react-redux";
import { fetchAllMetersData } from "../../../redux/slices/MetersDataSlice";

export const Logo = () => {
  const dispatch = useDispatch();
  return (
    <div className={Styles.logo} onClick={() => dispatch(fetchAllMetersData())}>
      <img src={getIconUrl("logo.png")} alt="logo" width={50} height={50} />
      <h3 className={Styles.text}>MetersData</h3>
    </div>
  );
};
