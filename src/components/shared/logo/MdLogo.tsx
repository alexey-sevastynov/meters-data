import Styles from "./logo.module.scss";
import { selectTranslations } from "@/store/slices/i-18-next";
import { getIconUrl } from "@/helpers/get-icon-url";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";

export function MdLogo() {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(selectTranslations);

    return (
        <div className={Styles.logo} onClick={() => dispatch(getAllMetersData())}>
            <img src={getIconUrl("logo.png")} alt="logo" width={50} height={50} />
            <h3 className={Styles.text}>{lang.header.metersData}</h3>
        </div>
    );
}
