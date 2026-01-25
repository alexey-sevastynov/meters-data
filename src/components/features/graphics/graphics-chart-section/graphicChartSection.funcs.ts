import styles from "@/components/shared/chart/chart.module.scss";
import { LanguageKey } from "@/enums/language-keys";
import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import {
    ChartConfig,
    GasChartPoint,
    LightChartPoint,
    MeterChartData,
    WaterChartPoint,
} from "@/types/chart-types";
import { TranslationKeys } from "@/types/i-18-next-types";

export function getMeterChartData(metersData: MeterDataWithObjectId[], language?: LanguageKey) {
    const chartData: MeterChartData = {
        light: [],
        gas: [],
        water: [],
    };

    let previousMonth = metersData[0];

    for (const currentMonth of metersData.slice(1)) {
        const lightPoint = getLightChartPoint(currentMonth, previousMonth, language);
        const gasPoint = getGasChartPoint(currentMonth, previousMonth, language);
        const waterPoint = getWaterChartPoint(currentMonth, previousMonth, language);

        chartData.light.push(lightPoint);
        chartData.gas.push(gasPoint);
        chartData.water.push(waterPoint);

        previousMonth = currentMonth;
    }

    return chartData;
}

export function getLightLineChartConfig(data: LightChartPoint[], translations: TranslationKeys) {
    const lightLineChartConfig: ChartConfig = {
        labels: data.map((p) => p.label),
        datasets: [
            {
                label: translations.graphics.light,
                data: data.map((p) => p.light),
                borderColor: styles.green,
                backgroundColor: styles.green,
            },
            {
                label: translations.graphics.lightDay,
                data: data.map((p) => p.lightDay),
                borderColor: styles.lightGreen,
                backgroundColor: styles.lightGreen,
            },
            {
                label: translations.graphics.lightNight,
                data: data.map((p) => p.lightNight),
                borderColor: styles.grey,
                backgroundColor: styles.grey,
            },
        ],
        type: "line",
    };

    return lightLineChartConfig;
}

export function getGasLineChartConfig(data: GasChartPoint[], translations: TranslationKeys) {
    const gasLineChartConfig = {
        labels: data.map((p) => p.label),
        datasets: [
            {
                label: translations.graphics.gas,
                data: data.map((p) => p.gas),
                borderColor: styles.red,
                backgroundColor: styles.red,
            },
        ],
        type: "line",
    };

    return gasLineChartConfig;
}

export function getWaterLineChartConfig(data: WaterChartPoint[], translations: TranslationKeys) {
    const waterLineChartConfig = {
        labels: data.map((p) => p.label),
        datasets: [
            {
                label: translations.graphics.water,
                data: data.map((p) => p.water ?? 0),
                borderColor: styles.blue,
                backgroundColor: styles.blue,
            },
        ],
        type: "line",
    };

    return waterLineChartConfig;
}

function getLightChartPoint(
    currentMonth: MeterDataWithObjectId,
    previousMonth: MeterDataWithObjectId,
    language?: LanguageKey,
) {
    const lightChartPoint: LightChartPoint = {
        label: formatDate(currentMonth.date, language),
        light: currentMonth.light - previousMonth.light,
        lightDay: currentMonth.lightDay - previousMonth.lightDay,
        lightNight: currentMonth.lightNight - previousMonth.lightNight,
    };

    return lightChartPoint;
}

function getGasChartPoint(
    currentMonth: MeterDataWithObjectId,
    previousMonth: MeterDataWithObjectId,
    language?: LanguageKey,
) {
    const gasChartPoint: GasChartPoint = {
        label: formatDate(currentMonth.date, language),
        gas: getGasValueForChart(currentMonth, previousMonth),
    };

    return gasChartPoint;
}

function getWaterChartPoint(
    currentMonth: MeterDataWithObjectId,
    previousMonth: MeterDataWithObjectId,
    language?: LanguageKey,
) {
    const waterChartPoint: WaterChartPoint = {
        label: formatDate(currentMonth.date, language),
        water: getWaterValueForChart(currentMonth, previousMonth),
    };

    return waterChartPoint;
}

function getGasValueForChart(currentMonth: MeterDataWithObjectId, previousMonth: MeterDataWithObjectId) {
    const value = currentMonth.gas - previousMonth.gas;

    return value >= 0 ? value : 0;
}

function getWaterValueForChart(currentMonth: MeterDataWithObjectId, previousMonth: MeterDataWithObjectId) {
    return (currentMonth.water && previousMonth.water && currentMonth.water - previousMonth.water) || null;
}
