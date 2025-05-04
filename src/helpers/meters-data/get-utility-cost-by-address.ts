import { addressLinkNames } from "@/constants/address";
import { InfoMeterReading } from "@/store/slices/meters-data/meters-data.types";

export function getUtilityCostByAddress(infoMeterReading: InfoMeterReading, address: string) {
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
}
