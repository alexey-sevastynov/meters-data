import styles from "./chart.module.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    defaults,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartsDataType } from "@/types/charts-data-type";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getChartOptions } from "@/components/shared/chart/chart-constants";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface MdChartProps {
    data: ChartsDataType[];
    title: string;
    titleKey: string;
}

export function MdChart({ data, title, titleKey }: MdChartProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);
    const filteredData = data.map((chartData: ChartsDataType) => {
        if (chartData.water === null) {
            return {
                label: chartData.label,
                light: chartData.light,
                lightDay: chartData.lightDay,
                lightNight: chartData.lightNight,
                gas: chartData.gas,
            };
        } else {
            return { ...chartData };
        }
    });

    return (
        <div className={styles.root}>
            <h4>{title}</h4>
            <Line
                data={{
                    labels: filteredData.map((obj) => obj.label),
                    datasets: [
                        {
                            label: translations.graphics.light,
                            labelKey: "Light",
                            data: filteredData.map((obj) => obj.light),
                            backgroundColor: styles.green,
                            borderColor: styles.green,
                        },
                        {
                            label: translations.graphics.lightDay,
                            labelKey: "Light Night",
                            data: filteredData.map((obj) => obj.lightNight),
                            backgroundColor: styles.grey,
                            borderColor: styles.grey,
                        },
                        {
                            label: translations.graphics.lightNight,
                            labelKey: "Light Day",
                            data: filteredData.map((obj) => obj.lightDay),
                            backgroundColor: styles.lightGreen,
                            borderColor: styles.lightGreen,
                        },
                        {
                            label: translations.graphics.gas,
                            labelKey: "Gas",
                            data: filteredData.map((obj) => obj.gas),
                            backgroundColor: styles.red,
                            borderColor: styles.red,
                        },
                        {
                            label: translations.graphics.water,
                            labelKey: "Water",
                            data: filteredData.map((obj) => obj.water),
                            backgroundColor: styles.blue,
                            borderColor: styles.blue,
                        },
                    ].filter((dataset) =>
                        titleKey !== "Light"
                            ? dataset.labelKey === titleKey
                            : dataset.labelKey === "Light" ||
                              dataset.labelKey === "Light Day" ||
                              dataset.labelKey === "Light Night",
                    ),
                }}
                options={getChartOptions(theme.themeMode)}
            />
        </div>
    );
}
