import styles from "./errorMessage.module.scss";

interface ErrorMessageProps {
    message: string;
}

export function MdErrorMessage({ message }: ErrorMessageProps) {
    return (
        <div className={styles.root}>
            <p className={styles.message}>{message}</p>
        </div>
    );
}
