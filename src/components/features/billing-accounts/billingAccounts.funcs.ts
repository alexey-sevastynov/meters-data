import { BillingAccount } from "@/store/models/billing-account";

export function hasNoBillingData(billingAccount?: BillingAccount) {
    if (!billingAccount) return true;

    return (
        billingAccount.gas === "unknown" &&
        billingAccount.light === "unknown" &&
        billingAccount.water === "unknown"
    );
}
