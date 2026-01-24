import { navigationAddressItems } from "@/constants/navigation-items";

export function getNavigationItem(address?: string) {
    if (!address) {
        throw new Error(`Function ${getNavigationItem.name}: address parameter is missing`);
    }

    const addressLink = `/${address}`;
    const navigationItem = navigationAddressItems.find((item) => item.link === addressLink);

    if (!navigationItem) {
        throw new Error(
            `Function ${getNavigationItem.name}: no navigation item found for address "${address}"`,
        );
    }

    return navigationItem;
}
