import "@/styles/pages/audit-logs.scss";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsAuditLogs } from "@/constants/breadcrumb-items";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { MdAuditLogs } from "@/components/features/audit-logs/MdAuditLogs";

export function AuditLogsPage() {
    const sidebarContext = useSidebar();

    return (
        <div className="audit-logs">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <div className="title">
                    <MdBreadcrumb items={getBreadcrumbItemsAuditLogs()} />
                </div>
                <MdAuditLogs />
            </div>
        </div>
    );
}
