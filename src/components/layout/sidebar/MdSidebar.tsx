import styles from "./sidebar.module.scss";
import { ListLinks } from "@/components/layout/sidebar/list-links/ListLinks";
import { useSidebar } from "@/components/context/SidebarProvider";

export function MdSidebar() {
    const sidebarContext = useSidebar();

    return (
        <nav className={styles.sidebar}>
            <div className={sidebarContext.isSidebarCollapsed ? styles.collapsed : styles.expanded}>
                <ListLinks
                    isSidebarCollapsed={sidebarContext.isSidebarCollapsed}
                    toggleSidebar={sidebarContext.toggleSidebar}
                />
            </div>
        </nav>
    );
}
