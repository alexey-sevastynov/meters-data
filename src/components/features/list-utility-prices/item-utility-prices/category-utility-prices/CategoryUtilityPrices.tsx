import styles from "./categoryUtilityPrices.module.scss";
import { CategoryName } from "@/enums/category-names";
import { MdImage } from "@/components/ui/image/MdImage";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { UnitName } from "@/types/value-names";

interface CategoryUtilityPricesProps {
    category: CategoryName;
    image: string[];
    valueName: UnitName;
    value: number;
}

export function CategoryUtilityPrices({ category, image, valueName, value }: CategoryUtilityPricesProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <p>
                {translations.home[category]}, 1 {translations.value[valueName]} = {value}{" "}
                {translations.value.uah}
            </p>
            <div className={styles.images}>
                {image.map((name) => (
                    <MdImage key={name} fileName={name} alt={category} width={29} height={29} />
                ))}
            </div>
        </div>
    );
}
