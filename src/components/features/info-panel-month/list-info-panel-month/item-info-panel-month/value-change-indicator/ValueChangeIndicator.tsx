import { colors } from "@/constants/colors";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";

interface ValueChangeIndicatorProps {
    percentDifference: number;
}

export function ValueChangeIndicator({ percentDifference }: ValueChangeIndicatorProps) {
    const isPositive = percentDifference > 0;

    return (
        <MdIcon
            name={isPositive ? iconNames.longArrowAltUp : iconNames.longArrowAltDown}
            size={iconSizes.small}
            color={isPositive ? colors.red : colors.green}
        />
    );
}
