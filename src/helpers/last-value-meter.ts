import { addressLinkNames } from "@/constants/address";
import { InfoMeterReadingType } from "@/store/slices/meters-data-slice";

export const lastValueMeter = (infoMeterReading: InfoMeterReadingType, address: string) => {
    switch (address) {
        case addressLinkNames.address001:
            return infoMeterReading.address_001;
        case addressLinkNames.address002:
            return infoMeterReading.address_002;
        case addressLinkNames.address003:
            return infoMeterReading.address_003;
        case addressLinkNames.address004:
            return infoMeterReading.address_004;
        case addressLinkNames.address005:
            return infoMeterReading.address_005;
        default:
            return null;
    }
};
