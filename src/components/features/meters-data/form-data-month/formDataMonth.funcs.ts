import { addMonths, format, parse } from "date-fns";
import { LIST_NAV } from "@/constants";
import { sortItemsByDate } from "@/helpers/filter-and-sort-items-by-address-and-date";
import { CategoryKey } from "@/enums/category-keys";
import { DataPickerValue } from "@/types/data-picker";
import {
    editMeterData,
    fetchAllMetersData,
    fetchPostMetersData,
    setNotEdit,
} from "@/store/slices/meters-data-slice";
import { AppDispatch } from "@/store/store";
import { FormMeterDataType } from "@/types/form-meter-data";
import { sendMessageToTelegram } from "@/helpers/send-message-to-telegram";
import { updateLocalStorageValues } from "@/components/features/meters-data/helpers/updateLocalStorageValue";
import { MeterData } from "@/store/models/meter-data";

export async function submitFormData(
    formData: FormMeterDataType,
    sortedAddressMeterData: MeterData[],
    meterDataEdit: MeterData | null,
    isEdit: boolean,
    addressPath: string,
    selectDate: DataPickerValue,
    light: number,
    lightDay: number,
    lightNight: number,
    gas: number,
    water: number,
    dispatch: AppDispatch
) {
    const isUniqueDate = !sortedAddressMeterData.some(
        (item: MeterData) => item.date === formData.date && meterDataEdit?.date !== formData.date
    );

    const isDateAlreadyExists = sortedAddressMeterData.some(
        (item: MeterData) => item.date === format(checkDate(selectDate), "MM.yyyy")
    );

    if (isEdit && meterDataEdit && isUniqueDate) {
        await handleEditMeterData(meterDataEdit, formData, dispatch);
    }

    if (!isEdit && !isDateAlreadyExists) {
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

    updateLocalStorageValues(addressPath, light, lightDay, lightNight, gas, water);
}

export function getNextMonthDate(items: MeterData[]) {
    if (items.length === 0) return new Date();

    const sorted = sortItemsByDate(items);
    const lastItem = sorted[sorted.length - 1];
    const lastDate = parse(lastItem.date, "MM.yyyy", new Date());

    return addMonths(lastDate, 1);
}

export function setDefaultValue(key: CategoryKey, currentPage: string, listCurrentPage: MeterData[]) {
    const localStorageValue = localStorage.getItem(`metersData_${key}_${currentPage}`);

    if (localStorageValue !== null) {
        return Number(localStorageValue);
    }

    if (listCurrentPage.length > 0) {
        const lastItem = listCurrentPage[listCurrentPage.length - 1]?.[key];

        return typeof lastItem === "number" ? lastItem : 0;
    }

    return 0;
}

export function getLastMeterValue(key: CategoryKey, meterReadings: MeterData[]) {
    const lastReading = meterReadings[meterReadings.length - 1];

    return lastReading[key] ?? 0;
}

export function checkDate(date: DataPickerValue) {
    if (!date) return new Date();

    return date as Date;
}

export async function handleEditMeterData(
    meterDataEdit: MeterData,
    formData: FormMeterDataType,
    dispatch: AppDispatch
) {
    const response = await dispatch(editMeterData({ _id: meterDataEdit?._id, ...formData }));

    if (response.payload) {
        dispatch(setNotEdit());

        await dispatch(fetchAllMetersData());
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
    const response = await dispatch(fetchPostMetersData(formData));

    if (response.payload) {
        setTimeout(async () => {
            await dispatch(fetchAllMetersData());

            const message = generateMessage(addressPath, selectDate, light, lightDay, lightNight, gas, water);

            sendMessageToTelegram(message);
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
    const pageId = LIST_NAV.find((item) => item.link === `/${currentPage}`)?.id || "Unknown";

    let message = `<b>${pageId}</b>`;
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
