import { IconName, IconSize } from "@/components/ui/icon/icon-constants";
import { ColorName } from "@/enums/color-names";

export const dropdownPosition = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
} as const;

export type DropdownPosition = (typeof dropdownPosition)[keyof typeof dropdownPosition];

export interface DropdownIcons {
    iconWhenOpen: IconName;
    iconWhenClosed: IconName;
    color?: ColorName;
    size?: IconSize;
}
