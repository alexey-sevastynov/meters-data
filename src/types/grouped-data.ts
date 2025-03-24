import { MeterData } from "@/store/models/meter-data";

export interface GroupedData {
    [year: string]: {
        items: MeterData[];
        isOpen: boolean;
    };
}
