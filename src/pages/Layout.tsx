import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { NavMenu } from "../components/NavMenu/NavMenu";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const openMenu = () => {
    console.log("open");
    setIsShowMenu(true);
  };
  const closeMenu = () => {
    console.log("cancel");
    setIsShowMenu(false);
  };

  return (
    <>
      <Header
        isShowMenu={isShowMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      <NavMenu closeMenu={closeMenu} isShowMenu={isShowMenu} />
      <Outlet />
    </>
  );
};

export default Layout;
