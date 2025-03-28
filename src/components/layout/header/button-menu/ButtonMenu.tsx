import React from "react";
import Style from "./buttonMenu.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";

interface ButtonMenuProps {
    isShowMenu: boolean;
    openMenu: () => void;
    closeMenu: () => void;
}

export const ButtonMenu: React.FC<ButtonMenuProps> = ({ isShowMenu, openMenu, closeMenu }) => {
    return (
        <div className={Style.buttonMenu}>
            {isShowMenu ? (
                <button onClick={closeMenu}>
                    <img src={getIconUrl("close.png")} alt="menu-mobile" width={50} height={50} />
                </button>
            ) : (
                <button onClick={openMenu}>
                    <img src={getIconUrl("menu.png")} alt="close-menu-mobile" width={50} height={50} />
                </button>
            )}
        </div>
    );
};
