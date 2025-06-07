import { BreadcrumbItem } from "@/components/shared/breadcrumb/breadcrumb.type";
import { addressLinkNames, addressNames } from "@/constants/address";
import { routeNames, appRoutes } from "@/constants/routes";

const unknownAddressString = "unknown address";

export function getBreadcrumbsItemsAddress(
    addressLinkName: string,
    addressName: string,
    appRoutePath: string
) {
    const breadcrumbItemsAddress = createBreadcrumbItems([
        createAddressItem(addressLinkName, addressName, appRoutePath),
    ]);

    return breadcrumbItemsAddress;
}

export function getBreadcrumbItemsGraphics(
    addressLinkName: string,
    addressName = unknownAddressString,
    appRoutePath: string
) {
    const breadcrumbItemsGraphics = createBreadcrumbItems([
        createAddressItem(addressLinkName, addressName, addressLinkName),
        createAddressItem(routeNames.graphics, routeNames.graphics, routeNames.meterData + appRoutePath),
    ]);

    return breadcrumbItemsGraphics;
}

export function getBreadcrumbItemsPrice(
    addressLinkName: string,
    addressName = unknownAddressString,
    appRoutePath: string
) {
    const breadcrumbItemsPrice = createBreadcrumbItems([
        createAddressItem(addressLinkName, addressName, addressLinkName),
        createAddressItem(routeNames.price, routeNames.price, routeNames.meterData + appRoutePath),
    ]);

    return breadcrumbItemsPrice;
}

function createAddressItem(addressId: string, addressName: string, route: string) {
    const addressItem = {
        id: addressId,
        label: addressName,
        link: "/" + route,
    };

    return addressItem;
}

function createBreadcrumbItems(additionalItems: BreadcrumbItem[]) {
    const breadcrumbItems = [
        {
            id: addressLinkNames.home,
            label: addressNames.home,
            link: appRoutes.home,
        },
        ...additionalItems,
    ];

    return breadcrumbItems;
}
