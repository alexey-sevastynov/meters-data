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

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface MdChartProps {
  data: ChartsDataType[];
  label: string;
}

export function MdChart({ data, label }: MdChartProps) {
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
        {label} {lang.graphics["graphic"]}:
      </h4>
      <Line
        data={{
          labels: filteredData.map((data) => data.label),
          datasets: [
            {
              label: "Light",
              data: filteredData.map((data) => data.light),
              backgroundColor: colors.green,
              borderColor: colors.green,
            },
            {
              label: "Light Night",
              data: filteredData.map((data) => data.lightNight),
              backgroundColor: colors.grey,
              borderColor: colors.grey,
            },
            {
              label: "Light Day",
              data: filteredData.map((data) => data.lightDay),
              backgroundColor: colors.lightGreen,
              borderColor: colors.lightGreen,
            },
            {
              label: "Gas",
              data: filteredData.map((data) => data.gas),
              backgroundColor: colors.red,
              borderColor: colors.red,
            },
            {
              label: "Water",
              data: filteredData.map((data) => data.water),
              backgroundColor: colors.blue,
              borderColor: colors.blue,
            },
          ].filter((dataset) =>
            label !== "Light"
              ? dataset.label === label
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
