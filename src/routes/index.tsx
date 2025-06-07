import "@/styles/pages/address.scss";
import { RouteObject } from "react-router-dom";
import { LayoutPage } from "@/pages/LayoutPage";
import { HomePage } from "@/pages/HomePage";
import { PricePage } from "@/pages/PricePage";
import { GraphicsPage } from "@/pages/GraphicsPage";
import { appRoutes } from "@/constants/routes";
import { AddressPage } from "@/pages/AddressPage";
import { addressPages } from "@/routes/address-pages";

const routes: RouteObject[] = [
    {
        path: appRoutes.home,
        element: <LayoutPage />,
        children: [
            { index: true, element: <HomePage /> },
            ...addressPages.map(({ id, path, breadcrumbItems, isWaterBlock }) => ({
                path,
                element: (
                    <AddressPage key={id} breadcrumbItems={breadcrumbItems} isWaterBlock={isWaterBlock} />
                ),
            })),
            { path: appRoutes.price, element: <PricePage /> },
            { path: appRoutes.graphics, element: <GraphicsPage /> },
        ],
    },
];

export default routes;
