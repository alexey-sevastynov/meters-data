import React, { useEffect } from "react";
import Styles from "./itemMetersData.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setMeterDataEdit, showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import { formatDate } from "@/helpers/format-date";
import { smoothScrollOnLoad } from "@/helpers/smooth-scroll-on-load";
import { useLocation } from "react-router-dom";
import {
    confirmActionExit,
    confirmActionOnDelete,
    openPopup,
    setIdDelete,
    setQuestion,
} from "@/store/slices/confirm-popup-slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import { formatDateDisplay } from "@/components/shared/date-range-selector/dateRangeSelector.function";
import { lastValueMeter } from "@/helpers/last-value-meter";
import { MonthsType } from "@/types/months-type";
import { deleteMeterData, getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";

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
    const lang = useAppSelector(selectTranslations);
    const currentPage: string = pathname.slice(1);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const currentInfoMeterReading = lastValueMeter(infoMeterReading, currentPage);
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
        if (isDelete && idDelete === _id) {
            dispatch(deleteMeterData({ id: _id }))
                .then((response) => {
                    if (response.payload) {
                        dispatch(getAllMetersData());
                    }
                })
                .catch((error) => {
                    console.error("Error adding data:", error);
                });

            dispatch(confirmActionOnDelete(false));
            dispatch(confirmActionExit(false));
            dispatch(setIdDelete(null));
        }
    }, [isDelete]);

    useEffect(() => {
        if (isEdit) smoothScrollOnLoad(0);
    }, [isEdit]);

    return (
        <li className={`${Styles.itemMetersData} ${selectedMonthId === _id ? Styles.active : ""}`}>
            <div className={`${Styles.data} `}>
                <p className={Styles.date} title={selectedDateDisplay}>
                    {lang.months[month]}
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
                            smoothScrollOnLoad();
                        }}
                    >
                        <img
                            src={getIconUrl(selectedMonthId === _id ? "show-active.png" : "show.png")}
                            alt="show"
                            width={25}
                            height={25}
                        />
                    </button>
                )}
                <button type="button" disabled={isEdit} title={`edit meter readings `} onClick={editItem}>
                    <img src={getIconUrl("edit.png")} alt="edit" width={25} height={25} />
                </button>

                {isLastItem && (
                    <button type="button" disabled={isEdit} title={`delete data`} onClick={removeItem}>
                        <img src={getIconUrl("delete.png")} alt="delete" width={25} height={25} />
                    </button>
                )}
            </div>
        </li>
    );
};
