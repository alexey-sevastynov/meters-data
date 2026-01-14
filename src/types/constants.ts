import { CategoryName } from "@/enums/category-names";
import { UnitName } from "@/types/value-names";

export type TypeListUtilityPrices = {
    _id: string;
    category: CategoryName;
    image: string[];
    valueName: UnitName;
    value: number;
}[];
