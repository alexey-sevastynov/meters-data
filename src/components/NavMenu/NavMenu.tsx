import React, { useEffect } from "react";
import Styles from "./navMenu.module.scss";
import { ListLinks } from "../../ui/NavMenu/ListLinks/ListLinks";
import { AuthPanel } from "../../ui/Header";

interface NavMenuProps {
  closeMenu: () => void;
  isShowMenu: boolean;
}

export const NavMenu: React.FC<NavMenuProps> = ({ closeMenu, isShowMenu }) => {
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
};
