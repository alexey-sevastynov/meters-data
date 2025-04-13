import Styles from "./logo.module.scss";
import { selectTranslations } from "@/store/slices/i-18-next";
import { getIconUrl } from "@/helpers/get-icon-url";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";

export function MdLogo() {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.xl });

    return (
        <div className={Styles.logo} onClick={() => dispatch(getAllMetersData())}>
            <img src={getIconUrl("logo.png")} alt="logo" width={40} height={40} />
            {!isMobileView && <h3 className={Styles.text}>{translations.header.metersData}</h3>}
        </div>
    );
}
