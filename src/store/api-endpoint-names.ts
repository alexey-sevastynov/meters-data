export const apiEndpointNames = {
    monthlyMoneyCalculations: "monthlymoneycalculations",
    billingAccounts: "billing-accounts",
    utilityPrices: "utility-prices",
    metersData: "metersdatas",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
