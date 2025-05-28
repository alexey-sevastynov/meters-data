export function getPropertyValue<T, K, R>(object: T, key: K) {
    return object[key as keyof T] as R;
}
