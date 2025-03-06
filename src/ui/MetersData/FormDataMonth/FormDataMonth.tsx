import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format, parse } from "date-fns";
import Style from "@/ui/MetersData/FormDataMonth/formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  editMeterData,
  fetchAllMetersData,
  fetchPostMetersData,
  setNotEdit,
} from "@/redux/slices/MetersDataSlice";
import { AddressType, MeterDataType } from "@/types/MeterDataType";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";
import { updateLocalStorageValues } from "@/ui/MetersData/helpers/updateLocalStorageValue";
import { selectTranslations } from "@/redux/slices/I18next";
import { sendMessageToTelegram } from "@/helpers/sendMessageToTelegram";
import { calculateSum } from "@/helpers/calculateTotal";
import {
  generateMessage,
  getNextMonthDate,
  setDefaultValue,
} from "@/ui/MetersData/FormDataMonth/formDataMonth.function";
import { FormActions } from "@/ui/MetersData/FormDataMonth/FormActions/FormActions";
import { FormControls } from "@/ui/MetersData/FormDataMonth/FormControls/FormControls";

interface FormDataMonthProps {
  isWaterBlock: boolean;
}

export const FormDataMonth: React.FC<FormDataMonthProps> = ({
  isWaterBlock,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const [valueSelectDate, onChange] = useState<any>(new Date());

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

  useEffect(() => {
    if (!isEdit) {
      const nextMonth = getNextMonthDate(listCurrentPage);
      onChange(nextMonth);
    }
  }, []);

  const [light, setLight] = useState<number>(() =>
    setDefaultValue("light", currentPage, listCurrentPage)
  );
  const [lightDay, setLightDay] = useState<number>(() =>
    setDefaultValue("lightDay", currentPage, listCurrentPage)
  );
  const [lightNight, setLightNight] = useState<number>(() =>
    setDefaultValue("lightNight", currentPage, listCurrentPage)
  );
  const [gas, setGas] = useState<number>(() =>
    setDefaultValue("gas", currentPage, listCurrentPage)
  );
  const [water, setWater] = useState<number>(() =>
    setDefaultValue("water", currentPage, listCurrentPage)
  );

  useEffect(() => {
    const totalLight = calculateSum(Number(lightDay), Number(lightNight));
    setLight(totalLight);
  }, [lightDay, lightNight]);

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
                dispatch(fetchAllMetersData()).then(() => {
                  const message = generateMessage(
                    currentPage,
                    valueSelectDate,
                    light,
                    lightDay,
                    lightNight,
                    gas,
                    water
                  );

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
      <FormControls
        isWaterBlock={isWaterBlock}
        valueSelectDate={valueSelectDate}
        onChange={onChange}
        light={light}
        setLight={setLight}
        lightDay={lightDay}
        setLightDay={setLightDay}
        lightNight={lightNight}
        setLightNight={setLightNight}
        water={water}
        setWater={setWater}
        gas={gas}
        setGas={setGas}
        isEdit={isEdit}
        meterDataEdit={meterDataEdit}
        currentPage={currentPage}
        listCurrentPage={listCurrentPage}
        lang={lang}
      />

      <FormActions
        isEdit={isEdit}
        dispatch={dispatch}
        lang={lang}
      />
    </form>
  );
};
