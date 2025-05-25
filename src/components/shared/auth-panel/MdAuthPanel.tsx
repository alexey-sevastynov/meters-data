import { useRef } from "react";
import styles from "./authPanel.module.scss";
import { MdLanguageDropdown } from "@/components/shared/language-dropdown/MdLanguageDropdown";
import { MdDropdownMenu } from "@/components/shared/dropdown-menu/MdDropdownMenu";

export function AuthPanel() {
    const authPanelRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={authPanelRef} className={styles.root}>
            <MdLanguageDropdown />
            <MdDropdownMenu />
        </div>
    );
}
