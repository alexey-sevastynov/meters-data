import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";

interface Lang {
    value: {
        [key: string]: string;
    };
}

const valueByTitle: Record<string, string> = {
    [titlesForMeterReadings.light]: "kW",
    [titlesForMeterReadings.lightDay]: "kW",
    [titlesForMeterReadings.lightNight]: "kW",
    [titlesForMeterReadings.gas]: "m³",
    [titlesForMeterReadings.water]: "m³",
};

export const showValue = (title: string, translations: Lang) => {
    const unitOfChange = valueByTitle[title];
    return translations.value[unitOfChange] || "";
};

export const shouldRenderDescriptionTitle = (isMobileView: boolean, title: string) => {
    return isMobileView ? title !== "Date" : true;
};
