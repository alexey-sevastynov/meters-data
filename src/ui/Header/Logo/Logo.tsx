import Styles from "./logo.module.scss";
import { selectTranslations } from "@/redux/slices/I18next";
import { getIconUrl } from "@/helpers/getIconUrl";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllMetersData } from "@/redux/slices/MetersDataSlice";

export const Logo = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector(selectTranslations);

  return (
    <div
      className={Styles.logo}
      onClick={() => dispatch(fetchAllMetersData())}
    >
      <img
        src={getIconUrl("logo.png")}
        alt="logo"
        width={50}
        height={50}
      />
      <h3 className={Styles.text}>{lang.header.metersData}</h3>
    </div>
  );
};
