import React from "react";
import Styles from "./header.module.scss";

import { Logo, AuthPanel, ButtonMenu } from "../../ui/Header";
import useAdaptiveScreen from "../../hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "../../constants";

interface HeaderProps {
  isShowMenu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isShowMenu,
  openMenu,
  closeMenu,
}) => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.LAPTOP });

  return (
    <header
      className={`${Styles.header} ${
        !isShowMenu ? Styles.headerBackground : ""
      }`}
    >
      <Logo />
      {isMobileView ? (
        <ButtonMenu
          isShowMenu={isShowMenu}
          openMenu={openMenu}
          closeMenu={closeMenu}
        />
      ) : (
        <AuthPanel />
      )}
    </header>
  );
};
