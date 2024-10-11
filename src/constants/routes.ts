import { ADDRESS } from "./address";

export const ROUTES = {
  HOME: `/`,
  ADDR_001: `/` + ADDRESS.ADDR_001,
  ADDR_002: `/` + ADDRESS.ADDR_002,
  ADDR_003: `/` + ADDRESS.ADDR_003,
  ADDR_004: `/` + ADDRESS.ADDR_004,
  ADDR_005: `/` + ADDRESS.ADDR_005,

  PRICE: `:address/price`,
  GRAPHICS: `:address/graphics`,
} as const;
