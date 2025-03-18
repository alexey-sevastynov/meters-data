import { useCallback, useState } from "react";
import Style from "./itemMonthlyMoneyCalculations.module.scss";
import html2canvas from "html2canvas";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@/ui/Button/Button";
import { COLORS } from "@/constants";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";
import {
  translationDescription,
  translationTitle,
} from "@/ui/Price/MonthlyMoneyCalculations/ItemMonthlyMoneyCalculations/helpers";
import {
  deleteItem,
  editItem,
} from "@/ui/Price/MonthlyMoneyCalculations/ItemMonthlyMoneyCalculations/ItemMonthlyMoneyCalculations.function";

interface ItemMonthlyMoneyCalculationsProps {
  items: ListInfoDataMonthType[];
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
  const isEdit = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.isEdit
  );

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
        <button
          onClick={() => setLanguage("EN")}
          className={language === "EN" ? Style.active : ""}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("UA")}
          className={language === "UA" ? Style.active : ""}
        >
          UA
        </button>
      </div>

      <ul id={`${id}`}>
        {items &&
          items.map(({ title, description }) => {
            return (
              <li
                key={title}
                className={Style.item}
              >
                <p className={Style.title}>
                  {language === "EN" ? title : translationTitle(title)}:
                </p>
                <p>
                  {language === "EN"
                    ? description
                    : translationDescription(description)}{" "}
                  {title === "Date" ? "" : currencyTranslation}
                </p>
              </li>
            );
          })}
        <li className={`${Style.item} ${Style.itemLast}`}>
          <p className={Style.title}>
            {language === "EN" ? "Amount of money:" : "Кількість грошей:"}
          </p>
          <p
            className={Style.sumMoney}
          >{`${sumMoney} ${currencyTranslation}`}</p>
        </li>
      </ul>

      <div className={Style.btns}>
        <Button
          onClick={onEditItem}
          disabled={isEdit}
        >
          edit
        </Button>
        <Button
          style={isEdit ? {} : { backgroundColor: COLORS.red }}
          onClick={onDeleteItem}
          disabled={isEdit}
        >
          delete
        </Button>
        <Button
          onClick={captureScreen}
          disabled={isEdit}
        >
          capture
        </Button>
      </div>
    </li>
  );
}
