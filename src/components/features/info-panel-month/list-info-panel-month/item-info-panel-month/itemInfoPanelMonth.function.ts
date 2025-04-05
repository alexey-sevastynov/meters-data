import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";

interface Lang {
    value: {
        [key: string]: string;
    };
}

export const valueByTitle: Record<string, string> = {
    [titlesForMeterReadings.light]: "kW",
    [titlesForMeterReadings.lightDay]: "kW",
    [titlesForMeterReadings.lightNight]: "kW",
    [titlesForMeterReadings.gas]: "m³",
    [titlesForMeterReadings.water]: "m³",
};

export const showValue = (title: string, lang: Lang) => {
    const unitOfChange = valueByTitle[title];
    return lang.value[unitOfChange] || "";
};

export const shouldRenderDescriptionTitle = (isMobileView: boolean, title: string) => {
    return isMobileView ? title !== "Date" : true;
};
