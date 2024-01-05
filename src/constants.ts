import { TypeListUtylityPrices } from "./types/constants";

export const BREAK_POINTS = {
  MOBILE_S: 350,
  MOBILE: 450,
  MOBILE_XL: 567,
  TABLET: 768,
  LAPTOP: 1024,
};

export const ROUTES = {
  HOME: "/",
  CHELUSKINA: "/chelyuskina",
  ANTONOVICHA_75: "/antonovicha-75",
  ANTONOVICHA_73: "/antonovicha-73",
  SLOBOZHANSKY_68A: "/slobozhansky-68a",
  PRICE: `/:address/price`,
};

export const LIST_NAV = [
  {
    link: "/",
    id: "Home",
    imageName: "home.png",
  },
  {
    link: "/antonovicha-73",
    id: "Volodymyr Antonovicha street, 73/8",
    imageName: "adress.png",
  },
  {
    link: "/antonovicha-75",
    id: "Volodymyr Antonovicha street, 75/1",
    imageName: "adress.png",
  },
  {
    link: "/slobozhansky-68a",
    id: "Slobozhansky Avenue, 68A/63",
    imageName: "adress.png",
  },
  {
    link: "/chelyuskina",
    id: "Chelyuskina street, 1/12",
    imageName: "adress.png",
  },
];

export const LIST_UTILITY_PRICES: TypeListUtylityPrices = [
  {
    id: 1,
    category: "Light general",
    image: ["light.png"],
    valueName: "kW",
    value: 2.64,
  },
  {
    id: 2,
    category: "Light day",
    image: ["light.png", "sun.png"],
    valueName: "kW",
    value: 2.64,
  },
  {
    id: 3,
    category: "Light night",
    image: ["light.png", "moon.png"],
    valueName: "kW",
    value: 1.32,
  },
  {
    id: 4,
    category: "Gas",
    image: ["gas.png"],
    valueName: "m³",
    value: 7.99,
  },
  {
    id: 5,
    category: "Water",
    image: ["water.png"],
    valueName: "m³",
    value: 37.43,
  },
  {
    id: 6,
    category: "Fixed water",
    image: ["water.png", "fixed.png"],
    valueName: "piece",
    value: 344,
  },
  {
    id: 7,
    category: "Delivery Gas",
    image: ["delivery-gas.png", "gas.png"],
    valueName: "piece",
    value: 10,
  },
  {
    id: 8,
    category: "Delivery Water",
    image: ["delivery-water.png", "water.png"],
    valueName: "piece",
    value: 37.43,
  },
  {
    id: 9,
    category: "OSMD",
    image: ["OSMD.png"],
    valueName: "piece",
    value: 290,
  },
  {
    id: 10,
    category: "Trash",
    image: ["trash.png"],
    valueName: "piece",
    value: 84,
  },
  {
    id: 11,
    category: "Intercom",
    image: ["intercom.png", "phone.png"],
    valueName: "piece",
    value: 30,
  },
  {
    id: 12,
    category: "Internet Kyivstar",
    image: ["wifi.png", "Kyivstar.png"],
    valueName: "piece",
    value: 250,
  },
  {
    id: 13,
    category: "Internet Soyuz T.",
    image: ["wifi.png", "souz.png"],
    valueName: "piece",
    value: 210,
  },
  {
    id: 14,
    category: "Internet",
    image: ["wifi.png"],
    valueName: "piece",
    value: 300,
  },
];

export const LIST_INFO_DATA_MONTH = [
  { title: "Date", description: "December, 2023" },
  { title: "Light general", description: 300 },
  { title: "Light day", description: 200 },
  { title: "Light night", description: 100 },
  { title: "Gas General", description: 11 },
  { title: "Water general", description: 10 },
];

export const LIST_DATA = [
  {
    id: 1,
    date: "January, 2023",
    light: 4720.23,
    lightDay: 4500.23,
    lightNight: 320,
    gas: 112.44,
    water: 22.4,
  },
  {
    id: 2,
    date: "February, 2023",
    light: 4720.23,
    lightDay: 4500.23,
    lightNight: 320,
    gas: 112.44,
    water: 22.4,
  },
  {
    id: 3,
    date: "Mart, 2023",
    light: 4720.23,
    lightDay: 4500.23,
    lightNight: 320,
    gas: 112.44,
    water: 22.4,
  },
];

export const VALUE_BY_TITLE: Record<string, string> = {
  "Light general": "кВт",
  "Light day": "кВт",
  "Light night": "кВт",
  "Gas General": "м³",
  "Water general": "м³",
};