import { AddressType } from "./MeterDataType";

export type AddressDataType = {
  _id: string;
  address: AddressType;
  light: string;
  gas: string;
  water: string;
};
