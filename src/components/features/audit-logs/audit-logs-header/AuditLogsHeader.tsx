import styles from "./auditLogsHeader.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

export function MdAuditLogsHeader() {
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.root}>
            <h2>{translations.auditLogs.title}</h2>
            <p className={styles.description}>{translations.auditLogs.description}</p>
        </div>
    );
}
