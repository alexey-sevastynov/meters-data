import { CategoryName } from "@/enums/category-names";

export type TypeListUtilityPrices = {
    _id: string;
    category: CategoryName;
    image: string[];
    valueName: "kW" | "m³" | "piece";
    value: number;
}[];
