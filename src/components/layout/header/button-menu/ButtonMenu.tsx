import React from "react";
import Style from "./buttonMenu.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface ButtonMenuProps {
    isShowMenu: boolean;
    openMenu: VoidFuncNoParam;
    closeMenu: VoidFuncNoParam;
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
