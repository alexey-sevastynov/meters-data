export function isProd() {
    return import.meta.env.PROD;
}

export function isDev() {
    return import.meta.env.DEV;
}

export function isBrowser() {
    return typeof window !== "undefined";
}
