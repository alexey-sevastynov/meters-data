import React, { useEffect, useState } from "react";
import Style from "./formDataMonth.module.scss";
import { FaEdit, FaPlusCircle } from "react-icons/fa";
import { SelectDate } from "@/components/SelectDate/SelectDate";
import { Input } from "@/components/Input/Input";
import { Button } from "@/ui/Button/Button";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  editMeterData,
  fetchAllMetersData,
  fetchPostMetersData,
  setNotEdit,
} from "@/redux/slices/MetersDataSlice";
import { useLocation } from "react-router-dom";

import { format, parse } from "date-fns";
import { AddressType, MeterDataType } from "@/types/MeterDataType";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";
import { COLORS, LIST_NAV } from "@/constants";
import { updateLocalStorageValues } from "../helpers/updateLocalStorageValue";
import { selectTranslations } from "@/redux/slices/I18next";

import { sendMessageToTelegram } from "@/helpers/sendMessageToTelegram";
import { calculateSum } from "@/helpers/calculateTotal";
import { SIZE_ICONS } from "@/constants/sizeIcons";

interface FormDataMonthProps {
  isWaterBlock: boolean;
  hideTotalLight?: boolean;
}

export const FormDataMonth: React.FC<FormDataMonthProps> = ({
  isWaterBlock,
  hideTotalLight = true,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const meterDataEdit = useAppSelector(
    (props) => props.metersData.meterDataEdit
  );
  const lang = useAppSelector(selectTranslations);

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
    if (localStorageValue !== null) {
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

  useEffect(() => {
    const totalLight = calculateSum(Number(lightDay), Number(lightNight));
    setLight(totalLight);
  }, [lightDay, lightNight]);

  const parsedDate =
    meterDataEdit && parse(meterDataEdit?.date, "MM.yyyy", new Date());

  // for telegram
  let message = `<b>${
    LIST_NAV.find((item) => item.link === `/${currentPage}`)?.id
  }</b>`;
  message += ` (${format(valueSelectDate, "MM.yyyy")})\n`;
  message += `\u{1F4A1} Light: ${light} kWt\n`;
  message += `\u{1F4A1}\u{1F31E} Light Day: ${lightDay} kWt\n`;
  message += `\u{1F4A1}\u{1F319} Light Night: ${lightNight} kWt\n`;
  message += `\u{1F525} Gas: ${gas} m³\n`;
  message += water ? `\u{1F6BF} Water: ${water} m³\n` : "";

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
                dispatch(fetchAllMetersData()).then(() => {
                  sendMessageToTelegram(import.meta.env.VITE_CHAD_ID, message);
                });
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

    if (currentPage && listCurrentPage.length > 0) {
      updateLocalStorageValues(
        currentPage,
        light,
        lightDay,
        lightNight,
        gas,
        water
      );
    }
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
    <form
      className={Style.formDataMonth}
      onSubmit={onSubmit}
    >
      <div className={Style.inputs}>
        <SelectDate
          value={valueSelectDate}
          onChange={onChange}
        />
        {hideTotalLight && (
          <Input
            className={Style.input}
            style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
            labelTextBold
            defaultValue={
              isEdit && meterDataEdit
                ? meterDataEdit?.light
                : setDefaultValue("light")
            }
            labelText={lang.infoPanel["Light general"]}
            value={light}
            setValue={setLight}
          />
        )}
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.lightDay
              : setDefaultValue("lightDay")
          }
          labelText={lang.infoPanel["Light day"]}
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
          labelText={lang.infoPanel["Light night"]}
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
          labelText={lang.infoPanel["Gas General"]}
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
            labelText={lang.infoPanel["Water general"]}
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
            {lang.btn["cancel"]}
          </Button>
        )}

        {isEdit ? (
          <Button
            type="submit"
            icon={<FaEdit size={SIZE_ICONS.medium} />}
          >
            {lang.btn["edit"]}
          </Button>
        ) : (
          <Button
            type="submit"
            icon={<FaPlusCircle size={SIZE_ICONS.medium} />}
          >
            {lang.btn["add"]}
          </Button>
        )}
      </div>
    </form>
  );
};
