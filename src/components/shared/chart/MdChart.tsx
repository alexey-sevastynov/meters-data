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
}

export function MdChart({ data, title }: MdChartProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);
    const filteredData = data.map((obj: ChartsDataType) => {
        const { label, light, lightDay, lightNight, gas, water } = obj;

        if (water === null) {
            return {
                label,
                light,
                lightDay,
                lightNight,
                gas,
            };
        } else {
            return { ...obj };
        }
    });

    return (
        <div className={styles.chart}>
            <h4>
                {title} {translations.graphics["graphic"]}:
            </h4>
            <Line
                data={{
                    labels: filteredData.map((obj) => obj.label),
                    datasets: [
                        {
                            label: "Light",
                            data: filteredData.map((obj) => obj.light),
                            backgroundColor: styles.green,
                            borderColor: styles.green,
                        },
                        {
                            label: "Light Night",
                            data: filteredData.map((obj) => obj.lightNight),
                            backgroundColor: styles.grey,
                            borderColor: styles.grey,
                        },
                        {
                            label: "Light Day",
                            data: filteredData.map((obj) => obj.lightDay),
                            backgroundColor: styles.lightGreen,
                            borderColor: styles.lightGreen,
                        },
                        {
                            label: "Gas",
                            data: filteredData.map((obj) => obj.gas),
                            backgroundColor: styles.red,
                            borderColor: styles.red,
                        },
                        {
                            label: "Water",
                            data: filteredData.map((obj) => obj.water),
                            backgroundColor: styles.blue,
                            borderColor: styles.blue,
                        },
                    ].filter((dataset) =>
                        title !== "Light"
                            ? dataset.label === title
                            : dataset.label === "Light" ||
                              dataset.label === "Light Day" ||
                              dataset.label === "Light Night"
                    ),
                }}
                options={getChartOptions(theme.themeMode)}
            />
        </div>
    );
}
