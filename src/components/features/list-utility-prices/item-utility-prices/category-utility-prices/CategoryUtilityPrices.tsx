import React from "react";
import Styles from "./categoryUtilityPrices.module.scss";
import { getIconUrl } from "@/helpers/getIconUrl";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { CategoryName } from "@/types/category-name";

interface CategoryUtilityPricesProps {
    category: string;
    image: string[];
}

export const CategoryUtilityPrices: React.FC<CategoryUtilityPricesProps> = ({ category, image }) => {
    const lang = useAppSelector(selectTranslations);
    return (
        <div className={Styles.categoryUtilityPrices}>
            <p>{lang.home[category as CategoryName]},</p>
            <div className={Styles.images}>
                {image.map((name) => (
                    <img key={name} src={getIconUrl(name)} alt={category} width={29} height={29} />
                ))}
            </div>
        </div>
    );
};
