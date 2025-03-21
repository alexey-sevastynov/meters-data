import React, { useEffect, useState } from "react";
import { format, parse, startOfDay } from "date-fns";
import Style from "./formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllMetersData, setNotEdit } from "@/redux/slices/MetersDataSlice";
import { AddressType, MeterDataType } from "@/types/MeterDataType";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";
import { updateLocalStorageValues } from "@/components/features/meters-data/helpers/updateLocalStorageValue";
import { selectTranslations } from "@/redux/slices/I18next";
import { calculateSum } from "@/helpers/calculateTotal";
import {
  checkDate,
  getNextMonthDate,
  handleEditMeterData,
  handlePostMeterData,
  setDefaultValue,
} from "@/components/features/meters-data/form-data-month/formDataMonth.function";
import { FormActions } from "@/components/features/meters-data/form-data-month/form-actions/FormActions";
import { FormControls } from "@/components/features/meters-data/form-data-month/form-controls/FormControls";
import { DataPickerValue } from "@/types/DataPicker";

interface FormDataMonthProps {
  isWaterBlock: boolean;
  sortedAddressMeterData: MeterDataType[];
  pathname: string;
  addressPath: AddressType;
}

export function FormDataMonth({
  isWaterBlock,
  sortedAddressMeterData,
  pathname,
  addressPath,
}: FormDataMonthProps) {
  const dispatch = useAppDispatch();
  const [selectDate, setSelectDate] = useState<DataPickerValue>(
    getNextMonthDate(sortedAddressMeterData)
  );

  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const meterDataEdit = useAppSelector(
    (props) => props.metersData.meterDataEdit
  );
  const lang = useAppSelector(selectTranslations);

  useEffect(() => {
    if (!isEdit) {
      const nextMonth = getNextMonthDate(sortedAddressMeterData);

      setSelectDate(nextMonth);
    }
  }, [sortedAddressMeterData, isEdit]);

  const [light, setLight] = useState<number>(() =>
    setDefaultValue("light", addressPath, sortedAddressMeterData)
  );
  const [lightDay, setLightDay] = useState<number>(() =>
    setDefaultValue("lightDay", addressPath, sortedAddressMeterData)
  );
  const [lightNight, setLightNight] = useState<number>(() =>
    setDefaultValue("lightNight", addressPath, sortedAddressMeterData)
  );
  const [gas, setGas] = useState<number>(() =>
    setDefaultValue("gas", addressPath, sortedAddressMeterData)
  );
  const [water, setWater] = useState<number>(() =>
    setDefaultValue("water", addressPath, sortedAddressMeterData)
  );

  useEffect(() => {
    const totalLight = calculateSum(Number(lightDay), Number(lightNight));

    setLight(totalLight);
  }, [lightDay, lightNight]);

  const parsedDate =
    meterDataEdit && parse(meterDataEdit?.date, "MM.yyyy", new Date());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      date: format(checkDate(selectDate), "MM.yyyy"),
      address: addressPath,
      light,
      lightDay,
      lightNight,
      gas,
      water: water || 0,
    };

    const isUniqueDate = !sortedAddressMeterData.some(
      (item: MeterDataType) =>
        item.date === formData.date && meterDataEdit?.date !== formData.date
    );

    if (isEdit === true && meterDataEdit && isUniqueDate) {
      await handleEditMeterData(meterDataEdit, formData, dispatch);
    }

    if (isEdit === false) {
      const isDateAlreadyExists = sortedAddressMeterData.some(
        (item: MeterDataType) =>
          item.date === format(checkDate(selectDate), "MM.yyyy")
      );

      if (!isDateAlreadyExists) {
        await handlePostMeterData(
          formData,
          addressPath,
          selectDate,
          light,
          lightDay,
          lightNight,
          gas,
          water,
          dispatch
        );
      }
    }

    updateLocalStorageValues(
      addressPath,
      light,
      lightDay,
      lightNight,
      gas,
      water
    );
  };

  useEffect(() => {
    dispatch(fetchAllMetersData());

    if (addressPath && sortedAddressMeterData.length > 0) {
      updateLocalStorageValues(
        addressPath,
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
      const normalizedDate = startOfDay(parsedDate);

      setSelectDate(normalizedDate);
      setLight(meterDataEdit.light);
      setLightDay(meterDataEdit.lightDay);
      setLightNight(meterDataEdit.lightNight);
      setGas(meterDataEdit.gas);

      if (water && meterDataEdit.water) setWater(meterDataEdit.water);
    }
  }, [isEdit]);

  useEffect(() => {
    if (sortedAddressMeterData.length > 0) {
      const setDefaultValue = (key: KeysItemUtilityPricesType) => {
        return (
          sortedAddressMeterData[sortedAddressMeterData.length - 1][key] || 0
        );
      };

      if (!isEdit) {
        setLight(setDefaultValue("light"));
        setLightDay(setDefaultValue("lightDay"));
        setLightNight(setDefaultValue("lightNight"));
        setGas(setDefaultValue("gas"));
        setWater(setDefaultValue("water"));
        updateLocalStorageValues(
          addressPath,
          sortedAddressMeterData[sortedAddressMeterData.length - 1].light,
          sortedAddressMeterData[sortedAddressMeterData.length - 1].lightDay,
          sortedAddressMeterData[sortedAddressMeterData.length - 1].lightNight,
          sortedAddressMeterData[sortedAddressMeterData.length - 1].gas,
          sortedAddressMeterData[sortedAddressMeterData.length - 1].water
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
        selectDate={selectDate}
        setSelectDate={setSelectDate}
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
        currentPage={addressPath}
        sortedAddressMeterData={sortedAddressMeterData}
        lang={lang}
      />

      <FormActions
        isEdit={isEdit}
        dispatch={dispatch}
        lang={lang}
      />
    </form>
  );
}
