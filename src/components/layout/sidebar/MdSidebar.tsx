import styles from "./sidebar.module.scss";
import { ListLinks } from "@/components/layout/sidebar/list-links/ListLinks";
import { useSidebar } from "@/components/context/SidebarProvider";
import { cn } from "@/lib/cn";

export function MdSidebar() {
    const sidebar = useSidebar();

    return (
        <nav className={styles.sidebar}>
            <div className={cn(sidebar.isSidebarCollapsed ? styles.collapsed : styles.expanded)}>
                <ListLinks
                    isSidebarCollapsed={sidebar.isSidebarCollapsed}
                    toggleSidebar={sidebar.toggleSidebar}
                />
            </div>
        </nav>
    );
}
