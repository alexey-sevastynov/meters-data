import { useRef } from "react";
import Styles from "./authPanel.module.scss";
import { MdLanguageDropdown } from "@/components/shared/language-dropdown/MdLanguageDropdown";
import { MdDropdownMenu } from "@/components/shared/dropdown-menu/MdDropdownMenu";

export function AuthPanel() {
    const authPanelRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={authPanelRef} className={Styles.authPanel}>
            <MdLanguageDropdown />
            <MdDropdownMenu />
        </div>
    );
}
