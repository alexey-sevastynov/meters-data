import { MeterData } from "@/store/models/meter-data";

export interface DateRangeSelectorProps {
    data: MeterData[];
    selectedMonth: string;
    selectedYear: string;
}
