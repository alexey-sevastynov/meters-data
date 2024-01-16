import React, { useEffect, useState } from "react";
import Style from "./formDataMonth.module.scss";
import { SelectDate } from "../../../components/SelectDate/SelectDate";
import { Input } from "../../../components/Input/Input";
import { Button } from "../../../components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  editMeterData,
  fetchAllMetersData,
  fetchPostMetersData,
  setNotEdit,
} from "../../../redux/slices/MetersDataSlice";
import { useLocation } from "react-router-dom";

import { format, parse } from "date-fns";
import { AddressType, MeterDataType } from "../../../types/MeterDataType";
import { filterAndSortItemsByAddressAndDate } from "../../../helpers/filterAndSortItemsByAddressAndDate";
import { KeysItemUtilityPricesType } from "../../../types/KeysItemUtilityPricesType";
import { COLORS } from "../../../constants";
import { updateLocalStorageValues } from "../helpers/updateLocalStorageValue";

interface FormDataMonthProps {
  isWaterBlock: boolean;
}

export const FormDataMonth: React.FC<FormDataMonthProps> = ({
  isWaterBlock,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const meterDataEdit = useAppSelector(
    (props) => props.metersData.meterDataEdit
  );

  const currentPage: AddressType = pathname.slice(1) as AddressType;

  const listCurrentPage = filterAndSortItemsByAddressAndDate(
    items,
    currentPage
  );

  const [valueSelectDate, onChange] = useState<any>(new Date());

  const setDefaultValue = (key: KeysItemUtilityPricesType): number => {
    const localStorageValue = localStorage.getItem(
      `metersData_${key}_${currentPage}`
    );
    if (localStorageValue !== null && listCurrentPage.length > 0) {
      return Number(localStorageValue);
    }

    if (listCurrentPage.length > 0) {
      const lastItem = listCurrentPage[listCurrentPage.length - 1][key];
      if (typeof lastItem === "number") {
        return lastItem;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const [light, setLight] = useState<number>(setDefaultValue("light"));
  const [lightDay, setLightDay] = useState<number>(setDefaultValue("lightDay"));
  const [lightNight, setLightNight] = useState<number>(
    setDefaultValue("lightNight")
  );
  const [gas, setGas] = useState<number>(setDefaultValue("gas"));
  const [water, setWater] = useState<number>(setDefaultValue("water"));

  const parsedDate =
    meterDataEdit && parse(meterDataEdit?.date, "MM.yyyy", new Date());

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      date: format(valueSelectDate, "MM.yyyy"),
      address: currentPage,
      light,
      lightDay,
      lightNight,
      gas,
      water: water || 0,
    };

    const isUniqueDate = !listCurrentPage.some(
      (item: MeterDataType) =>
        item.date === formData.date && meterDataEdit?.date !== formData.date
    );

    if (isEdit === true && meterDataEdit && isUniqueDate) {
      dispatch(editMeterData({ _id: meterDataEdit?._id, ...formData }))
        .then((response: any) => {
          if (response.payload) {
            dispatch(setNotEdit());
            dispatch(fetchAllMetersData());
          }
        })
        .catch((error: any) => {
          console.error("Error adding data:", error);
        });
    }

    if (isEdit === false) {
      const isDateAlreadyExists = listCurrentPage.some(
        (item: MeterDataType) =>
          item.date === format(valueSelectDate, "MM.yyyy")
      );

      if (!isDateAlreadyExists) {
        dispatch(fetchPostMetersData(formData))
          .then((response: any) => {
            if (response.payload) {
              setTimeout(() => {
                dispatch(fetchAllMetersData());
              }, 2500);
            }
          })
          .catch((error: any) => {
            console.error("Error adding data:", error);
          });
      }
    }

    updateLocalStorageValues(
      currentPage,
      light,
      lightDay,
      lightNight,
      gas,
      water
    );
  };

  useEffect(() => {
    dispatch(fetchAllMetersData());

    updateLocalStorageValues(
      currentPage,
      listCurrentPage[listCurrentPage.length - 1].light,
      listCurrentPage[listCurrentPage.length - 1].lightDay,
      listCurrentPage[listCurrentPage.length - 1].lightNight,
      listCurrentPage[listCurrentPage.length - 1].gas,
      listCurrentPage[listCurrentPage.length - 1].water
    );
  }, []);

  useEffect(() => {
    if (isEdit && meterDataEdit && parsedDate) {
      const customDate = new Date(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        0, // hours
        0, // minets
        0 // seconds
      );

      onChange(format(customDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"));
      setLight(meterDataEdit.light);
      setLightDay(meterDataEdit.lightDay);
      setLightNight(meterDataEdit.lightNight);
      setGas(meterDataEdit.gas);
      water && meterDataEdit.water && setWater(meterDataEdit.water);
    }
  }, [isEdit]);

  useEffect(() => {
    if (listCurrentPage.length > 0) {
      const setDefaultValue = (key: KeysItemUtilityPricesType) => {
        return listCurrentPage[listCurrentPage.length - 1][key] || 0;
      };

      if (!isEdit) {
        setLight(setDefaultValue("light"));
        setLightDay(setDefaultValue("lightDay"));
        setLightNight(setDefaultValue("lightNight"));
        setGas(setDefaultValue("gas"));
        setWater(setDefaultValue("water"));
        updateLocalStorageValues(
          currentPage,
          listCurrentPage[listCurrentPage.length - 1].light,
          listCurrentPage[listCurrentPage.length - 1].lightDay,
          listCurrentPage[listCurrentPage.length - 1].lightNight,
          listCurrentPage[listCurrentPage.length - 1].gas,
          listCurrentPage[listCurrentPage.length - 1].water
        );
      }
    }
  }, [isEdit, dispatch]);

  useEffect(() => {
    if (isEdit) {
      dispatch(setNotEdit());
    }
  }, [pathname]);

  return (
    <form className={Style.formDataMonth} onSubmit={onSubmit}>
      <div className={Style.inputs}>
        <SelectDate value={valueSelectDate} onChange={onChange} />
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.light
              : setDefaultValue("light")
          }
          labelText="Light general"
          value={light}
          setValue={setLight}
        />
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.lightDay
              : setDefaultValue("lightDay")
          }
          labelText="Light day"
          value={lightDay}
          setValue={setLightDay}
        />
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.lightNight
              : setDefaultValue("lightNight")
          }
          labelText="Light night"
          value={lightNight}
          setValue={setLightNight}
        />
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.gas
              : setDefaultValue("gas")
          }
          labelText="Gas general"
          value={gas}
          setValue={setGas}
        />
        {isWaterBlock && (
          <Input
            className={Style.input}
            style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
            labelTextBold
            defaultValue={
              isEdit && meterDataEdit
                ? meterDataEdit?.water || 0
                : setDefaultValue("water")
            }
            labelText="Water general"
            value={water}
            setValue={setWater}
          />
        )}
      </div>

      <div className={Style.btns}>
        {isEdit && (
          <Button
            type="button"
            style={{ backgroundColor: COLORS.red }}
            onClick={() => dispatch(setNotEdit())}
          >
            cancel
          </Button>
        )}

        {isEdit ? (
          <Button type="submit">edit</Button>
        ) : (
          <Button type="submit">add</Button>
        )}
      </div>
    </form>
  );
};
