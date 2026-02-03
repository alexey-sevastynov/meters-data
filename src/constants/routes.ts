import { addressLinkNames } from "@/constants/address";

export const routeNames = {
    price: "price",
    graphics: "graphics",
    meterData: "meters-data",
    info: "info",
    auditLogs: "audit-logs",
};

export const appRoutes = {
    home: `/`,
    address001: `/` + addressLinkNames.address001,
    address002: `/` + addressLinkNames.address002,
    address003: `/` + addressLinkNames.address003,
    address004: `/` + addressLinkNames.address004,
    address005: `/` + addressLinkNames.address005,
    price: `:address/${routeNames.price}`,
    graphics: `:address/${routeNames.graphics}`,
    info: `:address/${routeNames.info}`,
    auditLogs: `/${routeNames.auditLogs}`,
} as const;
