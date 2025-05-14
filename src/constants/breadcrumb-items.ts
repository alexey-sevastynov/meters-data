import { BreadcrumbItem } from "@/components/shared/breadcrumb/breadcrumb.type";
import { addressLinkNames, addressNames } from "@/constants/address";
import { routeNames, appRoutes } from "@/constants/routes";

const unknownAddressString = "unknown address";

const createAddressItem = (addressId: string, addressName: string, route: string) => ({
    id: addressId,
    label: addressName,
    link: "/" + route,
});

const createBreadcrumbItems = (additionalItems: BreadcrumbItem[] = []) => [
    { id: addressLinkNames.home, label: addressNames.home, link: appRoutes.home },
    ...additionalItems,
];

export const BREADCRUMB_ITEMS_ADDR_001 = createBreadcrumbItems([
    createAddressItem(addressLinkNames.address001, addressNames.address001, appRoutes.addr001),
]);

export const BREADCRUMB_ITEMS_ADDR_002 = createBreadcrumbItems([
    createAddressItem(addressLinkNames.address002, addressNames.address002, appRoutes.addr002),
]);

export const BREADCRUMB_ITEMS_ADDR_003 = createBreadcrumbItems([
    createAddressItem(addressLinkNames.address003, addressNames.address003, appRoutes.addr003),
]);

export const BREADCRUMB_ITEMS_ADDR_004 = createBreadcrumbItems([
    createAddressItem(addressLinkNames.address004, addressNames.address004, appRoutes.addr004),
]);

export const BREADCRUMB_ITEMS_ADDR_005 = createBreadcrumbItems([
    createAddressItem(addressLinkNames.address005, addressNames.address005, appRoutes.addr005),
]);

export const getBreadcrumbItemsGraphics = (
    address: string,
    route: string,
    addressName = unknownAddressString
) => {
    return createBreadcrumbItems([
        createAddressItem(address, addressName, address),
        createAddressItem(routeNames.graphics, routeNames.graphics, routeNames.meterData + route),
    ]);
};

export const getBreadcrumbItemsPrice = (
    address: string,
    route: string,
    addressName = unknownAddressString
) => {
    return createBreadcrumbItems([
        createAddressItem(address, addressName, address),
        createAddressItem(routeNames.price, routeNames.price, routeNames.meterData + route),
    ]);
};
