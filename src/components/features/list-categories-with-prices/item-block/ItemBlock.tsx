import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import Styles from "./itemBlock.module.scss";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { getIconColorByTheme } from "@/helpers/theme/get-icon-color";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { colorNames } from "@/enums/color-names";
import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";

interface ItemBlockProps {
    title: string;
    description: string;
    showDelete: boolean;
    onDelete: (title: string, value: string) => void;
}

export function ItemBlock({ title, description, showDelete, onDelete }: ItemBlockProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={Styles.itemBlock}>
            {showDelete && (
                <button
                    className={Styles.btn}
                    type="button"
                    title="delete data"
                    onClick={() => onDelete(title, description)}
                >
                    <MdIcon
                        name={iconNames.close}
                        size={iconSizes.large}
                        color={getIconColorByTheme(colorNames.lightRed, colorNames.red, theme.themeMode)}
                    />
                </button>
            )}
            <li className={Styles.item}>
                <p className={Styles.title}>{title}:</p>
                <p>
                    {description} {title === titlesForMeterReadings.date ? "" : translations.value.uah}
                </p>
            </li>
        </div>
    );
}
