import { BillingAccount } from "@/store/models/billing-account";
import styles from "./billingAccountsList.module.scss";
import { MdBillingAccountsItem } from "@/components/features/billing-accounts/billing-accounts-list/billing-accounts-item/BillingAccountsItem";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface BillingAccountsListProps {
    billingAccount?: BillingAccount;
}

export function MdBillingAccountsList({ billingAccount }: BillingAccountsListProps) {
    const translations = useAppSelector(selectTranslations);

    if (!billingAccount) return null;

    return (
        <div className={styles.root}>
            <MdBillingAccountsItem value={billingAccount.light} title={translations.billingAccount.light} />
            <MdBillingAccountsItem value={billingAccount.water} title={translations.billingAccount.water} />
            <MdBillingAccountsItem value={billingAccount.gas} title={translations.billingAccount.gas} />
        </div>
    );
}
