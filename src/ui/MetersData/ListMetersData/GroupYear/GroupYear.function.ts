import { GroupedData } from "@/types/MeterDataType";

export const handleToggle = (
  year: string,
  setGroupedData: React.Dispatch<React.SetStateAction<GroupedData>>
) => {
  setGroupedData((prev) => ({
    ...prev,
    [year]: {
      ...prev[year],
      isOpen: !prev[year].isOpen,
    },
  }));
};

export function getLastYear(groupedData: GroupedData): string | undefined {
  const years = getYears(groupedData);
  return years[years.length - 1];
}

function getYears(groupedData: GroupedData): string[] {
  return Object.keys(groupedData).sort();
}
