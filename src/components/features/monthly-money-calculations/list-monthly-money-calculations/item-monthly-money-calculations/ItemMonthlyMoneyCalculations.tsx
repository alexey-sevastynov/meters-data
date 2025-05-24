import { useCallback, useState } from "react";
import styles from "./itemMonthlyMoneyCalculations.module.scss";
import html2canvas from "html2canvas";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { MdButton } from "@/components/ui/button/MdButton";
import { colorNames } from "@/enums/color-names";
import {
    deleteItem,
    editItem,
} from "@/components/features/monthly-money-calculations/list-monthly-money-calculations/item-monthly-money-calculations/ItemMonthlyMoneyCalculations.funcs";
import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { translationTitle } from "@/components/features/monthly-money-calculations/list-monthly-money-calculations/item-monthly-money-calculations/helpers/translationTitle";
import { translationDescription } from "@/components/features/monthly-money-calculations/list-monthly-money-calculations/item-monthly-money-calculations/helpers/translationDescription";
import { selectTranslations } from "@/store/slices/i-18-next";

interface ItemMonthlyMoneyCalculationsProps {
    items: CalculationDataWithId[];
    sumMoney: number;
    id: string;
    address: string;
}

export function ItemMonthlyMoneyCalculations({
    items,
    sumMoney,
    id,
    address,
}: ItemMonthlyMoneyCalculationsProps) {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const isEdit = useAppSelector((state) => state.monthlyMoneyCalculations.isEdit);
    const currentLanguage = useAppSelector((state) => state.i18n.lang);
    const [language, setLanguage] = useState<"en" | "ua">(currentLanguage);
    const currencyTranslation = language === "en" ? "uah" : "грн";

    const onDeleteItem = useCallback(() => {
        deleteItem(id, dispatch);
    }, [id, dispatch]);

    const onEditItem = useCallback(() => {
        editItem(id, dispatch);
    }, [id, dispatch]);

    const captureScreen = () => {
        const element = document.getElementById(`${id}`);

        if (element) {
            html2canvas(element).then((canvas) => {
                const date = items.find((item) => item.title === "Date")?.description;
                const nameFileForDownload = `${items ? `${address}_${date}` : "_"}.png`;

                const dataUrl = canvas.toDataURL();
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = nameFileForDownload;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    return (
        <li className={styles.itemMonthlyMoneyCalculations}>
            <div className={styles.btnsLanguage}>
                <button onClick={() => setLanguage("en")} className={language === "en" ? styles.active : ""}>
                    EN
                </button>
                <button onClick={() => setLanguage("ua")} className={language === "ua" ? styles.active : ""}>
                    UA
                </button>
            </div>

            <ul id={`${id}`}>
                {items &&
                    items.map(({ title, description }) => {
                        return (
                            <li key={title} className={styles.item}>
                                <p className={styles.title}>
                                    {language === "en" ? title : translationTitle(title)}:
                                </p>
                                <p>
                                    {language === "en" ? description : translationDescription(description)}{" "}
                                    {title === "Date" ? "" : currencyTranslation}
                                </p>
                            </li>
                        );
                    })}
                <li className={`${styles.item} ${styles.itemLast}`}>
                    <p className={styles.title}>
                        {language === "en" ? "Amount of money:" : "Кількість грошей:"}
                    </p>
                    <p>{`${sumMoney} ${currencyTranslation}`}</p>
                </li>
            </ul>

            <div className={styles.btns}>
                <MdButton onClick={onEditItem} disabled={isEdit}>
                    {translations.btn.edit}
                </MdButton>
                <MdButton onClick={onDeleteItem} disabled={isEdit} color={colorNames.red}>
                    {translations.btn.delete}
                </MdButton>
                <MdButton onClick={captureScreen} disabled={isEdit}>
                    {translations.btn.capture}
                </MdButton>
            </div>
        </li>
    );
}
