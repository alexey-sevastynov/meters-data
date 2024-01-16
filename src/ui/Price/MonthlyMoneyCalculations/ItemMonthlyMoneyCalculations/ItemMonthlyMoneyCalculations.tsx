import React, { useState } from "react";
import Style from "./itemMonthlyMoneyCalculations.module.scss";
import html2canvas from "html2canvas";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { Button } from "../../../../components/Button/Button";
import { COLORS } from "../../../../constants";
import { ListInfoDataMonthType } from "../../../../redux/slices/MetersDataSlice";
import {
  deleteMonthMoneyCalculations,
  fetchAllMonthlyMoneyCalculations,
  getOneMonthMoneyCalculations,
} from "../../../../redux/slices/PriceSlice";
import { translationDescription, translationTitle } from "./helpers";
import { smoothScrollOnLoad } from "../../../../helpers/smoothScrollOnLoad";

interface ItemMonthlyMoneyCalculationsProps {
  items: ListInfoDataMonthType[];
  sumMoney: number;
  id: string | undefined;
  address: string;
}

export const ItemMonthlyMoneyCalculations: React.FC<
  ItemMonthlyMoneyCalculationsProps
> = ({ items, sumMoney, id, address }) => {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.isEdit
  );

  const [language, setLanguage] = useState<"EN" | "UA">("EN");
  const currencyTranslation = language === "EN" ? "uah" : "грн";

  const deleteItem = () => {
    if (id) {
      dispatch(deleteMonthMoneyCalculations({ id }))
        .then((response: any) => {
          if (response.payload) {
            dispatch(fetchAllMonthlyMoneyCalculations());
          }
        })
        .catch((error: any) => {
          console.error("Error adding data:", error);
        });
    }
  };
  const editItem = () => {
    if (id) {
      dispatch(getOneMonthMoneyCalculations({ id })).then((payload) => {
        if (payload) {
          smoothScrollOnLoad();
        }
      });
    }
  };

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
              <li key={title} className={Style.item}>
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
        <Button onClick={editItem} disabled={isEdit}>
          edit
        </Button>
        <Button
          style={isEdit ? {} : { backgroundColor: COLORS.red }}
          onClick={deleteItem}
          disabled={isEdit}
        >
          delete
        </Button>
        <Button onClick={captureScreen} disabled={isEdit}>
          capture
        </Button>
      </div>
    </li>
  );
};
