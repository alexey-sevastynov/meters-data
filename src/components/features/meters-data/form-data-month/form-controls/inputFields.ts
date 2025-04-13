import { TranslationKeys } from "@/types/i-18-next-types";
import { CategoryKey } from "@/enums/category-keys";
import { SetStateFunc } from "@/types/getter-setter-functions";

export interface InputField {
    key: CategoryKey;
    label: string;
    value: string;
    setValue: SetStateFunc<string>;
}

interface InputFieldsParams {
    translations: TranslationKeys;
    light: string;
    setLight: SetStateFunc<string>;
    lightDay: string;
    setLightDay: SetStateFunc<string>;
    lightNight: string;
    setLightNight: SetStateFunc<string>;
    gas: string;
    setGas: SetStateFunc<string>;
}

export function createInputFields({
    translations: lang,
    light,
    setLight,
    lightDay,
    setLightDay,
    lightNight,
    setLightNight,
    gas,
    setGas,
}: InputFieldsParams): InputField[] {
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
