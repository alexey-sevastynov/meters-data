import React from "react";
import Styles from "./header.module.scss";

import { Logo, AuthPanel, ButtonMenu } from "../../ui/Header";
import useAdaptiveScreen from "../../hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "../../constants";

export const Header = () => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.TABLET });

  return (
    <header className={Styles.header}>
      <Logo />
      {isMobileView ? <ButtonMenu /> : <AuthPanel />}
    </header>
  );
};
