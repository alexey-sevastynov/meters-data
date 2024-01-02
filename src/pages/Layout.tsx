import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { NavMenu } from "../components/NavMenu/NavMenu";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Header />
      <NavMenu />
      <Outlet />
    </>
  );
};

export default Layout;
