import React, { Children } from "react";
import Styles from "./itemLinkPage.module.scss";
import { Link } from "react-router-dom";
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
    <Link to={link} className={Styles.itemLinkPage}>
      <img src={getIconUrl(imageName)} alt={id} width={30} height={30} />
      <p className={Styles.text}>{children}</p>
    </Link>
  );
};
