import Style from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "../ItemMonthlyMoneyCalculations/ItemMonthlyMoneyCalculations";
import { MonthlyMoneyCalculationsType } from "@/types/MonthlyMoneyCalculationsType";

interface ListMonthlyMoneyCalculationsProps {
  items: MonthlyMoneyCalculationsType[] | undefined;
  status: string;
}

export const ListMonthlyMoneyCalculations: React.FC<
  ListMonthlyMoneyCalculationsProps
> = ({ items, status }) => {
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
};
