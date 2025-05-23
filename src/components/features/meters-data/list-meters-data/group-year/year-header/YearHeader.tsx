import React from "react";
import styles from "./yearHeader.module.scss";
import { motion } from "framer-motion";
import { colorNames } from "@/enums/color-names";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface YearHeaderProps {
    year: string;
    isOpen: boolean;
    onToggle: VoidFuncNoParam;
}

const YearHeader: React.FC<YearHeaderProps> = ({ year, isOpen, onToggle }) => {
    return (
        <button onClick={onToggle} className={styles.yearHeader}>
            <p>{year}</p>
            <motion.div
                initial={{ rotate: 180 }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <MdIcon name={iconNames.triangle} size={iconSizes.small} color={colorNames.green} />
            </motion.div>
        </button>
    );
};

export default YearHeader;
