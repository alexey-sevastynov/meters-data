import { ADDRESS } from "./address";

export const ADDRESS_TYPES = {
  PRICE: "price",
  GRAPHICS: "graphics",
  METERS_DATA: "meters-data",
};

export const ROUTES = {
  HOME: `/`,
  ADDR_001: `/` + ADDRESS.ADDR_001,
  ADDR_002: `/` + ADDRESS.ADDR_002,
  ADDR_003: `/` + ADDRESS.ADDR_003,
  ADDR_004: `/` + ADDRESS.ADDR_004,
  ADDR_005: `/` + ADDRESS.ADDR_005,

  PRICE: `:address/${ADDRESS_TYPES.PRICE}`,
  GRAPHICS: `:address/${ADDRESS_TYPES.GRAPHICS}`,
} as const;
