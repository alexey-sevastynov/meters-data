import React from "react";
import Style from "./buttonLogin.module.scss";
import { getIconUrl } from "../../../helpers/getIconUrl";

export const ButtonLogin = ({ ...props }) => {
  return (
    <button type="button" className={Style.buttonLogin} {...props}>
      Log in
      <img
        src={getIconUrl("right-arrow.png")}
        alt="up"
        width={20}
        height={20}
      />
    </button>
  );
};
