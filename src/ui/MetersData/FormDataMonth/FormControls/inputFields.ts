import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";

export interface InputField {
  key: KeysItemUtilityPricesType;
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

interface InputFieldsParams {
  lang: any;
  light: number;
  setLight: React.Dispatch<React.SetStateAction<number>>;
  lightDay: number;
  setLightDay: React.Dispatch<React.SetStateAction<number>>;
  lightNight: number;
  setLightNight: React.Dispatch<React.SetStateAction<number>>;
  gas: number;
  setGas: React.Dispatch<React.SetStateAction<number>>;
}

export function createInputFields({
  lang,
  light,
  setLight,
  lightDay,
  setLightDay,
  lightNight,
  setLightNight,
  gas,
  setGas,
}: InputFieldsParams) {
  return [
    {
      key: "light",
      label: lang.infoPanel["Light general"],
      value: light,
      setValue: setLight,
    },
    {
      key: "lightDay",
      label: lang.infoPanel["Light day"],
      value: lightDay,
      setValue: setLightDay,
    },
    {
      key: "lightNight",
      label: lang.infoPanel["Light night"],
      value: lightNight,
      setValue: setLightNight,
    },
    {
      key: "gas",
      label: lang.infoPanel["Gas General"],
      value: gas,
      setValue: setGas,
    },
  ];
}
