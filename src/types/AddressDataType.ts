import { AddressType } from "./MeterDataType";

export interface AddressDataType {
    _id: string;
    address: AddressType;
    light: string;
    gas: string;
    water: string;
}
