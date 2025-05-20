import { MdIcon } from "@/components/ui/icon/MdIcon";
import Styles from "./dropdownThemeMode.module.scss";
import {
    MdDropdown,
    MdDropdownContent,
    MdDropdownItem,
    MdDropdownTrigger,
} from "@/components/ui/dropdown/MdDropdown";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { DropdownIcons, dropdownPosition } from "@/components/ui/dropdown/dropdown-types";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

export function DropdownThemeMode() {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);
    const iconsTrigger: DropdownIcons = {
        iconWhenOpen: iconNames.expand,
        iconWhenClosed: iconNames.expand,
        color: colorNames.grey,
        size: iconSizes.small,
    };

    return (
        <MdDropdown className={Styles.dropdownThemeMode} position={dropdownPosition.bottom}>
            <MdDropdownTrigger className={Styles.dropdownThemeModeTrigger} icons={iconsTrigger}>
                <MdIcon name={iconNames.lightMode} color={colorNames.grey} size={iconSizes.small} />
                <p>
                    {theme.isDarkMode
                        ? translations.dropdownMenu.darkMode
                        : translations.dropdownMenu.lightMode}
                </p>
            </MdDropdownTrigger>
            <MdDropdownContent className={Styles.dropdownThemeModeContent}>
                <MdDropdownItem className={Styles.dropdownThemeModeItem} onSelect={theme.setLightThemeMode}>
                    <p>{translations.dropdownMenu.lightMode}</p>
                    {theme.isLightMode && (
                        <MdIcon name={iconNames.check} color={colorNames.grey} size={iconSizes.small} />
                    )}
                </MdDropdownItem>
                <MdDropdownItem className={Styles.dropdownThemeModeItem} onSelect={theme.setDarkThemeMode}>
                    <p>{translations.dropdownMenu.darkMode}</p>
                    {theme.isDarkMode && (
                        <MdIcon name={iconNames.check} color={colorNames.grey} size={iconSizes.small} />
                    )}
                </MdDropdownItem>
            </MdDropdownContent>
        </MdDropdown>
    );
}
