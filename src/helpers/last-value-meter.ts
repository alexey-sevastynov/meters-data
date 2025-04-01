import { addressLinkNames } from "@/constants/address";
import { UtilityCost } from "@/types/utility-cost";

export const lastValueMeter = (
    infoMeterReading: {
        address001: UtilityCost[] | null;
        address002: UtilityCost[] | null;
        address003: UtilityCost[] | null;
        address004: UtilityCost[] | null;
        address005: UtilityCost[] | null;
    },
    address: string
) => {
    switch (address) {
        case addressLinkNames.address001:
            return infoMeterReading.address001;
        case addressLinkNames.address002:
            return infoMeterReading.address002;
        case addressLinkNames.address003:
            return infoMeterReading.address003;
        case addressLinkNames.address004:
            return infoMeterReading.address004;
        case addressLinkNames.address005:
            return infoMeterReading.address005;
        default:
            return null;
    }
};
