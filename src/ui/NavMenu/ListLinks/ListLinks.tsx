import React from "react";
import Styles from "./listLinks.module.scss";
import { LIST_NAV } from "../../../constants";
import { ItemLinkPage } from "../ItemLinkPage/ItemLinkPage";

export const ListLinks = () => {
  return (
    <div className={Styles.listLinks}>
      {LIST_NAV.map(({ link, id, imageName }) => (
        <ItemLinkPage link={link} id={id} imageName={imageName}>
          {id}
        </ItemLinkPage>
      ))}
    </div>
  );
};
