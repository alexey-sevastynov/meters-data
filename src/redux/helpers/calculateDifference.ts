import { formatDate } from "../../helpers/formatDate";
import { MeterDataType } from "../../types/MeterDataType";

export function calculateDifference(
  itemLast: MeterDataType,
  itemPenultimate: MeterDataType
) {
  return [
    {
      title: "Date",
      description: formatDate(itemLast.date),
    },
    {
      title: "Light general",
      description: (itemLast.light - itemPenultimate.light).toFixed(2),
    },
    {
      title: "Light day",
      description: (itemLast.lightDay - itemPenultimate.lightDay).toFixed(2),
    },
    {
      title: "Light night",
      description: (itemLast.lightNight - itemPenultimate.lightNight).toFixed(
        2
      ),
    },
    {
      title: "Gas General",
      description: (itemLast.gas - itemPenultimate.gas).toFixed(2),
    },
    {
      title: "Water general",
      description: (
        (itemLast.water || 0) - (itemPenultimate.water || 0)
      ).toFixed(2),
    },
  ];
}
