import styles from "./itemUtilityPrices.module.scss";
import { CategoryUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/category-utility-prices/CategoryUtilityPrices";
import { ValueUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/value-utility-prices/ValueUtilityPrices";
import { CategoryName } from "@/enums/category-names";
import { isDev } from "@/lib/environments";
import { UnitName } from "@/types/value-names";

interface ItemUtilityPricesProps {
    id: string;
    category: CategoryName;
    image: string[];
    valueName: UnitName;
    value: number;
}

export function MdItemUtilityPrices({ category, image, valueName, value, id }: ItemUtilityPricesProps) {
    return (
        <li className={styles.root}>
            <CategoryUtilityPrices category={category} image={image} valueName={valueName} value={value} />
            {isDev() && <ValueUtilityPrices value={value} id={id} />}
        </li>
    );
}
