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
import {
  confirmActionExit,
  confirmActionOnDelete,
  openPopup,
  setIdDelete,
  setQuestion,
} from "../../../../redux/slices/ConfirmPopupSlice";
import { selectTranslations } from "../../../../redux/slices/I18next";

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
  setIdActiveBtn: (showActiveBtn: string) => void;
  idActiveBtn: string;
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
  setIdActiveBtn,
  idActiveBtn,
}) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const isDelete = useAppSelector((props) => props.confirm.isActionDeleteItem);
  const idDelete = useAppSelector((props) => props.confirm.idDeleteItem);
  const lang = useAppSelector(selectTranslations);

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const currentPage: AddressType = pathname.slice(1) as AddressType;

  const newDate = formatDate(date);
  const month = newDate.split(",")[0];
  const year = newDate.split(",")[1];

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
    dispatch(openPopup());
    dispatch(setQuestion("Do you really want to delete?"));
    dispatch(setIdDelete(_id));
  };

  useEffect(() => {
    if (isDelete && idDelete === _id) {
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

      dispatch(confirmActionOnDelete(false));
      dispatch(confirmActionExit(false));
      dispatch(setIdDelete(null));
    }
  }, [isDelete]);

  useEffect(() => {
    if (isEdit) smoothScrollOnLoad(0);
  }, [isEdit]);

  useEffect(() => {
    if (isLastItem) setIdActiveBtn(isLastItem && _id);
  }, []);

  return (
    <li className={Styles.itemMetersData}>
      <div className={Styles.data}>
        <p className={Styles.date}>
          {lang.months[month]}, {year}
        </p>
        <p className={Styles.light}>
          {light} {lang.value.kW}
        </p>
        <p className={Styles.lightDay}>
          {lightDay} {lang.value.kW}
        </p>
        <p className={Styles.lightNight}>
          {lightNight} {lang.value.kW}
        </p>
        <p className={Styles.gas}>
          {gas} {lang.value["m³"]}
        </p>
        {isWaterBlock && (
          <p className={Styles.water}>
            {water} {lang.value["m³"]}
          </p>
        )}
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

              setIdActiveBtn(_id);
            }}
          >
            <img
              src={getIconUrl(
                idActiveBtn === _id ? "show-active.png" : "show.png"
              )}
              alt="show"
              width={25}
              height={25}
            />
          </button>
        )}
        <button
          type="button"
          disabled={isEdit}
          title={`edit meter readings `}
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
