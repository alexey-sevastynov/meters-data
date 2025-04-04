import React, { useEffect, useState } from "react";
import { format, parse, startOfDay } from "date-fns";
import Style from "./formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setNotEdit } from "@/store/slices/meters-data/slice";
import { updateLocalStorageValues } from "@/components/features/meters-data/helpers/updateLocalStorageValue";
import { selectTranslations } from "@/store/slices/i-18-next";
import { calculateSum } from "@/helpers/calculate-total";
import {
    checkDate,
    getLastMeterValue,
    getNextMonthDate,
    setDefaultValue,
    submitFormData,
} from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { FormActions } from "@/components/features/meters-data/form-data-month/form-actions/FormActions";
import { FormControls } from "@/components/features/meters-data/form-data-month/form-controls/FormControls";
import { DataPickerValue } from "@/types/data-picker";
import { categoryKeys } from "@/enums/category-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";

interface FormDataMonthProps {
    isWaterBlock: boolean;
    sortedAddressMeterData: MeterDataWithObjectId[];
    pathname: string;
    addressPath: string;
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
        setDefaultValue(categoryKeys.light, addressPath, sortedAddressMeterData)
    );
    const [lightDay, setLightDay] = useState<number>(() =>
        setDefaultValue(categoryKeys.lightDay, addressPath, sortedAddressMeterData)
    );
    const [lightNight, setLightNight] = useState<number>(() =>
        setDefaultValue(categoryKeys.lightNight, addressPath, sortedAddressMeterData)
    );
    const [gas, setGas] = useState<number>(() =>
        setDefaultValue(categoryKeys.gas, addressPath, sortedAddressMeterData)
    );
    const [water, setWater] = useState<number>(() =>
        setDefaultValue(categoryKeys.water, addressPath, sortedAddressMeterData)
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
        dispatch(getAllMetersData());

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

        setLight(getLastMeterValue(categoryKeys.light, sortedAddressMeterData));
        setLightDay(getLastMeterValue(categoryKeys.lightDay, sortedAddressMeterData));
        setLightNight(getLastMeterValue(categoryKeys.lightNight, sortedAddressMeterData));
        setGas(getLastMeterValue(categoryKeys.gas, sortedAddressMeterData));
        setWater(getLastMeterValue(categoryKeys.water, sortedAddressMeterData));
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
