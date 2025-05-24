import React, { useEffect, useState } from "react";
import { format, parse, startOfDay } from "date-fns";
import styles from "./formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setNotEdit } from "@/store/slices/meters-data/slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import {
    calculateSum,
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
import { numberToString, stringToNumber } from "@/utils/conversion";

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

    const translations = useAppSelector(selectTranslations);

    useEffect(() => {
        if (!isEdit) {
            const nextMonth = getNextMonthDate(sortedAddressMeterData);

            setSelectDate(nextMonth);
        }
    }, [sortedAddressMeterData, isEdit]);

    const [light, setLight] = useState<string>(() =>
        setDefaultValue(categoryKeys.light, sortedAddressMeterData)
    );
    const [lightDay, setLightDay] = useState<string>(() =>
        setDefaultValue(categoryKeys.lightDay, sortedAddressMeterData)
    );
    const [lightNight, setLightNight] = useState<string>(() =>
        setDefaultValue(categoryKeys.lightNight, sortedAddressMeterData)
    );
    const [gas, setGas] = useState<string>(() => setDefaultValue(categoryKeys.gas, sortedAddressMeterData));
    const [water, setWater] = useState<string>(() =>
        setDefaultValue(categoryKeys.water, sortedAddressMeterData)
    );

    useEffect(() => {
        const totalLight = calculateSum(stringToNumber(lightDay), stringToNumber(lightNight));

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
            water: water,
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
        if (isEdit && meterDataEdit && parsedDate) {
            const normalizedDate = startOfDay(parsedDate);

            setSelectDate(normalizedDate);
            setLight(numberToString(meterDataEdit.light));
            setLightDay(numberToString(meterDataEdit.lightDay));
            setLightNight(numberToString(meterDataEdit.lightNight));
            setGas(numberToString(meterDataEdit.gas));

            if (water && meterDataEdit.water) setWater(numberToString(meterDataEdit.water));
        }
    }, [isEdit]);

    useEffect(() => {
        if (isEdit || !sortedAddressMeterData.length) return;

        setLight(getLastMeterValue(categoryKeys.light, sortedAddressMeterData));
        setLightDay(getLastMeterValue(categoryKeys.lightDay, sortedAddressMeterData));
        setLightNight(getLastMeterValue(categoryKeys.lightNight, sortedAddressMeterData));
        setGas(getLastMeterValue(categoryKeys.gas, sortedAddressMeterData));
        setWater(getLastMeterValue(categoryKeys.water, sortedAddressMeterData));
    }, [isEdit, dispatch]);

    useEffect(() => {
        if (isEdit) dispatch(setNotEdit());
    }, [pathname]);

    return (
        <form className={styles.formDataMonth} onSubmit={onSubmit}>
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
                sortedAddressMeterData={sortedAddressMeterData}
                translations={translations}
            />

            <FormActions isEdit={isEdit} dispatch={dispatch} lang={translations} />
        </form>
    );
}
