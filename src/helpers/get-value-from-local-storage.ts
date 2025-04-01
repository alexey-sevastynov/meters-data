import { LocalStorageKey } from "@/enums/local-storage-keys";

export function getValueFromLocalStorage(key: LocalStorageKey) {
    const value = localStorage.getItem(key);

    return value;
}
