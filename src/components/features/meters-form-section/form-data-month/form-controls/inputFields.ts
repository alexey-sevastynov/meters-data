import { TranslationKeys } from "@/types/i-18-next-types";
import { CategoryKey } from "@/enums/category-keys";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { IconName, iconNames } from "@/components/ui/icon/icon-constants";

export interface InputField {
    key: CategoryKey;
    label: string;
    value: string;
    setValue: SetStateFunc<string>;
    iconName: IconName;
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
            iconName: iconNames.light,
        },
        {
            key: "lightDay",
            label: lang.infoPanel["Light day"],
            value: lightDay,
            setValue: setLightDay,
            iconName: iconNames.light,
        },
        {
            key: "lightNight",
            label: lang.infoPanel["Light night"],
            value: lightNight,
            setValue: setLightNight,
            iconName: iconNames.light,
        },
        {
            key: "gas",
            label: lang.infoPanel["Gas General"],
            value: gas,
            setValue: setGas,
            iconName: iconNames.gas,
        },
    ];
}
