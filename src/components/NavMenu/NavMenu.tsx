import React from "react";
import Styles from "./navMenu.module.scss";
import { ListLinks } from "../../ui/NavMenu/ListLinks/ListLinks";

export const NavMenu = () => {
  return (
    <nav className={Styles.navMenu}>
      <ListLinks />
    </nav>
  );
};
