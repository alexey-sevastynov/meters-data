import { MeterDataType } from "@/types/MeterDataType";

export interface FormControlsProps {
  isWaterBlock: boolean;
  valueSelectDate: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
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
  currentPage: number;
  listCurrentPage: MeterDataType[];
  lang: any;
}
