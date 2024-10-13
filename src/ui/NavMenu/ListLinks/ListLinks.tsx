import React from "react";
import Styles from "./listLinks.module.scss";
import { selectTranslations } from "@/redux/slices/I18next";
import { LIST_NAV } from "@/constants";
import { ItemLinkPage } from "../ItemLinkPage/ItemLinkPage";
import { useAppSelector } from "@/redux/hook";

interface ListLinksProps {
  closeMenu: () => void;
}

export const ListLinks: React.FC<ListLinksProps> = ({ closeMenu }) => {
  const lang = useAppSelector(selectTranslations);
  return (
    <ul className={Styles.listLinks}>
      {LIST_NAV.map(({ link, id, imageName, key }) => (
        <ItemLinkPage
          key={id}
          link={link}
          id={id}
          imageName={imageName}
          onClick={closeMenu}
        >
          {lang.navigation[key]}
        </ItemLinkPage>
      ))}
    </ul>
  );
};
