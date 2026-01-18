import { addMonths, format, parse, startOfDay } from "date-fns";
import { SetStateAction } from "react";
import { navigationAddressItems } from "@/constants/navigation-items";
import { sortMeterDataListByDateAsc } from "@/helpers/meters-data/sort";
import { CategoryKey, categoryKeys } from "@/enums/category-keys";
import { DataPickerValue } from "@/types/data-picker";
import { setNotEdit } from "@/store/slices/meters-data/slice";
import { AppDispatch } from "@/store/store";
import { FormMeterDataType } from "@/types/form-meter-data";
import { sendMessageToTelegram } from "@/infra/telegram/send-message";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import {
    createMetersData,
    getAllMetersData,
    updateMeterData,
} from "@/store/slices/meters-data/meters-data.thunks";
import { numberToString, stringToNumber } from "@/utils/conversion";
import { isNumber } from "@/utils/guards";
import { errorMessage } from "@/constants/error-message";
import { emitMetaDataSocketEvent } from "@/infra/socket/socket-client";
import { socketEventNames } from "@/infra/socket/socket-event-names";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { dateFormats } from "@/components/shared/date-display/constants";

export function updateDateWhenNotEdit(
    sortedAddressMeterData: MeterDataWithObjectId[],
    setMeterValues: SetStateFunc<FormMeterDataType>,
) {
    const nextMonth = getNextMonthDate(sortedAddressMeterData);
    const formattedDate = format(nextMonth, dateFormats.monthYear);

    setMeterValues((prev) => ({ ...prev, date: formattedDate }));
}

export function recalculateTotalLight(
    lightDay: string,
    lightNight: string,
    setMeterValues: SetStateFunc<FormMeterDataType>,
) {
    const totalLight = calculateSum(stringToNumber(lightDay), stringToNumber(lightNight));

    setMeterValues((prev) => ({ ...prev, light: totalLight }));
}

export function setEditValues(
    meterDataEdit: MeterDataWithObjectId,
    parsedDate: Date,
    setMeterValues: SetStateFunc<FormMeterDataType>,
) {
    const normalizedDate = startOfDay(parsedDate);
    const formattedDate = format(normalizedDate, dateFormats.monthYear);

    setMeterValues((prev) => ({
        ...prev,
        date: formattedDate,
        light: numberToString(meterDataEdit.light),
        lightDay: numberToString(meterDataEdit.lightDay),
        lightNight: numberToString(meterDataEdit.lightNight),
        gas: numberToString(meterDataEdit.gas),
        water: meterDataEdit.water ? numberToString(meterDataEdit.water) : "",
    }));
}

export function setLastMeterValues(
    isEdit: boolean,
    sortedAddressMeterData: MeterDataWithObjectId[],
    setMeterValues: SetStateFunc<FormMeterDataType>,
) {
    if (isEdit || !sortedAddressMeterData.length) return;

    setMeterValues((prev) => ({
        ...prev,
        light: getLastMeterValue(categoryKeys.light, sortedAddressMeterData),
        lightDay: getLastMeterValue(categoryKeys.lightDay, sortedAddressMeterData),
        lightNight: getLastMeterValue(categoryKeys.lightNight, sortedAddressMeterData),
        gas: getLastMeterValue(categoryKeys.gas, sortedAddressMeterData),
        water: getLastMeterValue(categoryKeys.water, sortedAddressMeterData),
    }));
}

export function resetEditModeOnPathChange(isEdit: boolean, dispatch: AppDispatch) {
    if (isEdit) dispatch(setNotEdit());
}

export function updateMeterValue<K extends keyof FormMeterDataType>(
    key: K,
    value: SetStateAction<FormMeterDataType[K]>,
    setMeterValues: SetStateFunc<FormMeterDataType>,
) {
    setMeterValues((prev) => ({ ...prev, [key]: value }));
}

export function updateDateValue(value: DataPickerValue, setMeterValues: SetStateFunc<FormMeterDataType>) {
    setMeterValues((prev) => {
        const currentParsedDate = parse(prev.date, dateFormats.monthYear, new Date());
        const dateValue = format(checkDate(value || currentParsedDate), dateFormats.monthYear);
        const meterValues = { ...prev, date: dateValue };

        return meterValues;
    });
}

