import React from "react";
import Styles from "./header.module.scss";
import { Logo } from "../../ui/Logo/Logo";

export const Header = () => {
  return (
    <header className={Styles.header}>
      <Logo />
    </header>
  );
};
