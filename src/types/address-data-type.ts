import { AddressType } from "./meter-data-type";

export interface AddressDataType {
    _id: string;
    address: AddressType;
    light: string;
    gas: string;
    water: string;
}
