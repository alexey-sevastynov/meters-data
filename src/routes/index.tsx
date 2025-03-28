import { RouteObject } from "react-router-dom";
import { Layout } from "@/pages/Layout";
import { Home } from "@/pages/Home";
import { Address001 } from "@/pages/Address001";
import { Address002 } from "@/pages/Address002";
import { Address003 } from "@/pages/Address003";
import { Address004 } from "@/pages/Address004";
import { Address005 } from "@/pages/Address005";
import { Price } from "@/pages/Price";
import { Graphics } from "@/pages/Graphics";
import { ROUTES } from "@/constants/routes";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.ADDR_001, element: <Address001 /> },
      { path: ROUTES.ADDR_002, element: <Address002 /> },
      { path: ROUTES.ADDR_003, element: <Address003 /> },
      { path: ROUTES.ADDR_004, element: <Address004 /> },
      { path: ROUTES.ADDR_005, element: <Address005 /> },
      { path: ROUTES.PRICE, element: <Price /> },
      { path: ROUTES.GRAPHICS, element: <Graphics /> },
    ],
  },
];

export default routes;
