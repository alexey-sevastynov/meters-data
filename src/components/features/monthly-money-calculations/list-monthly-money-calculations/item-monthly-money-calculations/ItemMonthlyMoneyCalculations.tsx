import { useCallback, useState } from "react";
import Style from "./itemMonthlyMoneyCalculations.module.scss";
import html2canvas from "html2canvas";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { MdButton } from "@/components/ui/button/MdButton";
import { colorNames } from "@/enums/color-names";
import { deleteItem, editItem } from "./ItemMonthlyMoneyCalculations.funcs";
import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { translationTitle } from "./helpers/translationTitle";
import { translationDescription } from "./helpers/translationDescription";

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
    const isEdit = useAppSelector((state) => state.monthlyMoneyCalculations.isEdit);
    const [language, setLanguage] = useState<"EN" | "UA">("EN");
    const currencyTranslation = language === "EN" ? "uah" : "грн";

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
        <li className={Style.itemMonthlyMoneyCalculations}>
            <div className={Style.btns}>
                <button onClick={() => setLanguage("EN")} className={language === "EN" ? Style.active : ""}>
                    EN
                </button>
                <button onClick={() => setLanguage("UA")} className={language === "UA" ? Style.active : ""}>
                    UA
                </button>
            </div>

            <ul id={`${id}`}>
                {items &&
                    items.map(({ title, description }) => {
                        return (
                            <li key={title} className={Style.item}>
                                <p className={Style.title}>
                                    {language === "EN" ? title : translationTitle(title)}:
                                </p>
                                <p>
                                    {language === "EN" ? description : translationDescription(description)}{" "}
                                    {title === "Date" ? "" : currencyTranslation}
                                </p>
                            </li>
                        );
                    })}
                <li className={`${Style.item} ${Style.itemLast}`}>
                    <p className={Style.title}>
                        {language === "EN" ? "Amount of money:" : "Кількість грошей:"}
                    </p>
                    <p className={Style.sumMoney}>{`${sumMoney} ${currencyTranslation}`}</p>
                </li>
            </ul>

            <div className={Style.btns}>
                <MdButton onClick={onEditItem} disabled={isEdit}>
                    edit
                </MdButton>
                <MdButton onClick={onDeleteItem} disabled={isEdit} color={colorNames.red}>
                    delete
                </MdButton>
                <MdButton onClick={captureScreen} disabled={isEdit}>
                    capture
                </MdButton>
            </div>
        </li>
    );
}
