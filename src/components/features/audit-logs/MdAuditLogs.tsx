import styles from "./auditLogs.module.scss";
import { useEffect } from "react";
import { MdTable } from "@/components/shared/table/MdTable";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllAuditLogs } from "@/store/slices/audit-logs-slice";
import { initialTableAuditLogsConfig } from "@/components/features/audit-logs/auditLogs.funcs";
import { MdAuditLogsHeader } from "@/components/features/audit-logs/audit-logs-header/AuditLogsHeader";

export function MdAuditLogs() {
    const dispatch = useAppDispatch();
    const auditLogsItems = useAppSelector((state) => state.auditLogs.items);
    const auditLogsStatus = useAppSelector((state) => state.auditLogs.status);

    useEffect(() => {
        dispatch(getAllAuditLogs());
    }, [dispatch]);

    return (
        <div className={styles.root}>
            <MdAuditLogsHeader />
            <div className={styles.table}>
                <MdTable tableConfig={initialTableAuditLogsConfig(auditLogsItems)} status={auditLogsStatus} />
            </div>
        </div>
    );
}
