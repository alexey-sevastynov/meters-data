import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import styles from "./itemCategoryWithPrice.module.scss";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { cn } from "@/lib/cn";

interface ItemBlockProps {
    title: string;
    description: string;
    showDelete: boolean;
    onDelete: (title: string, value: string) => void;
}

export function MdItemCategoryWithPrice({ title, description, showDelete, onDelete }: ItemBlockProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            {showDelete && (
                <button
                    className={styles.button}
                    type="button"
                    title="delete data"
                    onClick={() => onDelete(title, description)}
                >
                    <MdIcon
                        name={iconNames.delete}
                        size={iconSizes.large}
                        color={getBaseIconColor(theme.themeMode)}
                    />
                </button>
            )}
            <li
                className={cn(
                    styles.item,
                    showDelete && styles.itemDelete,
                    title === titlesForMeterReadings.date && styles.itemDate,
                )}
            >
                <p className={styles.title}>{title}:</p>
                <p>
                    {description} {title === titlesForMeterReadings.date ? "" : translations.value.uah}
                </p>
            </li>
        </div>
    );
}
