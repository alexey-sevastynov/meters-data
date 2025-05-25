import { useAppSelector } from "@/store/hook";
import styles from "./utilityAccount.module.scss";
import { useLocation } from "react-router-dom";
import { BillingAccount } from "@/store/models/billing-account";
import { selectTranslations } from "@/store/slices/i-18-next";
import { UtilityAccountsList } from "@/components/features/utility-account/utility-accounts-list/UtilityAccountsList";
import { statusNames } from "@/constants/status";

export function MdUtilityAccount() {
    const translations = useAppSelector(selectTranslations);
    const { pathname } = useLocation();
    const currentAddressName: string = pathname.slice(1).replace("/price", "");
    const items = useAppSelector((state) => state.billingAccounts.items);
    const status = useAppSelector((state) => state.billingAccounts.status);
    const errorMessage = useAppSelector((state) => state.billingAccounts.errorMessage);
    const item: BillingAccount | undefined = items.find((i) => i.address.includes(currentAddressName));

    if (status === statusNames.loading) return <p>loading...</p>;

    if (status === statusNames.error) return <p>error: {errorMessage}</p>;

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>{translations.utilityAccount.title}</h2>
            <UtilityAccountsList billingAccount={item} />
        </div>
    );
}
