import React from "react";

import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { NavMenu } from "../components/NavMenu/NavMenu";
import useAdaptiveScreen from "../hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "../constants";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.LAPTOP });
  return (
    <>
      <Header />
      {!isMobileView && <NavMenu />}
      <Outlet />
    </>
  );
};

export default Layout;
