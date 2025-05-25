import styles from "./itemUtilityPrices.module.scss";
import { CategoryUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/category-utility-prices/CategoryUtilityPrices";
import { ValueUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/value-utility-prices/ValueUtilityPrices";
import { CategoryName } from "@/enums/category-names";

interface ItemUtilityPricesProps {
    id: string;
    category: CategoryName;
    image: string[];
    valueName: "kW" | "m³" | "piece";
    value: number;
}

export function MdItemUtilityPrices({ category, image, valueName, value, id }: ItemUtilityPricesProps) {
    return (
        <li className={styles.root}>
            <CategoryUtilityPrices category={category} image={image} />
            <ValueUtilityPrices valueName={valueName} value={value} id={id} />
        </li>
    );
}
