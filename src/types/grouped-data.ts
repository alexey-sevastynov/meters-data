import { MeterDataWithObjectId } from "@/store/models/meter-data";

export interface GroupedData {
    [year: string]: {
        items: MeterDataWithObjectId[];
        isOpen: boolean;
    };
}
