export type TypeListUtylityPrices = {
  id: number;
  category: string;
  image: string[];
  valueName: "kW" | "m³" | "piece";
  value: number;
}[];
