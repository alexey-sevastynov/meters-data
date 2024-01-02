import React from "react";
import { getIconUrl } from "../../../helpers/getIconUrl";

export const ButtonMenu = () => {
  return (
    <button>
      <img
        src={getIconUrl("menu.png")}
        alt="menu-mobile"
        width={50}
        height={50}
      />
    </button>
  );
};
