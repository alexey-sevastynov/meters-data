import { NavLink } from "react-router-dom";
import styles from "./bottomSidebar.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { iconSizes } from "@/components/ui/icon/icon-constants";
import { MdImage } from "@/components/ui/image/MdImage";

export function MdBottomSidebar() {
    return (
        <nav className={styles.root}>
            <ul className={styles.listLinks}>
                {navigationItems.map((item) => (
                    <li key={item.id} className={styles.itemLink}>
                        <NavLink
                            to={item.link}
                            className={({ isActive }) => (isActive ? styles.active : styles.noActive)}
                        >
                            <MdImage
                                className={styles.itemLinkIcon}
                                fileName={item.imageName}
                                alt={item.text}
                                width={iconSizes.large}
                                height={iconSizes.large}
                            />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
