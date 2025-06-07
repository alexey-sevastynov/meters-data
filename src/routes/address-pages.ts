import { addressLinkNames, addressNames } from "@/constants/address";
import { getBreadcrumbsItemsAddress } from "@/constants/breadcrumb-items";
import { appRoutes } from "@/constants/routes";
import { createUniqueId } from "@/utils/id";

export const addressPages = [
    {
        id: createUniqueId(),
        path: appRoutes.address001,
        breadcrumbItems: getBreadcrumbsItemsAddress(
            addressLinkNames.address001,
            addressNames.address001,
            appRoutes.address001
        ),
    },
    {
        id: createUniqueId(),
        path: appRoutes.address002,
        breadcrumbItems: getBreadcrumbsItemsAddress(
            addressLinkNames.address002,
            addressNames.address002,
            appRoutes.address002
        ),
    },
    {
        id: createUniqueId(),
        path: appRoutes.address003,
        isWaterBlock: false,
        breadcrumbItems: getBreadcrumbsItemsAddress(
            addressLinkNames.address003,
            addressNames.address003,
            appRoutes.address003
        ),
    },
    {
        id: createUniqueId(),
        path: appRoutes.address004,
        isWaterBlock: false,
        breadcrumbItems: getBreadcrumbsItemsAddress(
            addressLinkNames.address004,
            addressNames.address004,
            appRoutes.address004
        ),
    },
    {
        id: createUniqueId(),
        path: appRoutes.address005,
        isWaterBlock: false,
        breadcrumbItems: getBreadcrumbsItemsAddress(
            addressLinkNames.address005,
            addressNames.address005,
            appRoutes.address005
        ),
    },
];
