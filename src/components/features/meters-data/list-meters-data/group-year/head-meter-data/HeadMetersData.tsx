import React from "react";
import styles from "./headMetersData.module.scss";
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
        <li className={styles.root}>
            <p className={styles.month}> {translations.infoPanel["month"]}</p>
            <p className={styles.light}>
                {translations.infoPanel["Light general"]}, {translations.value.kW}
            </p>
            <p className={styles.lightDay}>
                {translations.infoPanel["Light day"]}, {translations.value.kW}
            </p>
            <p className={styles.lightNight}>
                {translations.infoPanel["Light night"]}, {translations.value.kW}
            </p>
            <p className={styles.gas}>
                {translations.infoPanel["Gas General"]}, {translations.value["m³"]}
            </p>
            {isWaterBlock && (
                <p className={styles.water}>
                    {translations.infoPanel["Water general"]}, {translations.value["m³"]}
                </p>
            )}
        </li>
    );
};
