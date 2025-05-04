import React from "react";
import Styles from "./categoryUtilityPrices.module.scss";
import { getIconUrl } from "@/helpers/assets/get-icon-url";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { CategoryName } from "@/enums/category-names";

interface CategoryUtilityPricesProps {
    category: string;
    image: string[];
}

export const CategoryUtilityPrices: React.FC<CategoryUtilityPricesProps> = ({ category, image }) => {
    const translations = useAppSelector(selectTranslations);
    return (
        <div className={Styles.categoryUtilityPrices}>
            <p>{translations.home[category as CategoryName]},</p>
            <div className={Styles.images}>
                {image.map((name) => (
                    <img key={name} src={getIconUrl(name)} alt={category} width={29} height={29} />
                ))}
            </div>
        </div>
    );
};
