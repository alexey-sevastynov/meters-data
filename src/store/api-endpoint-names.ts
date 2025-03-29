export const apiEndpointNames = {
    utilityPrises: "prices",
} as const;

export type ApiEndpointName = (typeof apiEndpointNames)[keyof typeof apiEndpointNames];
