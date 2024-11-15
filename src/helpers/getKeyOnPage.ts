import { AddressType } from "../types/MeterDataType";

export function getKeyOnPage(address: AddressType) {
  switch (address) {
    case import.meta.env.VITE_ADDR_001:
      return import.meta.env.VITE_ADDR_001;
    case import.meta.env.VITE_ADDR_003:
      return "antonovicha73";
    case import.meta.env.VITE_ADDR_004:
      return "antonovicha75";
    case import.meta.env.VITE_ADDR_005:
      return "antonovicha75_3";
    case import.meta.env.VITE_ADDR_002:
      return "slobozhansky";
  }
}
