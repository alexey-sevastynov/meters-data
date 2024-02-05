import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout";
import { Home } from "../pages/Home";
import {
  Antonovicha73,
  Antonovicha75,
  Cheluskina,
  Slobozhansky,
} from "../pages";
import { Price } from "../pages/Price";
import { Graphics } from "../pages/Graphics";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.ANTONOVICHA_73, element: <Antonovicha73 /> },
      { path: ROUTES.ANTONOVICHA_75, element: <Antonovicha75 /> },
      { path: ROUTES.SLOBOZHANSKY_68A, element: <Slobozhansky /> },
      { path: ROUTES.CHELUSKINA, element: <Cheluskina /> },
      { path: ROUTES.PRICE, element: <Price /> },
      { path: ROUTES.GRAPHICS, element: <Graphics /> },
    ],
  },
];

export default routes;
