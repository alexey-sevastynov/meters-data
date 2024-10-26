import React from "react";
import Style from "./groupYear.module.scss";
import { ItemMetersData } from "../ItemMetersData/ItemMetersData";
import { GroupedData } from "@/types/MeterDataType";
import YearHeader from "../YearHeader/YearHeader";
import { handleToggle } from "./GroupYear.function";
import { hasOneElement } from "@/helpers/hasOneElement";

interface GroupYearProps {
  year: string;
  group: GroupedData[string];
  isFirstGroup: boolean;
  isLastGroup: boolean;
  isWaterBlock: boolean;
  idActiveBtn: string;
  setIdActiveBtn: React.Dispatch<React.SetStateAction<string>>;
  setGroupedData: React.Dispatch<React.SetStateAction<GroupedData>>;
  groupedData: GroupedData;
}

const GroupYear: React.FC<GroupYearProps> = ({
  year,
  group,
  isFirstGroup,
  isLastGroup,
  isWaterBlock,
  idActiveBtn,
  setIdActiveBtn,
  setGroupedData,
  groupedData,
}) => {
  const hasMultipleYears = !hasOneElement(groupedData);

  return (
    <div key={year}>
      {hasMultipleYears && (
        <YearHeader
          year={year}
          isOpen={group.isOpen}
          onToggle={() => handleToggle(year, setGroupedData)}
        />
      )}
      <div className={`${Style.yearGroup} ${group.isOpen ? Style.open : ""}`}>
        {group.items.map((item, index) => {
          const isFirstItem = isFirstGroup && index === group.items.length - 1;
          const isLastItem = isLastGroup && index === 0;

          return (
            <ItemMetersData
              key={item._id}
              isFirstItem={isFirstItem}
              isLastItem={isLastItem}
              isWaterBlock={isWaterBlock}
              setIdActiveBtn={setIdActiveBtn}
              idActiveBtn={idActiveBtn}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupYear;
