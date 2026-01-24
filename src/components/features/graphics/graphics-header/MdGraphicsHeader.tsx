import styles from "./graphicsHeader.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

export function MdGraphicHeader() {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <h2>{translations.graphics.title}</h2>
            <p className={styles.description}>{translations.graphics.description}</p>
        </div>
    );
}
