import { AddressType } from "@/types/MeterDataType";

export function getKeyOnPage(address: AddressType) {
  switch (address) {
    case import.meta.env.VITE_ADDR_001:
      return "address_001";
    case import.meta.env.VITE_ADDR_003:
      return "address_003";
    case import.meta.env.VITE_ADDR_004:
      return "address_004";
    case import.meta.env.VITE_ADDR_005:
      return "address_005";
    case import.meta.env.VITE_ADDR_002:
      return "address_002";
    default:
      return "";
  }
}
