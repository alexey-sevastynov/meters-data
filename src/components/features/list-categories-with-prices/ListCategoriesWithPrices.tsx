import { useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import styles from "./listCategoriesWithPrices.module.scss";
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
import { MdItemCategoryWithPrice } from "@/components/features/list-categories-with-prices/item-block/ItemCategoryWithPrice";
import { getPropertyValue } from "@/lib/utils";
import { UtilityCost } from "@/types/utility-cost";

interface ListCategoriesWithPricesProps {
    dispatch: AppDispatch;
}

export function MdListCategoriesWithPrices({ dispatch }: ListCategoriesWithPricesProps) {
    const { pathname } = useLocation();
    const translations = useAppSelector(selectTranslations);
    const currentPageName = pathname.replace(/^\/|\/price$/g, "");
    const utilityCosts = useAppSelector((state) => state.monthlyMoneyCalculations.utilityCosts);
    const sumMoney = useAppSelector((state) => state.monthlyMoneyCalculations.sumMoney);
    const utilityPrices = useAppSelector((state) => state.utilityPrices.items);
    const allListMonthlyMoneyCalculations = useAppSelector((state) => state.monthlyMoneyCalculations.items);
    const isEdit = useAppSelector((state) => state.monthlyMoneyCalculations.isEdit);
    const idEdit = useAppSelector((state) => state.monthlyMoneyCalculations.idEdit);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const listInfoDataMonth = getPropertyValue<typeof infoMeterReading, string, UtilityCost[]>(
        infoMeterReading,
        getKeyOnPage(currentPageName),
    );
    const dateCurrent = utilityCosts && utilityCosts.find((item) => item.title === "Date")?.description;
    const isUniqueObj = !allListMonthlyMoneyCalculations?.some(
        (item) => item.data[0]?.description === dateCurrent && item.address === currentPageName,
    );

    const onSaveItem = useCallback(() => {
        saveItemDB(utilityCosts, sumMoney, isUniqueObj, currentPageName, dispatch);
    }, [utilityCosts, sumMoney, isUniqueObj, currentPageName, dispatch]);

    const onDeleteItem = (title: string, value: string) => {
        dispatch(deleteUtilityItem({ title, value: stringToNumber(value) }));
    };

    const onEditItem = useCallback(() => {
        editItem(utilityCosts, sumMoney, idEdit, dispatch);
    }, [utilityCosts, sumMoney, idEdit, dispatch]);

    const onCancel = () => {
        dispatch(resetEdit());
    };

    useEffect(() => {
        dispatch(calculatePrice({ listInfoDataMonth, utilityPrices }));
    }, [dispatch, listInfoDataMonth, utilityPrices]);

    return (
        <ul className={styles.root}>
            <div className={styles.list}>
                {utilityCosts?.map((utilityCost) => (
                    <MdItemCategoryWithPrice
                        key={utilityCost.title}
                        title={utilityCost.title}
                        description={utilityCost.description}
                        showDelete={isShowDeleteButton(utilityCost.title)}
                        onDelete={onDeleteItem}
                    />
                ))}

                <div className={styles.footer}>
                    <li className={cn(styles.item, styles.itemLast)}>
                        <p className={styles.title}>{translations.price.amount}:</p>
                        <p className={styles.value}>
                            {sumMoney} {translations.value.uah}
                        </p>
                    </li>
                </div>
            </div>

            <div className={styles.buttons}>
                {isEdit ? (
                    <>
                        <MdButton type="button" onClick={onCancel} color={colorNames.red}>
                            {translations.btn.cancel}
                        </MdButton>
                        <MdButton type="button" onClick={onEditItem} color={colorNames.green}>
                            {translations.btn.save}
                        </MdButton>
                    </>
                ) : (
                    <MdButton type="button" onClick={onSaveItem} disabled={!isUniqueObj}>
                        {translations.btn.save}
                    </MdButton>
                )}
            </div>
        </ul>
    );
}
