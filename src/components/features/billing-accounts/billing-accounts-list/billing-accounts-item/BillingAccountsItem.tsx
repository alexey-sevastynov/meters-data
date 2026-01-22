import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import styles from "./billingAccountsItem.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";

interface BillingAccountsItemProps {
    value: string;
    title: string;
}

export function MdBillingAccountsItem({ value, title }: BillingAccountsItemProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <p className={styles.title}>{title}:</p>
            <div className={styles.content}>
                <p className={styles.value}>{value}</p>
                <button
                    className={styles.copy}
                    title={translations.billingAccount.copy}
                    onClick={() => navigator.clipboard.writeText(value)}
                >
                    <MdIcon name={iconNames.copy} color={getBaseIconColor(theme.themeMode)} />
                </button>
            </div>
        </div>
    );
}
