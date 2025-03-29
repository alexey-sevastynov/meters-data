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
import { appRoutes } from "@/constants/routes";

const routes: RouteObject[] = [
    {
        path: appRoutes.home,
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: appRoutes.addr001, element: <Address001 /> },
            { path: appRoutes.addr002, element: <Address002 /> },
            { path: appRoutes.addr003, element: <Address003 /> },
            { path: appRoutes.addr004, element: <Address004 /> },
            { path: appRoutes.addr005, element: <Address005 /> },
            { path: appRoutes.price, element: <Price /> },
            { path: appRoutes.graphics, element: <Graphics /> },
        ],
    },
];

export default routes;
