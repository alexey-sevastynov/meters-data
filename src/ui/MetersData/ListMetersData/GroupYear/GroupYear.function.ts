import { GroupedData } from "../../../../types/MeterDataType";

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
