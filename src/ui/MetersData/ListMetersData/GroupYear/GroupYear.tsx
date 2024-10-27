import React from "react";

import { GroupedData } from "@/types/MeterDataType";
import { hasOneElement } from "@/helpers/hasOneElement";
import Style from "./groupYear.module.scss";
import { ItemMetersData } from "../ItemMetersData/ItemMetersData";
import { getLastYear, handleToggle } from "./groupYear.function";
import YearHeader from "../YearHeader/YearHeader";
import { HeadMetersData } from "../HeadMeterData/HeadMetersData";

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
  const lastYear = getLastYear(groupedData);

  return (
    <div key={year}>
      {hasMultipleYears && year !== lastYear && (
        <YearHeader
          year={year}
          isOpen={group.isOpen}
          onToggle={() => handleToggle(year, setGroupedData)}
        />
      )}

      <HeadMetersData
        isWaterBlock={isWaterBlock}
        isOpen={group.isOpen}
      />
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
