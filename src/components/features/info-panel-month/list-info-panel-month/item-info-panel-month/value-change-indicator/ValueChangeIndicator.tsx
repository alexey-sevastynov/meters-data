import { colorNames } from "@/enums/color-names";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getIconColorByTheme } from "@/helpers/theme/get-icon-color";

interface ValueChangeIndicatorProps {
    percentDifference: number;
}

export function ValueChangeIndicator({ percentDifference }: ValueChangeIndicatorProps) {
    const theme = useTheme();
    const isPositive = percentDifference > 0;
    const redColor = getIconColorByTheme(colorNames.lightRed, colorNames.red, theme.themeMode);
    const greenColor = getIconColorByTheme(colorNames.lightGreen, colorNames.green, theme.themeMode);

    return (
        <MdIcon
            name={isPositive ? iconNames.longArrowAltUp : iconNames.longArrowAltDown}
            size={iconSizes.small}
            color={isPositive ? redColor : greenColor}
        />
    );
}
