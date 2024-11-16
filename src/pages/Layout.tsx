import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { NavMenu } from "../components/NavMenu/NavMenu";
import { useAppSelector } from "../redux/hook";
import useAdaptiveScreen from "../hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "../constants";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const isOpenPopupWindow = useAppSelector((props) => props.confirm.isOpen);
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.LAPTOP });

  const openMenu = () => {
    setIsShowMenu(true);
  };
  const closeMenu = () => {
    setIsShowMenu(false);
  };

  return (
    <>
      <Header
        isShowMenu={isShowMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      {isMobileView && !isOpenPopupWindow && (
        <NavMenu
          closeMenu={closeMenu}
          isShowMenu={isShowMenu}
        />
      )}
      {!isMobileView && (
        <NavMenu
          closeMenu={closeMenu}
          isShowMenu={isShowMenu}
        />
      )}
      <Outlet />
    </>
  );
};

export default Layout;
