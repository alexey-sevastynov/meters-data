export const auditHttpMethods = {
    post: "POST",
    put: "PUT",
    patch: "PATCH",
    delete: "DELETE",
} as const;

export type AuditHttpMethod = (typeof auditHttpMethods)[keyof typeof auditHttpMethods];
