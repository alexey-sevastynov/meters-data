const iconsBasePath = "../../assets/icon/";

export function getIconUrl(fileName: string) {
    return new URL(iconsBasePath + fileName, import.meta.url).href;
}
