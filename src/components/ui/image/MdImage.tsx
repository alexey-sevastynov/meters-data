const iconsBasePath = "assets/images/";

interface MdImageProps {
    fileName: string;
    alt?: string;
    className?: string;
    width?: number;
    height?: number;
}

export function MdImage({ fileName, alt, className, width, height }: MdImageProps) {
    return (
        <img
            src={getImageUrl(fileName)}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading="lazy"
        />
    );
}

function getImageUrl(fileName: string) {
    return import.meta.env.BASE_URL + iconsBasePath + fileName;
}
