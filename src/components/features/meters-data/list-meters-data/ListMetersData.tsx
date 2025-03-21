import React, { useEffect, useRef, useState } from "react";
import Style from "./listMetersData.module.scss";
import GroupYear from "./group-year/GroupYear";
import { useAppSelector } from "@/redux/hook";
import { useLocation } from "react-router-dom";
import useMetersData from "@/hooks/useMetersData";
import { GroupedData } from "@/types/MeterDataType";
import { isEmptyObject } from "@/helpers/isEmptyObject";
import { groupAndSortItemsByYear } from "@/helpers/groupAndSortItemsByYear";

interface ListMetersDataProps {
  isWaterBlock: boolean;
}

export const ListMetersData: React.FC<ListMetersDataProps> = ({
  isWaterBlock,
}) => {
  const { isDataFromLocalStorage } = useMetersData();
  const { pathname } = useLocation();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const status = useAppSelector((props) => props.metersData.metersData.status);
  const addressCurrentPage = pathname.slice(1);
  const [groupedData, setGroupedData] = useState<GroupedData>({});

  const listMetersDataRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (items.length > 0) {
      const grouped = groupAndSortItemsByYear(items, addressCurrentPage);
      setGroupedData(grouped);
    }
  }, [items, addressCurrentPage]);

  const isEmptyList = isEmptyObject(groupedData) && status === "loaded";

  return (
    <ul
      ref={listMetersDataRef}
      className={Style.listMetersData}
    >
      {status === "loading" && <li>Loading...</li>}
      {isEmptyList ? (
        <p>{isDataFromLocalStorage ? "No cached items" : "No items"}</p>
      ) : (
        Object.entries(groupedData).map(([year, group], index, array) => (
          <GroupYear
            key={year}
            year={year}
            group={group}
            isFirstGroup={index === 0}
            isLastGroup={index === array.length - 1}
            isWaterBlock={isWaterBlock}
            setGroupedData={setGroupedData}
            groupedData={groupedData}
          />
        ))
      )}
    </ul>
  );
};
