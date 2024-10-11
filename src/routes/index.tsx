import { RouteObject } from "react-router-dom";
import Layout from "../pages/Layout";
import { Home } from "../pages/Home";
import {
  Antonovicha73,
  Antonovicha75,
  Antonovicha75_3,
  Cheluskina,
  Slobozhansky,
} from "../pages";
import { Price } from "../pages/Price";
import { Graphics } from "../pages/Graphics";
import { ROUTES } from "../constants/routes";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.ADDR_001, element: <Cheluskina /> },
      { path: ROUTES.ADDR_002, element: <Slobozhansky /> },
      { path: ROUTES.ADDR_003, element: <Antonovicha73 /> },
      { path: ROUTES.ADDR_004, element: <Antonovicha75 /> },
      { path: ROUTES.ADDR_005, element: <Antonovicha75_3 /> },
      { path: ROUTES.PRICE, element: <Price /> },
      { path: ROUTES.GRAPHICS, element: <Graphics /> },
    ],
  },
];

export default routes;
