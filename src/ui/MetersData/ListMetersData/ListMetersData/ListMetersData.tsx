import React, { useEffect, useRef, useState } from "react";
import Style from "./listMetersData.module.scss";

import { ItemMetersData } from "../ItemMetersData/ItemMetersData";
import { useAppSelector } from "../../../../redux/hook";
import { useLocation } from "react-router-dom";
import { filterAndSortItemsByAddressAndDate } from "../../../../helpers/filterAndSortItemsByAddressAndDate";

import useMetersData from "../../../../hooks/useMetersData";
import {
  HEIGHT_COMPONENT_HEADER,
  WIDTH_COMPONENT_LIST_METERS_DATA_BIG,
  WIDTH_COMPONENT_LIST_METERS_DATA_SMALL,
} from "../../../../constants";
import { selectTranslations } from "../../../../redux/slices/I18next";

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
  const listMetersData = filterAndSortItemsByAddressAndDate(
    items,
    addressCurrentPage
  );
  const lang = useAppSelector(selectTranslations);

  const [listMetersDataTop, setListMetersDataTop] = useState(0);
  const [listMetersDataWidth, setListMetersDataWidth] = useState(0);
  const [idActiveBtn, setIdActiveBtn] = useState<string>("");
  const listMetersDataRef = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    if (listMetersDataRef.current) {
      setListMetersDataTop(
        listMetersDataRef.current.getBoundingClientRect().top
      );
    }
  };

  const checkScreenSize: any = () => {
    if (listMetersDataRef.current) {
      setListMetersDataWidth(
        listMetersDataRef.current.getBoundingClientRect().width
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", checkScreenSize);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const isEmptyList = listMetersData.length === 0 && status === "loaded";

  const widthComponent =
    ((addressCurrentPage == "chelyuskina" ||
      addressCurrentPage === "slobozhansky-68a") &&
      WIDTH_COMPONENT_LIST_METERS_DATA_BIG) ||
    WIDTH_COMPONENT_LIST_METERS_DATA_SMALL;

  return (
    <ul ref={listMetersDataRef} className={Style.listMetersData}>
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
        listMetersData.map((item, index) => (
          <ItemMetersData
            key={item._id}
            isFirstItem={index === 0}
            isLastItem={index === listMetersData.length - 1}
            isWaterBlock={isWaterBlock}
            setIdActiveBtn={setIdActiveBtn}
            idActiveBtn={idActiveBtn}
            {...item}
          />
        ))
      )}
    </ul>
  );
};
