import { ChangeEvent, useState } from "react";
import Style from "./monthlyMoneyCalculations.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { ListMonthlyMoneyCalculations } from "./list-monthly-money-calculations/ListMonthlyMoneyCalculations";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import { inputTypes } from "@/components/ui/input/input.type";
import { selectTranslations } from "@/store/slices/i-18-next";

export function MdMonthlyMoneyCalculations() {
    const { pathname } = useLocation();
    const translations = useAppSelector(selectTranslations);
    const status = useAppSelector((state) => state.monthlyMoneyCalculations.status);
    const allListItems = useAppSelector((state) => state.monthlyMoneyCalculations.items);
    const [inputValue, setInputValue] = useState<string>("");

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setInputValue(targetValue);
    };

    const currentPageName: string = pathname.replace(/^\/|\/price$/g, "");

    const itemsFilter = allListItems?.filter(
        (item) =>
            item.address === currentPageName && item.data[0]?.description.toLowerCase().includes(inputValue)
    );

    return (
        <section className={Style.monthlyMoneyCalculations}>
            <h4>{translations.price.monthlyMoneyCalculations}</h4>
            <div className={Style.inputBlock}>
                <MdInput
                    onChange={onChange}
                    value={inputValue}
                    label={translations.price.choosePeriod}
                    type={inputTypes.text}
                    placeholder="Search..."
                />
            </div>

            <ListMonthlyMoneyCalculations items={itemsFilter} status={status} />
        </section>
    );
}
