import React from "react";
import Style from "./yearHeader.module.scss";
import { IoTriangle } from "react-icons/io5";
import { motion } from "framer-motion";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { COLORS } from "@/constants";

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
        <IoTriangle
          size={SIZE_ICONS.small}
          color={COLORS.green}
        />
      </motion.div>
    </button>
  );
};

export default YearHeader;
