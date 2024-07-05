import { AddressType } from "../types/MeterDataType";

export function getKeyOnPage(address: AddressType) {
  switch (address) {
    case "chelyuskina":
      return "chelyuskina";
    case "antonovicha-73":
      return "antonovicha73";
    case "antonovicha-75":
      return "antonovicha75";
    case "antonovicha-75-3":
      return "antonovicha75_3";
    case "slobozhansky-68a":
      return "slobozhansky";
  }
}
