import { DataPickerValue } from "@/types/data-picker";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MeterDataType } from "@/types/meter-data-type";

export interface FormControlsProps {
    isWaterBlock: boolean;
    selectDate: DataPickerValue;
    setSelectDate: (value: DataPickerValue) => void;
    light: number;
    setLight: React.Dispatch<React.SetStateAction<number>>;
    lightDay: number;
    setLightDay: React.Dispatch<React.SetStateAction<number>>;
    lightNight: number;
    setLightNight: React.Dispatch<React.SetStateAction<number>>;
    water: number;
    setWater: React.Dispatch<React.SetStateAction<number>>;
    gas: number;
    setGas: React.Dispatch<React.SetStateAction<number>>;
    isEdit: boolean;
    meterDataEdit: MeterDataType | null;
    currentPage: string;
    sortedAddressMeterData: MeterDataType[];
    lang: TranslationKeys;
}
