import { AddressType } from "@/types/meter-data-type";
import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";

export function getKeyOnPage(address: AddressType) {
    switch (address) {
        case getStringEnv(envKeys.address001):
            return "address_001";
        case getStringEnv(envKeys.address003):
            return "address_003";
        case getStringEnv(envKeys.address004):
            return "address_004";
        case getStringEnv(envKeys.address005):
            return "address_005";
        case getStringEnv(envKeys.address002):
            return "address_002";
        default:
            return "";
    }
}
