import { useEffect } from "react";
import Styles from "./navMenu.module.scss";
import { ListLinks } from "@/components/layout/nav-menu/list-links/ListLinks";
import { AuthPanel } from "@/components/shared/auth-panel/MdAuthPanel";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface MdNavMenuProps {
    closeMenu: VoidFuncNoParam;
    isShowMenu: boolean;
}

export function MdNavMenu({ closeMenu, isShowMenu }: MdNavMenuProps) {
    useEffect(() => {
        if (isShowMenu) {
            // Disable scrolling when menu appears
            document.body.style.overflow = "hidden";
        } else {
            // Enable scrolling when hiding menu
            document.body.style.overflow = "auto";
        }

        // Returning a function to clear the effect
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isShowMenu]);

    return (
        <nav className={`${Styles.navMenu} ${isShowMenu ? Styles.showMenu : ""} `}>
            <ListLinks closeMenu={closeMenu} />
            <div className={Styles.authMobile}>
                <AuthPanel />
            </div>
        </nav>
    );
}
