import Styles from "./sidebar.module.scss";
import { ListLinks } from "@/components/layout/sidebar/list-links/ListLinks";
import { useSidebar } from "@/components/context/SidebarProvider";

export function MdSidebar() {
    const sidebarContext = useSidebar();

    return (
        <nav className={Styles.sidebar}>
            <div className={sidebarContext.isSidebarCollapsed ? Styles.collapsed : Styles.expanded}>
                <ListLinks
                    isSidebarCollapsed={sidebarContext.isSidebarCollapsed}
                    toggleSidebar={sidebarContext.toggleSidebar}
                />
            </div>
        </nav>
    );
}
