import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { COLORS } from "@/constants";
import { SIZE_ICONS } from "@/constants/sizeIcons";

interface ValueChangeIndicatorProps {
  percentDifference: number;
}

export function ValueChangeIndicator({
  percentDifference,
}: ValueChangeIndicatorProps) {
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
}
