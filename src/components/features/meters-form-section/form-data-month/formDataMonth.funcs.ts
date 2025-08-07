import { addMonths, format, parse } from "date-fns";
import { navigationItems } from "@/constants/navigation-items";
import { sortMeterDataListByDateAsc } from "@/helpers/meters-data/sort";
import { CategoryKey } from "@/enums/category-keys";
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

export function calculateSum(a: number, b: number) {
    if (!isNumber(a) || !isNumber(b)) {
        throw new Error(
            errorMessage.invalidParameters
                .replace("{0}", a.toString())
                .replace("{1}", typeof a)
                .replace("{2}", b.toString())
                .replace("{3}", typeof b)
        );
    }

    const sum = a + b;
    const formattedSum = sum.toFixed(2);
    const finalResult = parseFloat(formattedSum);

    return numberToString(finalResult);
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
    setErrorMessage: SetStateFunc<string | null>
) {
    const isUniqueDate = !sortedAddressMeterData.some(
        (item: MeterDataWithObjectId) => item.date === formData.date && meterDataEdit?.date !== formData.date
    );

    const isDateAlreadyExists = sortedAddressMeterData.some(
        (item: MeterDataWithObjectId) => item.date === format(checkDate(selectDate), "MM.yyyy")
    );

    if (!isEdit && isDateAlreadyExists) {
        setErrorMessage("This date already exists. Please choose a different date.");
    }

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
            dispatch
        );
    }
}

export function getNextMonthDate(items: MeterDataWithObjectId[]) {
    if (items.length === 0) return new Date();

    const sorted = sortMeterDataListByDateAsc(items);
    const lastItem = sorted[sorted.length - 1];
    const lastDate = parse(lastItem.date, "MM.yyyy", new Date());

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

export function getLastMeterValue(key: CategoryKey, meterReadings: MeterDataWithObjectId[]) {
    const lastReading = meterReadings[meterReadings.length - 1];

    return numberToString(lastReading[key]);
}

export function checkDate(date: DataPickerValue) {
    if (!date) return new Date();

    return date as Date;
}

export async function handleEditMeterData(
    meterDataEdit: MeterDataWithObjectId,
    formData: FormMeterDataType,
    dispatch: AppDispatch
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
        })
    );

    if (response.payload) {
        dispatch(setNotEdit());

        await dispatch(getAllMetersData());

        emitMetaDataSocketEvent(socketEventNames.updateItem, response.payload);
    }
}

export async function handlePostMeterData(
    formData: FormMeterDataType,
    addressPath: string,
    selectDate: DataPickerValue,
    light: number,
    lightDay: number,
    lightNight: number,
    gas: number,
    water: number,
    dispatch: AppDispatch
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
        })
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
    water: number
) {
    let message = `<b>${getAddressName(currentPage)}</b>`;
    const ensureDate = checkDate(selectDate);

    message += ` (${format(ensureDate, "MM.yyyy")})\n`;
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

    return navigationItems.find((item) => item.link === `/${pageName}`)?.text || unknownAddressString;
}
