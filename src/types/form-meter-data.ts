import { AddressType } from "@/types/meter-data-type";

export interface FormMeterDataType {
    date: string;
    address: AddressType;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
}
