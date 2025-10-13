import React, { useEffect, useState } from "react";
import { format, parse } from "date-fns";
import styles from "./formDataMonth.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import {
    getNextMonthDate,
    recalculateTotalLight,
    resetEditModeOnPathChange,
    setDefaultValue,
    setEditValues,
    setLastMeterValues,
    submitFormData,
    updateDateValue,
    updateDateWhenNotEdit,
    updateMeterValue,
} from "@/components/features/meters-form-section/form-data-month/formDataMonth.funcs";
import { FormActions } from "@/components/features/meters-form-section/form-data-month/form-actions/FormActions";
import { FormControls } from "@/components/features/meters-form-section/form-data-month/form-controls/FormControls";
import { categoryKeys } from "@/enums/category-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { FormMeterDataType } from "@/types/form-meter-data";
import { dateFormats } from "@/components/shared/date-display/constants";

interface FormDataMonthProps {
    isWaterBlock: boolean;
    sortedAddressMeterData: MeterDataWithObjectId[];
    pathname: string;
    addressPath: string;
}

export function FormDataMonth({
    isWaterBlock,
    sortedAddressMeterData,
    pathname,
    addressPath,
}: FormDataMonthProps) {
    const dispatch = useAppDispatch();
    const isEdit = useAppSelector((state) => state.metersData.isEdit);
    const meterDataEdit = useAppSelector((state) => state.metersData.meterDataEdit);
    const translations = useAppSelector(selectTranslations);
    const parsedDate = meterDataEdit && parse(meterDataEdit?.date, dateFormats.monthYear, new Date());

    const [meterValues, setMeterValues] = useState<FormMeterDataType>({
        date: format(getNextMonthDate(sortedAddressMeterData), dateFormats.monthYear),
        address: addressPath,
        light: setDefaultValue(categoryKeys.light, sortedAddressMeterData),
        lightDay: setDefaultValue(categoryKeys.lightDay, sortedAddressMeterData),
        lightNight: setDefaultValue(categoryKeys.lightNight, sortedAddressMeterData),
        gas: setDefaultValue(categoryKeys.gas, sortedAddressMeterData),
        water: setDefaultValue(categoryKeys.water, sortedAddressMeterData),
    });

    useEffect(() => {
        if (!isEdit) updateDateWhenNotEdit(sortedAddressMeterData, setMeterValues);
    }, [sortedAddressMeterData, isEdit]);

    useEffect(() => {
        recalculateTotalLight(meterValues.lightDay, meterValues.lightNight, setMeterValues);
    }, [meterValues.lightDay, meterValues.lightNight]);

    useEffect(() => {
        if (isEdit && meterDataEdit && parsedDate) {
            setEditValues(meterDataEdit, parsedDate, setMeterValues);
        }
    }, [isEdit]);

    useEffect(() => {
        setLastMeterValues(isEdit, sortedAddressMeterData, setMeterValues);
    }, [isEdit, dispatch]);

    useEffect(() => {
        resetEditModeOnPathChange(isEdit, dispatch);
    }, [pathname]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await submitFormData(
            meterValues,
            sortedAddressMeterData,
            meterDataEdit,
            isEdit,
            addressPath,
            parse(meterValues.date, dateFormats.monthYear, new Date()),
            meterValues.light,
            meterValues.lightDay,
            meterValues.lightNight,
            meterValues.gas,
            meterValues.water,
            dispatch
        );
    };

    return (
        <form className={styles.formDataMonth} onSubmit={onSubmit}>
            <FormControls
                isWaterBlock={isWaterBlock}
                selectDate={parse(meterValues.date, dateFormats.monthYear, new Date())}
                setSelectDate={(date) => updateDateValue(date, setMeterValues)}
                light={meterValues.light}
                setLight={(value) => updateMeterValue(categoryKeys.light, value, setMeterValues)}
                lightDay={meterValues.lightDay}
                setLightDay={(value) => updateMeterValue(categoryKeys.lightDay, value, setMeterValues)}
                lightNight={meterValues.lightNight}
                setLightNight={(value) => updateMeterValue(categoryKeys.lightNight, value, setMeterValues)}
                water={meterValues.water}
                setWater={(value) => updateMeterValue(categoryKeys.water, value, setMeterValues)}
                gas={meterValues.gas}
                setGas={(value) => updateMeterValue(categoryKeys.gas, value, setMeterValues)}
                isEdit={isEdit}
                meterDataEdit={meterDataEdit}
                sortedAddressMeterData={sortedAddressMeterData}
                translations={translations}
            />

            <FormActions isEdit={isEdit} dispatch={dispatch} lang={translations} />
        </form>
    );
}
