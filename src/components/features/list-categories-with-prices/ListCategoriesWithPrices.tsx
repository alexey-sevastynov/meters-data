import { useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import Styles from "./listCategoriesWithPrices.module.scss";
import { useAppSelector } from "@/store/hook";
import { useLocation } from "react-router-dom";
import { getKeyOnPage } from "@/helpers/address/get-key-on-page";
import { AppDispatch } from "@/store/store";
import {
    calculatePrice,
    deleteUtilityItem,
    resetEdit,
} from "@/store/slices/monthly-money-calculations/slice";
import { MdButton } from "@/components/ui/button/MdButton";
import {
    editItem,
    isShowDeleteButton,
    saveItemDB,
} from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices.funcs";
import { colorNames } from "@/enums/color-names";
import { stringToNumber } from "@/utils/conversion";
import { selectTranslations } from "@/store/slices/i-18-next";
import { ItemBlock } from "@/components/features/list-categories-with-prices/item-block/ItemBlock";

interface ListCategoriesWithPricesProps {
    dispatch: AppDispatch;
}

export function MdListCategoriesWithPrices({ dispatch }: ListCategoriesWithPricesProps) {
    const { pathname } = useLocation();
    const translations = useAppSelector(selectTranslations);
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
            {currentItem?.map(({ title, description }) => (
                <ItemBlock
                    key={title}
                    title={title}
                    description={description}
                    showDelete={isShowDeleteButton(title)}
                    onDelete={onDeleteItem}
                />
            ))}

            <div className={Styles.footer}>
                <li className={cn(Styles.item, Styles.itemLast)}>
                    <p className={Styles.title}>{translations.price.amount}:</p>
                    <p>
                        {sumMoney} {translations.value.uah}
                    </p>
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
