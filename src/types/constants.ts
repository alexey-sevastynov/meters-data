import { CategoryName } from "@/types/category-name";

export type TypeListUtilityPrices = {
    _id: string;
    category: CategoryName;
    image: string[];
    valueName: "kW" | "m³" | "piece";
    value: number;
}[];
