export type TypeListUtylityPrices = {
  _id: string;
  category: string;
  image: string[];
  valueName: "kW" | "m³" | "piece";
  value: number;
}[];
