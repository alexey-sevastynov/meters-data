import { envKeys } from "@/enums/env-keys";
import { getStringEnv } from "@/helpers/get-string-env";

export const addressLinkNames = {
    home: "home",
    address001: getStringEnv(envKeys.address001),
    address002: getStringEnv(envKeys.address002),
    address003: getStringEnv(envKeys.address003),
    address004: getStringEnv(envKeys.address004),
    address005: getStringEnv(envKeys.address005),
} as const;

export const addressNames = {
    home: "Home",
    address001: getStringEnv(envKeys.addressName001),
    address002: getStringEnv(envKeys.addressName002),
    address003: getStringEnv(envKeys.addressName003),
    address004: getStringEnv(envKeys.addressName004),
    address005: getStringEnv(envKeys.addressName005),
} as const;
