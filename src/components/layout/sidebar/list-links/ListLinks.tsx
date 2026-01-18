import styles from "./listLinks.module.scss";
import { navigationAddressItems, navigationHomeItem } from "@/constants/navigation-items";
import { ItemLink } from "@/components/layout/sidebar/list-links/item-link/ItemLink";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface ListLinksProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: VoidFuncNoParam;
}

export function ListLinks({ isSidebarCollapsed, toggleSidebar }: ListLinksProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <ul>
                <ItemLink
                    link={navigationHomeItem.link}
                    text={translations.home["home"] ?? navigationHomeItem.text}
                    imageName={navigationHomeItem.imageName}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
            </ul>

            {!isSidebarCollapsed && <p className={styles.title}>{translations.sidebar.addresses}</p>}
            <ul>
                {navigationAddressItems.map((item) => (
                    <ItemLink
                        key={item.id}
                        link={item.link}
                        text={item.text}
                        imageName={item.imageName}
                        isSidebarCollapsed={isSidebarCollapsed}
                    />
                ))}
            </ul>

            <button onClick={toggleSidebar}>
                <MdIcon name={isSidebarCollapsed ? iconNames.caretSquareRight : iconNames.caretSquareLeft} />
            </button>
        </div>
    );
}
