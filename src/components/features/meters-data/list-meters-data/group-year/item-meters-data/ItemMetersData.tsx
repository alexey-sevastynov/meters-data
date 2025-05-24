import { useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import styles from "./itemMetersData.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { smoothScrollTo } from "@/utils/scroll";
import { useLocation } from "react-router-dom";
import { openPopup, setIdDelete, setQuestion } from "@/store/slices/confirm-popup-slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import { formatDateDisplay } from "@/components/shared/date-range-selector/dateRangeSelector.function";
import { getUtilityCostByAddress } from "@/helpers/meters-data/get-utility-cost-by-address";
import { MonthsType } from "@/types/months-type";
import {
    deleteItemMeterData,
    editItem,
} from "@/components/features/meters-data/list-meters-data/group-year/item-meters-data/itemMetersData.funcs";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

interface ItemMetersDataProps {
    meterData: MeterDataWithObjectId;
    isLastItem: boolean;
    isFirstItem: boolean;
    isWaterBlock?: boolean;
}

export function ItemMetersData({ meterData, isLastItem, isFirstItem, isWaterBlock }: ItemMetersDataProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const isEdit = useAppSelector((state) => state.metersData.isEdit);
    const isDelete = useAppSelector((state) => state.confirm.isActionDeleteItem);
    const idDelete = useAppSelector((state) => state.confirm.idDeleteItem);
    const translations = useAppSelector(selectTranslations);
    const currentPage: string = pathname.slice(1);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const currentInfoMeterReading = getUtilityCostByAddress(infoMeterReading, currentPage);
    const selectedMonthId = currentInfoMeterReading?.[0].id;
    const newDate = formatDate(meterData.date);
    const month = newDate.split(",")[0] as MonthsType;
    const year = newDate.split(",")[1];
    const selectedDateDisplay = formatDateDisplay(`${month},${year}`, true, true);
    const iconColor = getBaseIconColor(theme.themeMode);

    const onEditItem = useCallback(() => {
        editItem(dispatch, meterData);
    }, [dispatch, meterData]);

    const removeItem = () => {
        dispatch(openPopup());
        dispatch(setQuestion("Do you really want to delete?"));
        dispatch(setIdDelete(meterData._id));
    };

    useEffect(() => {
        if (isDelete && idDelete === meterData._id) deleteItemMeterData(meterData._id, dispatch);
        // Approve
        // eslint-disable-next-line
    }, [isDelete]);

    useEffect(() => {
        if (isEdit) smoothScrollTo(0);
    }, [isEdit]);

    return (
        <li className={cn(styles.itemMetersData, selectedMonthId === meterData._id && styles.active)}>
            <div className={`${styles.data} `}>
                <p className={styles.date} title={selectedDateDisplay}>
                    {translations.months[month]}
                </p>
                <p className={styles.light}>{meterData.light}</p>
                <p className={styles.lightDay}>{meterData.lightDay}</p>
                <p className={styles.lightNight}>{meterData.lightNight}</p>
                <p className={styles.gas}>{meterData.gas}</p>
                {isWaterBlock && <p className={styles.water}>{meterData.water}</p>}
            </div>

            <div className={styles.btns}>
                {isFirstItem || (
                    <button
                        type="button"
                        disabled={isEdit}
                        title={`Calculation of meter readings for ${meterData.date}`}
                        onClick={() => {
                            dispatch(showMeterReadingCalc({ id: meterData._id, address: meterData.address }));
                            smoothScrollTo();
                        }}
                    >
                        <MdIcon name={iconNames.view} color={iconColor} />
                    </button>
                )}
                <button type="button" disabled={isEdit} title={`edit meter readings `} onClick={onEditItem}>
                    <MdIcon name={iconNames.edit} color={iconColor} />
                </button>

                {isLastItem && (
                    <button type="button" disabled={isEdit} title={`delete data`} onClick={removeItem}>
                        <MdIcon name={iconNames.delete} color={iconColor} />
                    </button>
                )}
            </div>
        </li>
    );
}
