import React, { useEffect } from "react";
import { cn } from "@/lib/cn";
import Styles from "./itemMetersData.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setMeterDataEdit, showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import { formatDate } from "@/helpers/meters-data/dates/format-date";
import { smoothScrollTo } from "@/utils/scroll";
import { useLocation } from "react-router-dom";
import { openPopup, setIdDelete, setQuestion } from "@/store/slices/confirm-popup-slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import { formatDateDisplay } from "@/components/shared/date-range-selector/dateRangeSelector.function";
import { getUtilityCostByAddress } from "@/helpers/meters-data/get-utility-cost-by-address";
import { MonthsType } from "@/types/months-type";
import { deleteItemMeterData } from "@/components/features/meters-data/list-meters-data/group-year/item-meters-data/itemMetersData.funcs";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

interface ItemMetersDataProps {
    _id: string;
    address: string;
    isWaterBlock: boolean;
    date: string;
    light: number;
    lightDay: number;
    lightNight: number;
    gas: number;
    water?: number;
    createdAt?: string;
    updatedAt?: string;
    isLastItem: boolean;
    isFirstItem: boolean;
}

// eslint-disable-next-line max-lines-per-function
export const ItemMetersData: React.FC<ItemMetersDataProps> = ({
    _id,
    address,
    isWaterBlock,
    date,
    light,
    lightDay,
    lightNight,
    gas,
    water,
    createdAt,
    updatedAt,
    isLastItem,
    isFirstItem,
}) => {
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
    const newDate = formatDate(date);
    const month = newDate.split(",")[0] as MonthsType;
    const year = newDate.split(",")[1];
    const selectedDateDisplay = formatDateDisplay(`${month},${year}`, true, true);

    const editItem = () => {
        dispatch(
            setMeterDataEdit({
                _id,
                address,
                date,
                light,
                lightDay,
                lightNight,
                gas,
                water,
                createdAt,
                updatedAt,
            })
        );
    };
    const removeItem = () => {
        dispatch(openPopup());
        dispatch(setQuestion("Do you really want to delete?"));
        dispatch(setIdDelete(_id));
    };

    useEffect(() => {
        if (isDelete && idDelete === _id) deleteItemMeterData(_id, dispatch);
        // Approve
        // eslint-disable-next-line
    }, [isDelete]);

    useEffect(() => {
        if (isEdit) smoothScrollTo(0);
    }, [isEdit]);

    return (
        <li className={cn(Styles.itemMetersData, selectedMonthId === _id && Styles.active)}>
            <div className={`${Styles.data} `}>
                <p className={Styles.date} title={selectedDateDisplay}>
                    {translations.months[month]}
                </p>
                <p className={Styles.light}>{light}</p>
                <p className={Styles.lightDay}>{lightDay}</p>
                <p className={Styles.lightNight}>{lightNight}</p>
                <p className={Styles.gas}>{gas}</p>
                {isWaterBlock && <p className={Styles.water}>{water}</p>}
            </div>

            <div className={Styles.btns}>
                {isFirstItem || (
                    <button
                        type="button"
                        disabled={isEdit}
                        title={`Сalculation of meter readings for ${date}`}
                        onClick={() => {
                            dispatch(showMeterReadingCalc({ id: _id, address }));
                            smoothScrollTo();
                        }}
                    >
                        <MdIcon name={iconNames.view} color={colorNames.green} />
                    </button>
                )}
                <button type="button" disabled={isEdit} title={`edit meter readings `} onClick={editItem}>
                    <MdIcon name={iconNames.edit} color={colorNames.green} />
                </button>

                {isLastItem && (
                    <button type="button" disabled={isEdit} title={`delete data`} onClick={removeItem}>
                        <MdIcon name={iconNames.delete} color={colorNames.green} />
                    </button>
                )}
            </div>
        </li>
    );
};
