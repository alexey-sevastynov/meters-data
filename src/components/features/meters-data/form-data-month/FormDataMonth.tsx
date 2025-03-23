import React, { useEffect, useState } from "react";
import { format, parse, startOfDay } from "date-fns";
import Style from "./formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchAllMetersData, setNotEdit } from "@/redux/slices/MetersDataSlice";
import { AddressType, MeterDataType } from "@/types/MeterDataType";
import { updateLocalStorageValues } from "@/components/features/meters-data/helpers/updateLocalStorageValue";
import { selectTranslations } from "@/redux/slices/I18next";
import { calculateSum } from "@/helpers/calculateTotal";
import {
    checkDate,
    getLastMeterValue,
    getNextMonthDate,
    setDefaultValue,
    submitFormData,
} from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { FormActions } from "@/components/features/meters-data/form-data-month/form-actions/FormActions";
import { FormControls } from "@/components/features/meters-data/form-data-month/form-controls/FormControls";
import { DataPickerValue } from "@/types/DataPicker";
import { utilityMeterKeys } from "@/types/KeysItemUtilityPricesType";

interface FormDataMonthProps {
    isWaterBlock: boolean;
    sortedAddressMeterData: MeterDataType[];
    pathname: string;
    addressPath: AddressType;
}

// eslint-disable-next-line max-lines-per-function
export function FormDataMonth({
    isWaterBlock,
    sortedAddressMeterData,
    pathname,
    addressPath,
}: FormDataMonthProps) {
    const dispatch = useAppDispatch();
    const [selectDate, setSelectDate] = useState<DataPickerValue>(getNextMonthDate(sortedAddressMeterData));

    const isEdit = useAppSelector((state) => state.metersData.isEdit);
    const meterDataEdit = useAppSelector((state) => state.metersData.meterDataEdit);
    const lang = useAppSelector(selectTranslations);

    useEffect(() => {
        if (!isEdit) {
            const nextMonth = getNextMonthDate(sortedAddressMeterData);

            setSelectDate(nextMonth);
        }
    }, [sortedAddressMeterData, isEdit]);

    const [light, setLight] = useState<number>(() =>
        setDefaultValue(utilityMeterKeys.light, addressPath, sortedAddressMeterData)
    );
    const [lightDay, setLightDay] = useState<number>(() =>
        setDefaultValue(utilityMeterKeys.lightDay, addressPath, sortedAddressMeterData)
    );
    const [lightNight, setLightNight] = useState<number>(() =>
        setDefaultValue(utilityMeterKeys.lightNight, addressPath, sortedAddressMeterData)
    );
    const [gas, setGas] = useState<number>(() =>
        setDefaultValue(utilityMeterKeys.gas, addressPath, sortedAddressMeterData)
    );
    const [water, setWater] = useState<number>(() =>
        setDefaultValue(utilityMeterKeys.water, addressPath, sortedAddressMeterData)
    );

    useEffect(() => {
        const totalLight = calculateSum(Number(lightDay), Number(lightNight));

        setLight(totalLight);
    }, [lightDay, lightNight]);

    const parsedDate = meterDataEdit && parse(meterDataEdit?.date, "MM.yyyy", new Date());

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

        await submitFormData(
            formData,
            sortedAddressMeterData,
            meterDataEdit,
            isEdit,
            addressPath,
            selectDate,
            light,
            lightDay,
            lightNight,
            gas,
            water,
            dispatch
        );
    };

    useEffect(() => {
        dispatch(fetchAllMetersData());

        if (addressPath && sortedAddressMeterData.length > 0) {
            updateLocalStorageValues(addressPath, light, lightDay, lightNight, gas, water);
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
        if (isEdit || !sortedAddressMeterData.length) return;

        setLight(getLastMeterValue(utilityMeterKeys.light, sortedAddressMeterData));
        setLightDay(getLastMeterValue(utilityMeterKeys.lightDay, sortedAddressMeterData));
        setLightNight(getLastMeterValue(utilityMeterKeys.lightNight, sortedAddressMeterData));
        setGas(getLastMeterValue(utilityMeterKeys.gas, sortedAddressMeterData));
        setWater(getLastMeterValue(utilityMeterKeys.water, sortedAddressMeterData));
        updateLocalStorageValues(
            addressPath,
            sortedAddressMeterData[sortedAddressMeterData.length - 1].light,
            sortedAddressMeterData[sortedAddressMeterData.length - 1].lightDay,
            sortedAddressMeterData[sortedAddressMeterData.length - 1].lightNight,
            sortedAddressMeterData[sortedAddressMeterData.length - 1].gas,
            sortedAddressMeterData[sortedAddressMeterData.length - 1].water
        );
    }, [isEdit, dispatch]);

    useEffect(() => {
        if (isEdit) {
            dispatch(setNotEdit());
        }
    }, [pathname]);

    return (
        <form className={Style.formDataMonth} onSubmit={onSubmit}>
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

            <FormActions isEdit={isEdit} dispatch={dispatch} lang={lang} />
        </form>
    );
}
