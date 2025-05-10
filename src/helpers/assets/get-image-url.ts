const iconsBasePath = "assets/images/";

export function getImageUrl(fileName: string) {
    return import.meta.env.BASE_URL + iconsBasePath + fileName;
}
