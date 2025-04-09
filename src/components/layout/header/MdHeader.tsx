import Styles from "./header.module.scss";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";
import { MdLogo } from "@/components/shared/logo/MdLogo";
import { ButtonMenu } from "@/components/layout/header/button-menu/ButtonMenu";
import { AuthPanel } from "@/components/shared/auth-panel/MdAuthPanel";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface MdHeaderProps {
    isShowMenu: boolean;
    openMenu: VoidFuncNoParam;
    closeMenu: VoidFuncNoParam;
}

export function MdHeader({ isShowMenu, openMenu, closeMenu }: MdHeaderProps) {
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.xl });

    return (
        <header className={`${Styles.header} ${!isShowMenu ? Styles.headerBackground : ""}`}>
            <MdLogo />
            {isMobileView ? (
                <ButtonMenu isShowMenu={isShowMenu} openMenu={openMenu} closeMenu={closeMenu} />
            ) : (
                <AuthPanel />
            )}
        </header>
    );
}
