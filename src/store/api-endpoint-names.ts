export const apiEndpointNames = {
    monthlyMoneyCalculations: "monthly-money-calculations",
    billingAccounts: "billing-accounts",
    utilityPrices: "utility-prices",
    meterData: "meter-data",
    auditLogs: "audit-logs",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
