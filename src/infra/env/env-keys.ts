export const envKeys = {
    address001: "VITE_ADDR_001",
    address002: "VITE_ADDR_002",
    address003: "VITE_ADDR_003",
    address004: "VITE_ADDR_004",
    address005: "VITE_ADDR_005",
    addressName001: "VITE_ADDR_NAME_001",
    addressName002: "VITE_ADDR_NAME_002",
    addressName003: "VITE_ADDR_NAME_003",
    addressName004: "VITE_ADDR_NAME_004",
    addressName005: "VITE_ADDR_NAME_005",
    apiUrl: "VITE_API_URL",
    apiKey: "VITE_API_KEY",
    chatId: "VITE_CHAD_ID",
    email: "VITE_EMAIL",
    password: "VITE_PASSWORD",
    token: "VITE_TOKEN",
} as const;

export type EnvKey = (typeof envKeys)[keyof typeof envKeys];
