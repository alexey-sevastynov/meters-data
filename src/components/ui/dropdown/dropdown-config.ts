import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { DropdownIcons } from "@/components/ui/dropdown/dropdown-types";
import { colorNames } from "@/enums/color-names";

export const defaultIcons: DropdownIcons = {
    iconWhenOpen: iconNames.arrowDown,
    iconWhenClosed: iconNames.arrowUp,
    color: colorNames.white,
    size: iconSizes.medium,
};
