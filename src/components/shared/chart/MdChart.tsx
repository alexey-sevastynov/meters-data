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
    ChartDataset,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getChartOptions } from "@/components/shared/chart/chart-constants";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface MdChartProps {
    title: string;
    labels: string[];
    datasets: ChartDataset<"line", number[]>[];
}

export function MdChart({ title, labels, datasets }: MdChartProps) {
    const theme = useTheme();

    return (
        <div className={styles.root}>
            <h4>{title}</h4>
            <Line data={{ labels, datasets }} options={getChartOptions(theme.themeMode)} />
        </div>
    );
}
