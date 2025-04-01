import { MeterDataWithObjectId } from "@/store/models/meter-data";

export interface DateRangeSelectorProps {
    data: MeterDataWithObjectId[];
    selectedMonth: string;
    selectedYear: string;
}
