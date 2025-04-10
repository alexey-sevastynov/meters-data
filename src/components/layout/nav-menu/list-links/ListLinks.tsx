import Styles from "./listLinks.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { ItemLink } from "@/components/layout/nav-menu/list-links/item-link/ItemLink";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface ListLinksProps {
    closeMenu: VoidFuncNoParam;
}

export function ListLinks({ closeMenu }: ListLinksProps) {
    return (
        <ul className={Styles.listLinks}>
            {navigationItems.map((item) => (
                <ItemLink
                    key={item.id}
                    link={item.link}
                    text={item.text}
                    imageName={item.imageName}
                    onClick={closeMenu}
                />
            ))}
        </ul>
    );
}
