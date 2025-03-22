import { ROUTES } from "@/constants/routes";

export const API_URL = import.meta.env.VITE_API_URL;

export const BREAK_POINTS = {
  MOBILE_S: 350,
  MOBILE: 450,
  MOBILE_XL: 567,
  TABLET: 768,
  LAPTOP: 1024,
  LAPTOP_L: 1356,
};

export const LIST_NAV = [
  {
    link: ROUTES.HOME,
    id: "Home",
    imageName: "home.png",
  },
  {
    link: `/${import.meta.env.VITE_ADDR_003}`,
    id: import.meta.env.VITE_ADDR_NAME_003,
    imageName: "73-8.svg",
  },
  {
    link: `/${import.meta.env.VITE_ADDR_004}`,
    id: import.meta.env.VITE_ADDR_NAME_004,
    imageName: "75-1.svg",
  },
  {
    link: `/${import.meta.env.VITE_ADDR_005}`,
    id: import.meta.env.VITE_ADDR_NAME_005,
    imageName: "75-3.svg",
  },
  {
    link: `/${import.meta.env.VITE_ADDR_002}`,
    id: import.meta.env.VITE_ADDR_NAME_002,
    imageName: "68a-63.svg",
  },
  {
    link: `/${import.meta.env.VITE_ADDR_001}`,
    id: import.meta.env.VITE_ADDR_NAME_001,
    imageName: "1-12.svg",
  },
];

export const LIST_UTILITY_PRICES = [
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
  "Light general": "kW",
  "Light day": "kW",
  "Light night": "kW",
  "Gas General": "m³",
  "Water general": "m³",
};

export const WIDTH_COMPONENT_LIST_METERS_DATA_SMALL = 820;
export const WIDTH_COMPONENT_LIST_METERS_DATA_BIG = 955;
export const HEIGHT_COMPONENT_HEADER = 80;

export const URL_API_TELEGRAM_SEND_MESSAGE = `https://api.telegram.org/bot${
  import.meta.env.VITE_TOKEN
}/sendMessage`;
