import Styles from "./itemUtilityPrices.module.scss";
import { CategoryUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/category-utility-prices/CategoryUtilityPrices";
import { ValueUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/value-utility-prices/ValueUtilityPrices";

interface ItemUtilityPricesProps {
  id: string;
  category: string;
  image: string[];
  valueName: "kW" | "m³" | "piece";
  value: number;
}

export function MdItemUtilityPrices({
  category,
  image,
  valueName,
  value,
  id,
}: ItemUtilityPricesProps) {
  return (
    <li className={Styles.itemUtilityPrices}>
      <CategoryUtilityPrices
        category={category}
        image={image}
      />

      <ValueUtilityPrices
        valueName={valueName}
        value={value}
        id={id}
      />
    </li>
  );
}
