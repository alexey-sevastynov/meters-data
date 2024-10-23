import React from "react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { COLORS } from "@/constants";
import { SIZE_ICONS } from "@/constants/sizeIcons";

export const ValueChangeIndicator: React.FC<{ percentDifference: number }> = ({
  percentDifference,
}) => {
  return percentDifference > 0 ? (
    <FaLongArrowAltUp
      size={SIZE_ICONS.small}
      color={COLORS.red}
    />
  ) : (
    <FaLongArrowAltDown
      size={SIZE_ICONS.small}
      color={COLORS.green}
    />
  );
};
