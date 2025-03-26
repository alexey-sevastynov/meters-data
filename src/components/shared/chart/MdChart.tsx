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

const colors = {
    white: "#f0fff7",
    black: "#000000",
    lightGreen: "#c3ff78",
    green: "#00af85",
    navLink: "#00c797",
    red: "#c20000",
    grey: "#d5d5d5",
    blue: "#006ed3",
} as const;

export function MdChart({ data, title }: MdChartProps) {
    const lang = useAppSelector(selectTranslations);
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
                {title} {lang.graphics["graphic"]}:
            </h4>
            <Line
                data={{
                    labels: filteredData.map((obj) => obj.label),
                    datasets: [
                        {
                            label: "Light",
                            data: filteredData.map((obj) => obj.light),
                            backgroundColor: colors.green,
                            borderColor: colors.green,
                        },
                        {
                            label: "Light Night",
                            data: filteredData.map((obj) => obj.lightNight),
                            backgroundColor: colors.grey,
                            borderColor: colors.grey,
                        },
                        {
                            label: "Light Day",
                            data: filteredData.map((obj) => obj.lightDay),
                            backgroundColor: colors.lightGreen,
                            borderColor: colors.lightGreen,
                        },
                        {
                            label: "Gas",
                            data: filteredData.map((obj) => obj.gas),
                            backgroundColor: colors.red,
                            borderColor: colors.red,
                        },
                        {
                            label: "Water",
                            data: filteredData.map((obj) => obj.water),
                            backgroundColor: colors.blue,
                            borderColor: colors.blue,
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
