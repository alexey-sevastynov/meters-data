import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

export interface MeterChartData {
    light: LightChartPoint[];
    gas: GasChartPoint[];
    water: WaterChartPoint[];
}

interface ChartPoint {
    label: string;
}

interface LightChartPoint extends ChartPoint {
    light: number;
    lightDay: number;
    lightNight: number;
}

interface GasChartPoint extends ChartPoint {
    gas: number;
}

interface WaterChartPoint extends ChartPoint {
    water: number | null;
}

export function getMeterChartData(metersData: MeterDataWithObjectId[]): MeterChartData {
    const chartData: MeterChartData = {
        light: [],
        gas: [],
        water: [],
    };

    let previousMonth = metersData[0];

    for (const currentMonth of metersData.slice(1)) {
        const lightPoint = getLightChartPoint(currentMonth, previousMonth);
        const gasPoint = getGasChartPoint(currentMonth, previousMonth);
        const waterPoint = getWaterChartPoint(currentMonth, previousMonth);

        chartData.light.push(lightPoint);
        chartData.gas.push(gasPoint);
        chartData.water.push(waterPoint);

        previousMonth = currentMonth;
    }

    return chartData;
}

function getLightChartPoint(currentMonth: MeterDataWithObjectId, previousMonth: MeterDataWithObjectId) {
    const lightChartPoint: LightChartPoint = {
        label: formatDate(currentMonth.date),
        light: currentMonth.light - previousMonth.light,
        lightDay: currentMonth.lightDay - previousMonth.lightDay,
        lightNight: currentMonth.lightNight - previousMonth.lightNight,
    };

    return lightChartPoint;
}

function getGasChartPoint(currentMonth: MeterDataWithObjectId, previousMonth: MeterDataWithObjectId) {
    const gasChartPoint: GasChartPoint = {
        label: formatDate(currentMonth.date),
        gas: getGasValueForChart(currentMonth, previousMonth),
    };

    return gasChartPoint;
}

function getWaterChartPoint(currentMonth: MeterDataWithObjectId, previousMonth: MeterDataWithObjectId) {
    const waterChartPoint: WaterChartPoint = {
        label: formatDate(currentMonth.date),
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
