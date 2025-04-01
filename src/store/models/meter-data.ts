import { WithObjectId } from "@/types/with-object-id";

export interface MeterDataWithObjectId extends MeterData, WithObjectId {}

export interface MeterData {
    date: string; // INFO: "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
    address: string;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
    createdAt?: string;
    updatedAt?: string;
}
