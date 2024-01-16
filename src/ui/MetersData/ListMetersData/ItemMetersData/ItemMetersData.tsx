import React, { useEffect } from "react";
import Styles from "./itemMetersData.module.scss";
import { getIconUrl } from "../../../../helpers/getIconUrl";
import { AddressType } from "../../../../types/MeterDataType";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import {
  deleteMeterData,
  fetchAllMetersData,
  setMeterDataEdit,
  showMeterReadingCalc,
} from "../../../../redux/slices/MetersDataSlice";
import { formatDate } from "../../../../helpers/formatDate";
import { smoothScrollOnLoad } from "../../../../helpers/smoothScrollOnLoad";
import { ToastContainer } from "react-toastify";
import { updateLocalStorageValues } from "../../helpers/updateLocalStorageValue";
import { useLocation } from "react-router-dom";
import { filterAndSortItemsByAddressAndDate } from "../../../../helpers/filterAndSortItemsByAddressAndDate";

interface ItemMetersDataProps {
  _id: string;
  address: AddressType;
  isWaterBlock: boolean;
  date: string;
  light: number;
  lightDay: number;
  lightNight: number;
  gas: number;
  water?: number;
  isLastItem: boolean;
  isFirstItem: boolean;
}

export const ItemMetersData: React.FC<ItemMetersDataProps> = ({
  _id,
  address,
  isWaterBlock,
  date,
  light,
  lightDay,
  lightNight,
  gas,
  water,

  isLastItem,
  isFirstItem,
}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const items = useAppSelector((props) => props.metersData.metersData.items);
  const currentPage: AddressType = pathname.slice(1) as AddressType;

  const listCurrentPage = filterAndSortItemsByAddressAndDate(
    items,
    currentPage
  );

  const editItem = () => {
    dispatch(
      setMeterDataEdit({
        _id,
        address,
        date,
        light,
        lightDay,
        lightNight,
        gas,
        water,
      })
    );
  };
  const removeItem = () => {
    dispatch(deleteMeterData({ id: _id }))
      .then((response: any) => {
        if (response.payload) {
          dispatch(fetchAllMetersData());
        }
      })
      .catch((error: any) => {
        console.error("Error adding data:", error);
      });

    updateLocalStorageValues(
      currentPage,
      listCurrentPage[listCurrentPage.length - 2].light,
      listCurrentPage[listCurrentPage.length - 2].lightDay,
      listCurrentPage[listCurrentPage.length - 2].lightNight,
      listCurrentPage[listCurrentPage.length - 2].gas,
      listCurrentPage[listCurrentPage.length - 2].water
    );
  };

  useEffect(() => {
    if (isEdit) smoothScrollOnLoad(0);
  }, [isEdit]);

  return (
    <li className={Styles.itemMetersData}>
      <div className={Styles.data}>
        <p className={Styles.date}>{formatDate(date)}</p>
        <p className={Styles.light}>{light} kW</p>
        <p className={Styles.lightDay}>{lightDay} kW</p>
        <p className={Styles.lightNight}>{lightNight} kW</p>
        <p className={Styles.gas}>{gas} m³</p>
        {isWaterBlock && <p className={Styles.water}>{water} m³</p>}
      </div>

      <div className={Styles.btns}>
        {isFirstItem || (
          <button
            type="button"
            disabled={isEdit}
            title={`Сalculation of meter readings for ${date}`}
            onClick={() => {
              dispatch(showMeterReadingCalc({ id: _id, address }));
              smoothScrollOnLoad();
            }}
          >
            <img
              src={getIconUrl("show.png")}
              alt="show"
              width={25}
              height={25}
            />
          </button>
        )}
        <button
          type="button"
          disabled={isEdit}
          title={`edit meter readings`}
          onClick={editItem}
        >
          <img src={getIconUrl("edit.png")} alt="edit" width={25} height={25} />
        </button>

        {isLastItem && (
          <button
            type="button"
            disabled={isEdit}
            title={`delete data`}
            onClick={removeItem}
          >
            <img
              src={getIconUrl("delete.png")}
              alt="delete"
              width={25}
              height={25}
            />
          </button>
        )}
      </div>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </li>
  );
};
