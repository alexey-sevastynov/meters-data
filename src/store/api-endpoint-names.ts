export const apiEndpointNames = {
    monthlyMoneyCalculations: "monthlymoneycalculations",
    billingAccount: "utilityaccounts",
    utilityPrises: "prices",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
