import { getLocalStorageItem } from "@/utils/local-storage";
import { isStringFalse, isStringTrue } from "@/utils/string";

export function getSidebarCollapsedStateFromStorage(key: string, defaultValue: boolean) {
    const isSidebarCollapsedStored = getLocalStorageItem(key);

    if (!isSidebarCollapsedStored) return defaultValue;

    if (isStringTrue(isSidebarCollapsedStored)) return true;

    if (isStringFalse(isSidebarCollapsedStored)) return false;

    return defaultValue;
}
