import React from "react";
import Styles from "./authPanel.module.scss";

export const AuthPanel = () => {
  return (
    <div className={Styles.authPanel}>
      <h5>Hello, alexseva94@gmail.com</h5>
      <span />
      <button>Sign out</button>
    </div>
  );
};
