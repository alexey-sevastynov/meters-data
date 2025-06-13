export const apiEndpointNames = {
    monthlyMoneyCalculations: "monthly-money-calculations",
    billingAccounts: "billing-accounts",
    utilityPrices: "utility-prices",
    metersData: "metersdatas",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
