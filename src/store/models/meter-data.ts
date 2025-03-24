import { WithId } from "@/types/with-id";

export interface MeterData extends WithId {
    date: string; // "MM.YYYY" /^(0[1-9]|1[0-2])\.(19|20)\d{2}$/
    address: string;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
    createdAt?: string;
    updatedAt?: string;
}
