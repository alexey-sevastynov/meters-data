import Style from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "../item-monthly-money-calculations/ItemMonthlyMoneyCalculations";
import { MonthlyMoneyCalculationsType } from "@/types/monthly-money-calculations-type";

interface ListMonthlyMoneyCalculationsProps {
    items: MonthlyMoneyCalculationsType[] | undefined;
    status: string;
}

export function ListMonthlyMoneyCalculations({ items, status }: ListMonthlyMoneyCalculationsProps) {
    return (
        <ul className={Style.listMonthlyMoneyCalculations}>
            {status === "loading" && <p>loading...</p>}
            {items &&
                items.map(({ _id, data, sumMoney, address }) => (
                    <ItemMonthlyMoneyCalculations
                        key={_id}
                        id={_id}
                        items={data.map((item) => ({ ...item, id: item._id }))}
                        sumMoney={sumMoney}
                        address={address}
                    />
                ))}
        </ul>
    );
}
