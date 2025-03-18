import { AddressType } from "@/types/MeterDataType";

export interface FormMeterDataType {
  date: string;
  address: AddressType;
  light: number;
  lightDay: number;
  lightNight: number;
  gas: number;
  water?: number;
}
