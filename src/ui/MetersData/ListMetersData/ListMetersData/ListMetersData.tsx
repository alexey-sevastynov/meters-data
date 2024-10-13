import React, { useEffect, useRef, useState } from "react";
import Style from "./listMetersData.module.scss";
import GroupYear from "../GroupYear/GroupYear";
import { useAppSelector } from "@/redux/hook";
import { useLocation } from "react-router-dom";
import useMetersData from "@/hooks/useMetersData";
import {
  HEIGHT_COMPONENT_HEADER,
  WIDTH_COMPONENT_LIST_METERS_DATA_BIG,
  WIDTH_COMPONENT_LIST_METERS_DATA_SMALL,
} from "@/constants";
import { GroupedData } from "@/types/MeterDataType";
import { isEmptyObject } from "@/helpers/isEmptyObject";
import { selectTranslations } from "@/redux/slices/I18next";
import { groupAndSortItemsByYear } from "@/helpers/groupAndSortItemsByYear";
import { checkScreenSize, handleScroll } from "./listMetersData.function";

interface ListMetersDataProps {
  isWaterBlock: boolean;
}

export const ListMetersData: React.FC<ListMetersDataProps> = ({
  isWaterBlock,
}) => {
  const lang = useAppSelector(selectTranslations);

  const { isDataFromLocalStorage } = useMetersData();
  const { pathname } = useLocation();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const status = useAppSelector((props) => props.metersData.metersData.status);
  const addressCurrentPage = pathname.slice(1);
  const [groupedData, setGroupedData] = useState<GroupedData>({});

  const [listMetersDataTop, setListMetersDataTop] = useState(0);
  const [listMetersDataWidth, setListMetersDataWidth] = useState(0);
  const [idActiveBtn, setIdActiveBtn] = useState<string>("");

  const listMetersDataRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (items.length > 0) {
      const grouped = groupAndSortItemsByYear(items, addressCurrentPage);
      setGroupedData(grouped);
    }
  }, [items, addressCurrentPage]);

  const handleScrollEvent = () => {
    handleScroll(listMetersDataRef, setListMetersDataTop);
  };
  const checkScreenSizeEvent = () => {
    checkScreenSize(listMetersDataRef, setListMetersDataWidth);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    window.addEventListener("scroll", checkScreenSizeEvent);
    window.addEventListener("resize", checkScreenSizeEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      window.removeEventListener("scroll", checkScreenSizeEvent);
      window.removeEventListener("resize", checkScreenSizeEvent);
    };
  }, []);

  const isEmptyList = isEmptyObject(groupedData) && status === "loaded";
  const widthComponent =
    ((addressCurrentPage === "chelyuskina" ||
      addressCurrentPage === "slobozhansky-68a") &&
      WIDTH_COMPONENT_LIST_METERS_DATA_BIG) ||
    WIDTH_COMPONENT_LIST_METERS_DATA_SMALL;

  return (
    <ul
      ref={listMetersDataRef}
      className={Style.listMetersData}
    >
      {listMetersDataTop < HEIGHT_COMPONENT_HEADER &&
        listMetersDataWidth > widthComponent && (
          <li className={Style.headerList}>
            <p>{lang.infoPanel["date"]}:</p>
            <p>{lang.infoPanel["Light general"]}:</p>
            <p>{lang.infoPanel["Light day"]}:</p>
            <p>{lang.infoPanel["Light night"]}:</p>
            <p>{lang.infoPanel["Gas General"]}:</p>
            {(addressCurrentPage === "chelyuskina" ||
              addressCurrentPage === "slobozhansky-68a") && (
              <p>{lang.infoPanel["Water general"]}:</p>
            )}
          </li>
        )}
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
            setIdActiveBtn={setIdActiveBtn}
            idActiveBtn={idActiveBtn}
            setGroupedData={setGroupedData}
            groupedData={groupedData}
          />
        ))
      )}
    </ul>
  );
};
