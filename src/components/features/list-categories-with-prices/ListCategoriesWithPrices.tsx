import { useCallback, useEffect } from "react";
import Styles from "./listCategoriesWithPrices.module.scss";
import { useAppSelector } from "@/store/hook";
import { useLocation } from "react-router-dom";
import { getKeyOnPage } from "@/helpers/get-key-on-page";
import { AppDispatch } from "@/store/store";
import {
    calculatePrice,
    deleteUtilityItem,
    resetEdit,
} from "@/store/slices/monthly-money-calculations/slice";
import { getIconUrl } from "@/helpers/get-icon-url";
import { MdButton } from "@/components/ui/button/MdButton";
import { editItem, isShowDeleteButton, saveItemDB } from "./ListCategoriesWithPrices.funcs";
import { colorNames } from "@/enums/color-names";
import { stringToNumber } from "@/utils/conversion";

interface ListCategoriesWithPricesProps {
    dispatch: AppDispatch;
}

export function MdListCategoriesWithPrices({ dispatch }: ListCategoriesWithPricesProps) {
    const { pathname } = useLocation();
    const currentPageName: string = pathname.replace(/^\/|\/price$/g, "");
    const currentItem = useAppSelector((state) => state.monthlyMoneyCalculations.utilityCosts);
    const sumMoney = useAppSelector((state) => state.monthlyMoneyCalculations.sumMoney);
    const utilityPrices = useAppSelector((state) => state.utilityPrices.items);
    const allListMonthlyMoneyCalculations = useAppSelector((state) => state.monthlyMoneyCalculations.items);
    const isEdit = useAppSelector((state) => state.monthlyMoneyCalculations.isEdit);
    const idEdit = useAppSelector((state) => state.monthlyMoneyCalculations.idEdit);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const listInfoDataMonth =
        infoMeterReading[getKeyOnPage(currentPageName) as keyof typeof infoMeterReading];
    const dateCurrent = currentItem && currentItem.find((item) => item.title === "Date")?.description;
    const isUniqueObj = !allListMonthlyMoneyCalculations?.some(
        (item) => item.data[0]?.description === dateCurrent && item.address === currentPageName
    );

    const onSaveItem = useCallback(() => {
        saveItemDB(currentItem, sumMoney, isUniqueObj, currentPageName, dispatch);
    }, [currentItem, sumMoney, isUniqueObj, currentPageName, dispatch]);

    const onDeleteItem = (title: string, value: string) => {
        dispatch(deleteUtilityItem({ title, value: stringToNumber(value) }));
    };

    const onEditItem = useCallback(() => {
        editItem(currentItem, sumMoney, idEdit, dispatch);
    }, [currentItem, sumMoney, idEdit, dispatch]);

    const onCancel = () => {
        dispatch(resetEdit());
    };

    useEffect(() => {
        dispatch(calculatePrice({ listInfoDataMonth, utilityPrices }));
    }, [dispatch, listInfoDataMonth, utilityPrices]);

    return (
        <ul className={Styles.listCategoriesWithPrices}>
            {currentItem &&
                currentItem.map(({ title, description }) => (
                    <div key={title} className={Styles.itemBlock}>
                        {isShowDeleteButton(title) && (
                            <button
                                className={Styles.btn}
                                type="button"
                                title={`delete data`}
                                onClick={() => onDeleteItem(title, description)}
                            >
                                <img src={getIconUrl("delete.png")} alt="delete" width={25} height={25} />
                            </button>
                        )}
                        <li className={Styles.item}>
                            <p className={Styles.title}>{title}:</p>
                            <p>
                                {description} {title === "Date" ? "" : "uah"}
                            </p>
                        </li>
                    </div>
                ))}

            <div className={Styles.footer}>
                <li className={`${Styles.item} ${Styles.itemLast}`}>
                    <p className={Styles.title}>Amount of money:</p>
                    <p className={Styles.sumMoney}>{sumMoney} uah</p>
                </li>
                {isEdit ? (
                    <div className={Styles.btns}>
                        <MdButton type="button" onClick={onCancel} color={colorNames.red}>
                            Cancel
                        </MdButton>
                        <MdButton type="button" onClick={onEditItem} color={colorNames.green}>
                            Edit
                        </MdButton>
                    </div>
                ) : (
                    <MdButton type="button" onClick={onSaveItem} disabled={!isUniqueObj}>
                        Save
                    </MdButton>
                )}
            </div>
        </ul>
    );
}
