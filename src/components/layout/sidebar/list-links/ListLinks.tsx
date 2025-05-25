import styles from "./listLinks.module.scss";
import { navigationItems } from "@/constants/navigation-items";
import { ItemLink } from "@/components/layout/sidebar/list-links/item-link/ItemLink";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface ListLinksProps {
    isSidebarCollapsed: boolean;
    toggleSidebar: VoidFuncNoParam;
}

export function ListLinks({ isSidebarCollapsed, toggleSidebar }: ListLinksProps) {
    return (
        <div className={styles.root}>
            <ul>
                {navigationItems.map((item) => (
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
