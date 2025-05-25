import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import styles from "./utilityAccountItem.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";

interface UtilityAccountItemProps {
    value: string;
    title: string;
}

export function UtilityAccountItem({ value, title }: UtilityAccountItemProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <p>{title}:</p>
            <div className={styles.content}>
                <p className={styles.value}>{value}</p>
                <button
                    title={translations.utilityAccount.copy}
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    <MdIcon
                        name={iconNames.copy}
                        size={iconSizes.small}
                        color={getBaseIconColor(theme.themeMode)}
                    />
                </button>
            </div>
        </div>
    );
}
