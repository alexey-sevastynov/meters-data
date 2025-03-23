import { ADDRESS } from "@/constants/address";

export type AddressType = (typeof ADDRESS)[keyof typeof ADDRESS];

export interface MeterDataType {
    _id: string;
    date: string; // "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
    address: AddressType;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
    createdAt: string;
    updatedAt: string;
}

export interface GroupedData {
    [year: string]: {
        items: MeterDataType[];
        isOpen: boolean;
    };
}
