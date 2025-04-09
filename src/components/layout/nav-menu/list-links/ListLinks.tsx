import Styles from "./listLinks.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { ItemLinkPage } from "@/components/layout/nav-menu/list-links/item-link-page/ItemLinkPage";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface ListLinksProps {
    closeMenu: VoidFuncNoParam;
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
