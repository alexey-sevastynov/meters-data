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
import { colors } from "@/constants/colors";
import { ChartsDataType } from "@/types/ChartsDataType";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface MdChartProps {
    data: ChartsDataType[];
    title: string;
}

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
