import Styles from "./listUtilityPrices.module.scss";
import { ItemUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/ItemUtilityPrices";
import useUtilityPrices from "@/hooks/useUtilityPrices";

export function ListUtilityPrices() {
  const { items, status } = useUtilityPrices();

  return (
    <ul className={Styles.listUtilityPrices}>
      {status === "loading" && <p className={Styles.loading}>Loading...</p>}
      {status.toLowerCase().includes("error") && (
        <p className={Styles.loading}>{status}</p>
      )}
      {items.map(({ value, valueName, image, category, _id }) => (
        <ItemUtilityPrices
          key={category}
          id={_id}
          value={value}
          valueName={valueName}
          image={image}
          category={category}
        />
      ))}
    </ul>
  );
}
