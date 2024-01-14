import Style from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "../ItemMonthlyMoneyCalculations/ItemMonthlyMoneyCalculations";
import { useAppSelector } from "../../../../redux/hook";
import { useLocation } from "react-router-dom";
import { AddressType } from "../../../../types/MeterDataType";

export const ListMonthlyMoneyCalculations = () => {
  const { pathname } = useLocation();

  const status = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.status
  );
  const allListItems = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.items
  );

  const currentPageName = pathname.replace(/^\/|\/price$/g, "") as AddressType;

  const itemsFilter = allListItems?.filter(
    (item) => item.address === currentPageName
  );

  return (
    <ul className={Style.listMonthlyMoneyCalculations}>
      {status === "loading" && <p>loading...</p>}
      {itemsFilter &&
        itemsFilter.map(({ _id, data, sumMoney, address }) => (
          <ItemMonthlyMoneyCalculations
            key={_id}
            id={_id}
            items={data}
            sumMoney={sumMoney}
            address={address}
          />
        ))}
    </ul>
  );
};
