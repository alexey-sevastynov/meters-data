import { RouteObject } from "react-router-dom";
import { ROUTES } from "../constants";
import Layout from "../pages/Layout";

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [],
  },
];

export default routes;
