import React from "react";
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
import { COLORS } from "../../constants";
import { ChartsDataType } from "../../types/ChartsDataType";

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

interface ChartProps {
  data: ChartsDataType[];
  label: string;
}

export const Chart: React.FC<ChartProps> = ({ data, label }) => {
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

  console.log(filteredData);

  return (
    <div className={Styles.chart}>
      <h4>{label} graphics:</h4>
      <Line
        data={{
          labels: filteredData.map((data) => data.label),
          datasets: [
            {
              label: "Light",
              data: filteredData.map((data) => data.light),
              backgroundColor: COLORS.green,
              borderColor: COLORS.green,
            },
            {
              label: "Light Night",
              data: filteredData.map((data) => data.lightNight),
              backgroundColor: COLORS.grey,
              borderColor: COLORS.grey,
            },
            {
              label: "Light Day",
              data: filteredData.map((data) => data.lightDay),
              backgroundColor: COLORS.lightGreen,
              borderColor: COLORS.lightGreen,
            },
            {
              label: "Gas",
              data: filteredData.map((data) => data.gas),
              backgroundColor: COLORS.red,
              borderColor: COLORS.red,
            },
            {
              label: "Water",
              data: filteredData.map((data) => data.water),
              backgroundColor: COLORS.blue,
              borderColor: COLORS.blue,
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
};
