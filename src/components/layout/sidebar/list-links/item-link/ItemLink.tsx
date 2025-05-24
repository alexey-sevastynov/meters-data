import styles from "./itemLink.module.scss";
import { NavLink } from "react-router-dom";
import { iconSizes } from "@/components/ui/icon/icon-constants";
import { MdImage } from "@/components/ui/image/MdImage";

interface ItemLinkProps {
    link: string;
    imageName: string;
    text: string;
    isSidebarCollapsed?: boolean;
}

export function ItemLink({ link, imageName, text, isSidebarCollapsed }: ItemLinkProps) {
    return (
        <li>
            <NavLink to={link} className={({ isActive }) => (isActive ? styles.active : styles.itemLinkPage)}>
                <MdImage fileName={imageName} alt={text} width={iconSizes.large} height={iconSizes.large} />
                {!isSidebarCollapsed && <p className={styles.text}>{text}</p>}
            </NavLink>
        </li>
    );
}
