import { NavLink } from "react-router-dom";
import Styles from "./bottomSidebar.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { getIconUrl } from "@/helpers/get-icon-url";
import { iconSizes } from "@/components/ui/icon/icon-constants";

export function MdBottomSidebar() {
    return (
        <nav className={Styles.bottomSidebar}>
            <ul className={Styles.listLinks}>
                {navigationItems.map((item) => (
                    <li key={item.id} className={Styles.itemLink}>
                        <NavLink
                            to={item.link}
                            className={({ isActive }) => (isActive ? Styles.active : Styles.noActive)}
                        >
                            <img
                                src={getIconUrl(item.imageName)}
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
