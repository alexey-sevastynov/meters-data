import styles from "./logo.module.scss";
import { selectTranslations } from "@/store/slices/i-18-next";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";
import { MdImage } from "@/components/ui/image/MdImage";

export function MdLogo() {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.xl });

    return (
        <div className={styles.logo} onClick={() => dispatch(getAllMetersData())}>
            <MdImage fileName={"logo.png"} alt="logo" width={40} height={40} />
            {!isMobileView && <h3 className={styles.text}>{translations.header.metersData}</h3>}
        </div>
    );
}
