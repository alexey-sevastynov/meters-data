import { addressLinkNames } from "./address";

export const ADDRESS_TYPES = {
    PRICE: "price",
    GRAPHICS: "graphics",
    METERS_DATA: "meters-data",
};

export const ROUTES = {
    HOME: `/`,
    ADDR_001: `/` + addressLinkNames.address001,
    ADDR_002: `/` + addressLinkNames.address002,
    ADDR_003: `/` + addressLinkNames.address003,
    ADDR_004: `/` + addressLinkNames.address004,
    ADDR_005: `/` + addressLinkNames.address005,

    PRICE: `:address/${ADDRESS_TYPES.PRICE}`,
    GRAPHICS: `:address/${ADDRESS_TYPES.GRAPHICS}`,
} as const;
