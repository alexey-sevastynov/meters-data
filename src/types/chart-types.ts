import { ChartDataset, ChartType } from "chart.js";

interface ChartPoint {
    label: string;
}

export interface ChartConfig<TType extends ChartType = "line", TData = number[]> {
    labels: string[];
    datasets: ChartDataset<TType, TData>[];
    type?: TType;
}

export interface MeterChartData {
    light: LightChartPoint[];
    gas: GasChartPoint[];
    water: WaterChartPoint[];
}

export interface LightChartPoint extends ChartPoint {
    light: number;
    lightDay: number;
    lightNight: number;
}

export interface GasChartPoint extends ChartPoint {
    gas: number;
}

export interface WaterChartPoint extends ChartPoint {
    water: number | null;
}
