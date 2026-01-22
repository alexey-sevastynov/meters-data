import { useAppSelector } from "@/store/hook";
import styles from "./billingAccounts.module.scss";
import { useLocation } from "react-router-dom";
import { BillingAccount } from "@/store/models/billing-account";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdBillingAccountsList } from "@/components/features/billing-accounts/billing-accounts-list/BillingAccountsList";
import { statusNames } from "@/constants/status";
import { routeNames } from "@/constants/routes";
import { hasNoBillingData } from "@/components/features/billing-accounts/billingAccounts.funcs";

export function MdBillingAccounts() {
    const translations = useAppSelector(selectTranslations);
    const { pathname } = useLocation();
    const currentAddressName = pathname.slice(1).replace(`/${routeNames.info}`, "");
    const items = useAppSelector((state) => state.billingAccounts.items);
    const status = useAppSelector((state) => state.billingAccounts.status);
    const errorMessage = useAppSelector((state) => state.billingAccounts.errorMessage);
    const billingAccount: BillingAccount | undefined = items.find((i) =>
        i.address.includes(currentAddressName),
    );

    if (status === statusNames.loading) return <p>loading...</p>;

    if (status === statusNames.error) return <p>error: {errorMessage}</p>;

    if (hasNoBillingData(billingAccount))
        return (
            <div className={styles.root}>
                <h2 className={styles.title}>{translations.billingAccount.title}</h2>
                <p>{translations.billingAccount.notData}</p>
            </div>
        );

    return (
        <div className={styles.root}>
            <h2 className={styles.title}>{translations.billingAccount.title}</h2>
            <MdBillingAccountsList billingAccount={billingAccount} />
        </div>
    );
}
