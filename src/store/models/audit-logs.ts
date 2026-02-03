import { AuditHttpMethod } from "@/enums/audit-http-methods";
import { WithObjectId } from "@/types/with-object-id";

export interface AuditLogWithObjectId extends AuditLog, WithObjectId {}

export interface AuditLog<T = object> {
    resourceName: string;
    action: AuditHttpMethod;
    resourceId?: string;
    oldValue?: T;
    newValue?: T;
    ip?: string;
    userAgent?: string;
    createdAt?: string;
    updatedAt?: string;
}
