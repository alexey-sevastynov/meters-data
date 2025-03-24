import { useState } from "react";
import Style from "./monthlyMoneyCalculations.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { ListMonthlyMoneyCalculations } from "./list-monthly-money-calculations/ListMonthlyMoneyCalculations";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { AddressType } from "@/types/meter-data-type";

export function MdMonthlyMoneyCalculations() {
    const { pathname } = useLocation();

    const status = useAppSelector((state) => state.prices.itemsMonthlyMoneyCalculations.status);
    const allListItems = useAppSelector((state) => state.prices.itemsMonthlyMoneyCalculations.items);

    const [inputValue, setInputValue] = useState<number>(0);

    const currentPageName = pathname.replace(/^\/|\/price$/g, "") as AddressType;

    const itemsFilter = allListItems?.filter(
        (item) =>
            item.address === currentPageName &&
            item.data[0].description.toLowerCase().includes(String(inputValue).toLowerCase())
    );

    return (
        <section className={Style.monthlyMoneyCalculations}>
            <h4>Monthly money calculations:</h4>
            <div className={Style.inputBlock}>
                <MdInput
                    value={inputValue}
                    setValue={setInputValue}
                    className={Style.input}
                    labelTextBold
                    labelText="Choose period"
                    type="text"
                    placeholder="Search..."
                />
            </div>

            <ListMonthlyMoneyCalculations items={itemsFilter} status={status} />
        </section>
    );
}
