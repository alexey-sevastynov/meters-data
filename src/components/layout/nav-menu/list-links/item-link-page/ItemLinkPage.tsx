import Styles from "./itemLinkPage.module.scss";
import { NavLink, NavLinkProps } from "react-router-dom";
import { getIconUrl } from "@/helpers/get-icon-url";

interface ItemLinkPageProps extends Omit<NavLinkProps, "to"> {
    link: string;
    imageName: string;
    id: string;
    children: string;
}

export function ItemLinkPage({ link, imageName, id, children, ...props }: ItemLinkPageProps) {
    return (
        <li>
            <NavLink
                to={link}
                className={({ isActive }) => (isActive ? Styles.active : Styles.itemLinkPage)}
                {...props}
            >
                <img src={getIconUrl(imageName)} alt={id} width={30} height={30} />
                <p className={Styles.text}>{children}</p>
            </NavLink>
        </li>
    );
}
