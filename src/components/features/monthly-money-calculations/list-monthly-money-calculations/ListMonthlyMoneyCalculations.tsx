import styles from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/list-monthly-money-calculations/item-monthly-money-calculations/ItemMonthlyMoneyCalculations";
import { MonthlyMoneyCalculationWithObjectId } from "@/store/models/monthly-money-calculation";

interface ListMonthlyMoneyCalculationsProps {
    items?: MonthlyMoneyCalculationWithObjectId[];
    status: string;
}

export function ListMonthlyMoneyCalculations({ items, status }: ListMonthlyMoneyCalculationsProps) {
    return (
        <ul className={styles.root}>
            {status === "loading" && <p>loading...</p>}
            {items &&
                items.map(({ _id, data, sumMoney, address }) => (
                    <ItemMonthlyMoneyCalculations
                        key={_id}
                        id={_id}
                        items={data.map((item) => ({ ...item, id: item.id }))}
                        sumMoney={sumMoney}
                        address={address}
                    />
                ))}
        </ul>
    );
}
