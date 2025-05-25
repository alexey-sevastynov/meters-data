import { BillingAccount } from "@/store/models/billing-account";
import styles from "./utilityAccountsList.module.scss";
import { UtilityAccountItem } from "@/components/features/utility-account/utility-accounts-list/utility-account-item/UtilityAccountItem";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface UtilityAccountsListProps {
    billingAccount?: BillingAccount;
}

export function UtilityAccountsList({ billingAccount }: UtilityAccountsListProps) {
    const translations = useAppSelector(selectTranslations);

    if (!billingAccount) return null;

    return (
        <div className={styles.root}>
            <UtilityAccountItem value={billingAccount.light} title={translations.utilityAccount.light} />
            <UtilityAccountItem value={billingAccount.water} title={translations.utilityAccount.water} />
            <UtilityAccountItem value={billingAccount.gas} title={translations.utilityAccount.gas} />
        </div>
    );
}
