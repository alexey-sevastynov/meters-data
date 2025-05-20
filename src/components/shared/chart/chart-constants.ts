import { ThemeMode, themeModes } from "@/components/context/theme-provider/theme-provider-types";
import {
    LineChartOptions,
    LineElementsOptions,
    LinePluginsOptions,
    LineScalesOptions,
} from "@/components/shared/chart/chart-types";

export function getChartOptions(theme: ThemeMode) {
    const isDarkMode = theme === themeModes.dark;

    const chartOptions: LineChartOptions = {
        elements: getElementsOptions(),
        plugins: getPluginsOptions(isDarkMode),
        scales: getScalesOptions(isDarkMode),
    };

    return chartOptions;
}

function getElementsOptions() {
    const elementsOptions: LineElementsOptions = {
        line: {
            tension: 0.4,
        },
    };

    return elementsOptions;
}

function getPluginsOptions(isDarkMode: boolean) {
    const legendOptions: LinePluginsOptions = {
        legend: {
            labels: {
                color: isDarkMode ? "#ffffff" : "#1a1a1a",
            },
        },
    };

    return legendOptions;
}

function getScalesOptions(isDarkMode: boolean) {
    const gridColor = isDarkMode ? "#2b3935" : "#d5d5d5";
    const tickColor = isDarkMode ? "#ffffff" : "#1a1a1a";

    const scalesOptions: LineScalesOptions = {
        x: {
            ticks: { color: tickColor },
            grid: { color: gridColor },
        },
        y: {
            ticks: { color: tickColor },
            grid: { color: gridColor },
        },
    };

    return scalesOptions;
}
