import { TableConfig } from "@/components/shared/table/table-config";
import {
    TableAuditLogsDataKey,
    tableAuditLogsDataKeys,
    TableAuditLogsDataLabel,
    tableAuditLogsDataLabels,
    tableColumnAligns,
    tableColumnTypes,
} from "@/components/shared/table/table-enums";
import { TableColumn, TableRow } from "@/components/shared/table/table-models";
import { AuditLogWithObjectId } from "@/store/models/audit-logs";
import { stringifyJSON } from "@/utils/json";

export function initialTableAuditLogsConfig(auditLogs: AuditLogWithObjectId[]) {
    const tableConfig: TableConfig = {
        columns: getTableAuditLogsColumns(),
        rows: getTableAuditLogsRows(auditLogs),
    };

    return tableConfig;
}

function getAuditLogsDataRows(auditLogs: AuditLogWithObjectId[]) {
    return auditLogs.map((auditLog) => {
        const row: TableRow = {
            id: auditLog._id,
            action: auditLog.action,
            resourceName: auditLog.resourceName,
            newValue: stringifyJSON(auditLog.newValue),
            oldValue: stringifyJSON(auditLog.oldValue),
            resourceId: auditLog.resourceId,
            ip: auditLog.ip,
            userAgent: auditLog.userAgent,
            createdAt: auditLog.createdAt,
            updatedAt: auditLog.updatedAt,
        };

        return row;
    });
}

function getTableAuditLogsRows(auditLogs: AuditLogWithObjectId[]) {
    return getAuditLogsDataRows(auditLogs).reverse();
}

function getTableAuditLogsColumns() {
    const columns: TableColumn<TableAuditLogsDataKey, TableAuditLogsDataLabel>[] = [
        {
            key: tableAuditLogsDataKeys.createdAt,
            label: tableAuditLogsDataLabels.createdAt,
            type: tableColumnTypes.date,
            align: tableColumnAligns.left,
        },

        {
            key: tableAuditLogsDataKeys.action,
            label: tableAuditLogsDataLabels.action,
            type: tableColumnTypes.string,
            align: tableColumnAligns.left,
        },
        {
            key: tableAuditLogsDataKeys.resourceName,
            label: tableAuditLogsDataLabels.resourceName,
            type: tableColumnTypes.string,
            align: tableColumnAligns.left,
        },
        {
            key: tableAuditLogsDataKeys.ip,
            label: tableAuditLogsDataLabels.ip,
            type: tableColumnTypes.string,
            align: tableColumnAligns.left,
        },
        {
            key: tableAuditLogsDataKeys.userAgent,
            label: tableAuditLogsDataLabels.userAgent,
            type: tableColumnTypes.string,
            align: tableColumnAligns.left,
        },
    ];

    return columns;
}
