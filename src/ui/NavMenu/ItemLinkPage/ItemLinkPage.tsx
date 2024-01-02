import React, { Children } from "react";
import Styles from "./itemLinkPage.module.scss";
import { NavLink } from "react-router-dom";
import { getIconUrl } from "../../../helpers/getIconUrl";

interface ItemLinkPageProps {
  link: string;
  imageName: string;
  id: string;
  children: string;
}

export const ItemLinkPage: React.FC<ItemLinkPageProps> = ({
  link,
  imageName,
  id,
  children,
}) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? Styles.active : Styles.itemLinkPage
        }
      >
        <img src={getIconUrl(imageName)} alt={id} width={30} height={30} />
        <p className={Styles.text}>{children}</p>
      </NavLink>
    </li>
  );
};
