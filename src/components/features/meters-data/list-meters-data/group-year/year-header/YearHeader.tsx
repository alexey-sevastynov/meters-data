import React from "react";
import Style from "./yearHeader.module.scss";
import { motion } from "framer-motion";
import { colors } from "@/constants/colors";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";

interface YearHeaderProps {
  year: string;
  isOpen: boolean;
  onToggle: () => void;
}

const YearHeader: React.FC<YearHeaderProps> = ({ year, isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={Style.yearHeader}
    >
      <p>{year}</p>
      <motion.div
        initial={{ rotate: 180 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <MdIcon
          name={iconNames.triangle}
          size={iconSizes.small}
          color={colors.green}
        />
      </motion.div>
    </button>
  );
};

export default YearHeader;
