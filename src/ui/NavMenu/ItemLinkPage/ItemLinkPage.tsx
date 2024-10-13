import React from "react";
import Styles from "./itemLinkPage.module.scss";
import { NavLink, NavLinkProps } from "react-router-dom";
import { getIconUrl } from "@/helpers/getIconUrl";

interface ItemLinkPageProps extends Omit<NavLinkProps, "to"> {
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
  ...props
}) => {
  return (
    <li>
      <NavLink
        to={link}
        className={({ isActive }) =>
          isActive ? Styles.active : Styles.itemLinkPage
        }
        {...props}
      >
        <img src={getIconUrl(imageName)} alt={id} width={30} height={30} />
        <p className={Styles.text}>{children}</p>
      </NavLink>
    </li>
  );
};
