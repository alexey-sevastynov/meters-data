import Styles from "./listLinks.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { ItemLinkPage } from "@/components/layout/nav-menu/list-links/item-link-page/ItemLinkPage";

interface ListLinksProps {
    closeMenu: () => void;
}

export function ListLinks({ closeMenu }: ListLinksProps) {
    return (
        <ul className={Styles.listLinks}>
            {navigationItems.map(({ link, id, imageName }) => (
                <ItemLinkPage key={id} link={link} id={id} imageName={imageName} onClick={closeMenu}>
                    {id}
                </ItemLinkPage>
            ))}
        </ul>
    );
}
