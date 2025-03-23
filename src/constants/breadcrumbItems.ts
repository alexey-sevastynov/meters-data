import { BreadcrumbItem } from "../components/shared/breadcrumb/breadcrumb.type";
import { ADDRESS, ADDRESS_NAME } from "./address";
import { ADDRESS_TYPES, ROUTES } from "./routes";

const unknownAddressString = "unknown address";

const createAddressItem = (addressId: string, addressName: string, route: string) => ({
    id: addressId,
    label: addressName,
    link: "/" + route,
});

const createBreadcrumbItems = (additionalItems: BreadcrumbItem[] = []) => [
    { id: ADDRESS.HOME, label: ADDRESS_NAME.HOME, link: ROUTES.HOME },
    ...additionalItems,
];

export const BREADCRUMB_ITEMS_ADDR_001 = createBreadcrumbItems([
    createAddressItem(ADDRESS.ADDR_001, ADDRESS_NAME.ADDR_001, ROUTES.ADDR_001),
]);

export const BREADCRUMB_ITEMS_ADDR_002 = createBreadcrumbItems([
    createAddressItem(ADDRESS.ADDR_002, ADDRESS_NAME.ADDR_002, ROUTES.ADDR_002),
]);

export const BREADCRUMB_ITEMS_ADDR_003 = createBreadcrumbItems([
    createAddressItem(ADDRESS.ADDR_003, ADDRESS_NAME.ADDR_003, ROUTES.ADDR_003),
]);

export const BREADCRUMB_ITEMS_ADDR_004 = createBreadcrumbItems([
    createAddressItem(ADDRESS.ADDR_004, ADDRESS_NAME.ADDR_004, ROUTES.ADDR_004),
]);

export const BREADCRUMB_ITEMS_ADDR_005 = createBreadcrumbItems([
    createAddressItem(ADDRESS.ADDR_005, ADDRESS_NAME.ADDR_005, ROUTES.ADDR_005),
]);

export const getBreadcrumbItemsGraphics = (
    address: string,
    route: string,
    addressName = unknownAddressString
) => {
    return createBreadcrumbItems([
        createAddressItem(address, addressName, address),
        createAddressItem(ADDRESS_TYPES.GRAPHICS, ADDRESS_TYPES.GRAPHICS, ADDRESS_TYPES.METERS_DATA + route),
    ]);
};

export const getBreadcrumbItemsPrice = (
    address: string,
    route: string,
    addressName = unknownAddressString
) => {
    return createBreadcrumbItems([
        createAddressItem(address, addressName, address),
        createAddressItem(ADDRESS_TYPES.PRICE, ADDRESS_TYPES.PRICE, ADDRESS_TYPES.METERS_DATA + route),
    ]);
};
