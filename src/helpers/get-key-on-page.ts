import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";

export function getKeyOnPage(address: string) {
    switch (address) {
        case getStringEnv(envKeys.address001):
            return "address001";
        case getStringEnv(envKeys.address003):
            return "address003";
        case getStringEnv(envKeys.address004):
            return "address004";
        case getStringEnv(envKeys.address005):
            return "address005";
        case getStringEnv(envKeys.address002):
            return "address002";
        default:
            return "";
    }
}
