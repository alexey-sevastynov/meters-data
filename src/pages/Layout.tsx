import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MdHeader } from "@/components/layout/header/MdHeader";
import { MdNavMenu } from "@/components/layout/nav-menu/MdNavMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "@/constants";
import { fetchAllAddressData } from "@/redux/slices/AddressDataSlice";

interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const dispatch = useAppDispatch();
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const isOpenPopupWindow = useAppSelector((props) => props.confirm.isOpen);
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.LAPTOP });

  useEffect(() => {
    dispatch(fetchAllAddressData());
  }, []);

  const openMenu = () => {
    setIsShowMenu(true);
  };
  const closeMenu = () => {
    setIsShowMenu(false);
  };

  return (
    <>
      <MdHeader
        isShowMenu={isShowMenu}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      {isMobileView && !isOpenPopupWindow && (
        <MdNavMenu
          closeMenu={closeMenu}
          isShowMenu={isShowMenu}
        />
      )}
      {!isMobileView && (
        <MdNavMenu
          closeMenu={closeMenu}
          isShowMenu={isShowMenu}
        />
      )}
      <Outlet />
    </>
  );
};

export default Layout;
