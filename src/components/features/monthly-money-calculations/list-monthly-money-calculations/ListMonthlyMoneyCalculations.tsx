import styles from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/list-monthly-money-calculations/item-monthly-money-calculations/ItemMonthlyMoneyCalculations";
import { MonthlyMoneyCalculationsWithObjectId } from "@/store/models/monthly-money-calculations";

interface ListMonthlyMoneyCalculationsProps {
    items?: MonthlyMoneyCalculationsWithObjectId[];
    status: string;
}

export function ListMonthlyMoneyCalculations({ items, status }: ListMonthlyMoneyCalculationsProps) {
    return (
        <ul className={styles.listMonthlyMoneyCalculations}>
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
