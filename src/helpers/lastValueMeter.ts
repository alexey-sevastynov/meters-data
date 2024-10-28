import { ADDRESS } from "@/constants/address";
import { InfoMeterReadingType } from "@/redux/slices/MetersDataSlice";

export const lastValueMeter = (
  infoMeterReading: InfoMeterReadingType,
  address: string
) => {
  switch (address) {
    case ADDRESS.ADDR_001:
      return infoMeterReading.chelyuskina;
    case ADDRESS.ADDR_002:
      return infoMeterReading.slobozhansky;
    case ADDRESS.ADDR_003:
      return infoMeterReading.antonovicha73;
    case ADDRESS.ADDR_004:
      return infoMeterReading.antonovicha75;
    case ADDRESS.ADDR_005:
      return infoMeterReading.antonovicha75_3;
    default:
      return null;
  }
};
