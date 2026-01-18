import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { SetStateFunc } from "@/types/getter-setter-functions";

export interface DateRangeSelectorProps {
    meterReadings: MeterDataWithObjectId[];
    selectedMonth: string;
    selectedYear: string;
}

export interface MeterReadingsNavigationProps {
    meterReadings: MeterDataWithObjectId[];
    selectedMonth: string;
    selectedYear: string;
    selectedDateDisplay: string;
    isOpen: boolean;
    setIsOpen: SetStateFunc<boolean>;
}

export interface MeterReadingOptionProps {
    meterReading: MeterDataWithObjectId;
    selectedDateDisplay: string;
    currentLang: string;
    setIsOpen: SetStateFunc<boolean>;
}
