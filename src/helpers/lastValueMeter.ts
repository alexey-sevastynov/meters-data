import { ADDRESS } from "@/constants/address";
import { InfoMeterReadingType } from "@/redux/slices/MetersDataSlice";

export const lastValueMeter = (
  infoMeterReading: InfoMeterReadingType,
  address: string
) => {
  switch (address) {
    case ADDRESS.ADDR_001:
      return infoMeterReading.address_001;
    case ADDRESS.ADDR_002:
      return infoMeterReading.address_002;
    case ADDRESS.ADDR_003:
      return infoMeterReading.address_003;
    case ADDRESS.ADDR_004:
      return infoMeterReading.address_004;
    case ADDRESS.ADDR_005:
      return infoMeterReading.address_005;
    default:
      return null;
  }
};
