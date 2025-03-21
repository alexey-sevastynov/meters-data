import Styles from "./listLinks.module.scss";
import { LIST_NAV } from "@/constants";
import { ItemLinkPage } from "./item-link-page/ItemLinkPage";

interface ListLinksProps {
  closeMenu: () => void;
}

export function ListLinks({ closeMenu }: ListLinksProps) {
  return (
    <ul className={Styles.listLinks}>
      {LIST_NAV.map(({ link, id, imageName }) => (
        <ItemLinkPage
          key={id}
          link={link}
          id={id}
          imageName={imageName}
          onClick={closeMenu}
        >
          {id}
        </ItemLinkPage>
      ))}
    </ul>
  );
}
