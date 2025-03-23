import { DataPickerValue } from "@/types/DataPicker";
import { TranslationKeys } from "@/types/I18nextTypes";
import { MeterDataType } from "@/types/MeterDataType";

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
