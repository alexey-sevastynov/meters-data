import React from "react";
import Style from "./listMetersData.module.scss";
import { LIST_DATA } from "../../../../constants";
import { ItemMetersData } from "../ItemMetersData/ItemMetersData";
import { useAppSelector } from "../../../../redux/hook";
import { useLocation } from "react-router-dom";
import { filterAndSortItemsByAddressAndDate } from "../../../../helpers/filterAndSortItemsByAddressAndDate";
import { AddressType } from "../../../../types/MeterDataType";

interface ListMetersDataProps {
  isWaterBlock: boolean;
}

export const ListMetersData: React.FC<ListMetersDataProps> = ({
  isWaterBlock,
}) => {
  const { pathname } = useLocation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Добавляем параметр behavior для плавного скролла
    });
  };

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const status = useAppSelector((props) => props.metersData.metersData.status);
  const addressCurrentPage = pathname.slice(1);
  const listMetersData = filterAndSortItemsByAddressAndDate(
    items,
    addressCurrentPage
  );

  const isEmptyList = listMetersData.length === 0 && status === "loaded";

  return (
    <ul className={Style.listMetersData}>
      {status === "loading" && <li>Loading...</li>}
      {isEmptyList ? (
        <p>not items</p>
      ) : (
        listMetersData.map((item, index) => (
          <ItemMetersData
            key={item._id}
            isFirstItem={index === 0}
            isLastItem={index === listMetersData.length - 1}
            isWaterBlock={isWaterBlock}
            {...item}
          />
        ))
      )}
    </ul>
  );
};
