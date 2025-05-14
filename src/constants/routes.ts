import { addressLinkNames } from "@/constants/address";

export const routeNames = {
    price: "price",
    graphics: "graphics",
    meterData: "meters-data",
};

export const appRoutes = {
    home: `/`,
    addr001: `/` + addressLinkNames.address001,
    addr002: `/` + addressLinkNames.address002,
    addr003: `/` + addressLinkNames.address003,
    addr004: `/` + addressLinkNames.address004,
    addr005: `/` + addressLinkNames.address005,
    price: `:address/${routeNames.price}`,
    graphics: `:address/${routeNames.graphics}`,
} as const;
