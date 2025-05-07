import Styles from "./categoryUtilityPrices.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { CategoryName } from "@/enums/category-names";
import { MdImage } from "@/components/ui/image/MdImage";

interface CategoryUtilityPricesProps {
    category: string;
    image: string[];
}

export function CategoryUtilityPrices({ category, image }: CategoryUtilityPricesProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={Styles.categoryUtilityPrices}>
            <p>{translations.home[category as CategoryName]},</p>
            <div className={Styles.images}>
                {image.map((name) => (
                    <MdImage key={name} fileName={name} alt={category} width={29} height={29} />
                ))}
            </div>
        </div>
    );
}
