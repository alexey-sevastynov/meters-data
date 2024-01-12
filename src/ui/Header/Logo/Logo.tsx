import Styles from "./logo.module.scss";
import { getIconUrl } from "../../../helpers/getIconUrl";

export const Logo = () => {
  return (
    <div className={Styles.logo}>
      <img src={getIconUrl("logo.png")} alt="logo" width={50} height={50} />
      <h3 className={Styles.text}>MetersData</h3>
    </div>
  );
};
