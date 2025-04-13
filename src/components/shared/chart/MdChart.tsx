import Styles from "./chart.module.scss";
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

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface MdChartProps {
    data: ChartsDataType[];
    title: string;
}

export function MdChart({ data, title }: MdChartProps) {
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
        <div className={Styles.chart}>
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
                            backgroundColor: Styles.green,
                            borderColor: Styles.green,
                        },
                        {
                            label: "Light Night",
                            data: filteredData.map((obj) => obj.lightNight),
                            backgroundColor: Styles.grey,
                            borderColor: Styles.grey,
                        },
                        {
                            label: "Light Day",
                            data: filteredData.map((obj) => obj.lightDay),
                            backgroundColor: Styles.lightGreen,
                            borderColor: Styles.lightGreen,
                        },
                        {
                            label: "Gas",
                            data: filteredData.map((obj) => obj.gas),
                            backgroundColor: Styles.red,
                            borderColor: Styles.red,
                        },
                        {
                            label: "Water",
                            data: filteredData.map((obj) => obj.water),
                            backgroundColor: Styles.blue,
                            borderColor: Styles.blue,
                        },
                    ].filter((dataset) =>
                        title !== "Light"
                            ? dataset.label === title
                            : dataset.label === "Light" ||
                              dataset.label === "Light Day" ||
                              dataset.label === "Light Night"
                    ),
                }}
                options={{
                    elements: {
                        line: {
                            tension: 0.4,
                        },
                    },
                    plugins: {
                        title: {
                            text: "Charts line",
                        },
                    },
                }}
            />
        </div>
    );
}
