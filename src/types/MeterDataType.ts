export type AddressType =
  | "antonovicha-73"
  | "antonovicha-75"
  | "antonovicha-75-3"
  | "slobozhansky-68a"
  | "chelyuskina";

export type MeterDataType = {
  _id: string;
  date: string; // "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
  address: AddressType;
  light: number;
  lightDay: number;
  lightNight: number;
  gas: number;
  water?: number;
};
