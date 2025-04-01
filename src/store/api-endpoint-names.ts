export const apiEndpointNames = {
    monthlyMoneyCalculations: "monthlymoneycalculations",
    billingAccount: "utilityaccounts",
    utilityPrises: "prices",
    metersData: "metersdatas",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
