import React from "react";
import Styles from "./headMetersData.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface HeadMetersDataProps {
    isWaterBlock: boolean;
    isOpen?: boolean;
}

export const HeadMetersData: React.FC<HeadMetersDataProps> = ({ isWaterBlock, isOpen }) => {
    const translations = useAppSelector(selectTranslations);

    if (!isOpen) return null;

    return (
        <li className={Styles.headMetersData}>
            <p className={Styles.headMetersData__date}> {translations.infoPanel["month"]}</p>
            <p className={Styles.headMetersData__light}>
                {translations.infoPanel["Light general"]}, {translations.value.kW}
            </p>
            <p className={Styles.headMetersData__lightDay}>
                {translations.infoPanel["Light day"]}, {translations.value.kW}
            </p>
            <p className={Styles.headMetersData__lightNight}>
                {translations.infoPanel["Light night"]}, {translations.value.kW}
            </p>
            <p className={Styles.headMetersData__gas}>
                {translations.infoPanel["Gas General"]}, {translations.value["m³"]}
            </p>
            {isWaterBlock && (
                <p className={Styles.headMetersData__water}>
                    {translations.infoPanel["Water general"]}, {translations.value["m³"]}
                </p>
            )}
        </li>
    );
};
