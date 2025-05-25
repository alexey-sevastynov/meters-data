import styles from "./header.module.scss";
import { MdLogo } from "@/components/shared/logo/MdLogo";
import { AuthPanel } from "@/components/shared/auth-panel/MdAuthPanel";

export function MdHeader() {
    return (
        <header className={styles.root}>
            <MdLogo />
            <AuthPanel />
        </header>
    );
}