export async function submitFormData(
    formData: FormMeterDataType,
    sortedAddressMeterData: MeterDataWithObjectId[],
    meterDataEdit: MeterDataWithObjectId | null,
    isEdit: boolean,
    addressPath: string,
    selectDate: DataPickerValue,
    light: string,
    lightDay: string,
    lightNight: string,
    gas: string,
    water: string,
    dispatch: AppDispatch,
) {
    const isUniqueDate = !sortedAddressMeterData.some(
        (item: MeterDataWithObjectId) => item.date === formData.date && meterDataEdit?.date !== formData.date,
    );

    const isDateAlreadyExists = sortedAddressMeterData.some(
        (item: MeterDataWithObjectId) => item.date === format(checkDate(selectDate), dateFormats.monthYear),
    );

    if (isEdit && meterDataEdit && isUniqueDate) {
        await handleEditMeterData(meterDataEdit, formData, dispatch);
    }

    if (!isEdit && !isDateAlreadyExists) {
        await handlePostMeterData(
            formData,
            addressPath,
            selectDate,
            stringToNumber(light),
            stringToNumber(lightDay),
            stringToNumber(lightNight),
            stringToNumber(gas),
            stringToNumber(water),
            dispatch,
        );
    }
}

export function getNextMonthDate(items: MeterDataWithObjectId[]) {
    if (items.length === 0) return new Date();

    const sorted = sortMeterDataListByDateAsc(items);
    const lastItem = sorted[sorted.length - 1];
    const lastDate = parse(lastItem.date, dateFormats.monthYear, new Date());

    return addMonths(lastDate, 1);
}

export function setDefaultValue(categoryKey: CategoryKey, meterReadings: MeterDataWithObjectId[]) {
    if (meterReadings.length > 0) {
        const latestMeterData = meterReadings[meterReadings.length - 1];
        const readingValue = latestMeterData?.[categoryKey];

        return numberToString(readingValue);
    }

    return "";
}

function calculateSum(a: number, b: number) {
    if (!isNumber(a) || !isNumber(b)) {
        throw new Error(
            errorMessage.invalidParameters
                .replace("{0}", a.toString())
                .replace("{1}", typeof a)
                .replace("{2}", b.toString())
                .replace("{3}", typeof b),
        );
    }

    const sum = a + b;
    const formattedSum = sum.toFixed(2);
    const finalResult = parseFloat(formattedSum);

    return numberToString(finalResult);
}

function getLastMeterValue(key: CategoryKey, meterReadings: MeterDataWithObjectId[]) {
    const lastReading = meterReadings[meterReadings.length - 1];

    return numberToString(lastReading[key]);
}

function checkDate(date: DataPickerValue) {
    if (!date) return new Date();

    return date as Date;
}

async function handleEditMeterData(
    meterDataEdit: MeterDataWithObjectId,
    formData: FormMeterDataType,
    dispatch: AppDispatch,
) {
    const response = await dispatch(
        updateMeterData({
            _id: meterDataEdit?._id,
            date: formData.date,
            address: meterDataEdit?.address,
            light: stringToNumber(formData.light),
            lightDay: stringToNumber(formData.lightDay),
            lightNight: stringToNumber(formData.lightNight),
            gas: stringToNumber(formData.gas),
            water: stringToNumber(formData.water),
        }),
    );

    if (response.payload) {
        dispatch(setNotEdit());

        await dispatch(getAllMetersData());

        emitMetaDataSocketEvent(socketEventNames.updateItem, response.payload);
    }
}

async function handlePostMeterData(
    formData: FormMeterDataType,
    addressPath: string,
    selectDate: DataPickerValue,
    light: number,
    lightDay: number,
    lightNight: number,
    gas: number,
    water: number,
    dispatch: AppDispatch,
) {
    const response = await dispatch(
        createMetersData({
            date: formData.date,
            address: formData.address,
            light: stringToNumber(formData.light),
            lightDay: stringToNumber(formData.lightDay),
            lightNight: stringToNumber(formData.lightNight),
            gas: stringToNumber(formData.gas),
            water: stringToNumber(formData.water),
        }),
    );

    if (response.payload) {
        setTimeout(async () => {
            await dispatch(getAllMetersData());

            const message = generateMessage(addressPath, selectDate, light, lightDay, lightNight, gas, water);

            sendMessageToTelegram(message);

            emitMetaDataSocketEvent(socketEventNames.createItem, response.payload);
        }, 2500);
    }
}

function generateMessage(
    currentPage: string,
    selectDate: DataPickerValue,
    light: number,
    lightDay: number,
    lightNight: number,
    gas: number,
    water: number,
) {
    let message = `<b>${getAddressName(currentPage)}</b>`;
    const ensureDate = checkDate(selectDate);

    message += ` (${format(ensureDate, dateFormats.monthYear)})\n`;
    message += `\u{1F4A1} Light: ${light} kWt\n`;
    message += `\u{1F4A1}\u{1F31E} Light Day: ${lightDay} kWt\n`;
    message += `\u{1F4A1}\u{1F319} Light Night: ${lightNight} kWt\n`;
    message += `\u{1F525} Gas: ${gas} m³\n`;

    if (water) {
        message += `\u{1F6BF} Water: ${water} m³\n`;
    }

    return message;
}

function getAddressName(pageName: string) {
    const unknownAddressString = "Unknown address";

    return navigationAddressItems.find((item) => item.link === `/${pageName}`)?.text || unknownAddressString;
}
