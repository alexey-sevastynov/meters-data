import { ThemeMode, themeModes } from "@/components/context/theme-provider/theme-provider-types";
import { ColorName, colorNames } from "@/enums/color-names";

export function getIconColorByTheme(light: ColorName, dark: ColorName, themeMode: ThemeMode) {
    return themeMode === themeModes.light ? dark : light;
}

export function getBaseIconColor(themeMode: ThemeMode) {
    return getIconColorByTheme(colorNames.grey, colorNames.green, themeMode);
}
