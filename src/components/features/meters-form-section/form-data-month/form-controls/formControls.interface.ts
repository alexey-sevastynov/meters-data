import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { DataPickerValue } from "@/types/data-picker";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { TranslationKeys } from "@/types/i-18-next-types";

export interface FormControlsProps {
    isWaterBlock: boolean;
    selectDate: DataPickerValue;
    setSelectDate: SetStateFunc<DataPickerValue>;
    light: string;
    setLight: SetStateFunc<string>;
    lightDay: string;
    setLightDay: SetStateFunc<string>;
    lightNight: string;
    setLightNight: SetStateFunc<string>;
    water: string;
    setWater: SetStateFunc<string>;
    gas: string;
    setGas: SetStateFunc<string>;
    isEdit: boolean;
    meterDataEdit: MeterDataWithObjectId | null;
    sortedAddressMeterData: MeterDataWithObjectId[];
    translations: TranslationKeys;
    setErrorMessage: SetStateFunc<string | null>;
}
