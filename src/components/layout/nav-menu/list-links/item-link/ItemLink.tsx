import Styles from "./itemLink.module.scss";
import { NavLink } from "react-router-dom";
import { getIconUrl } from "@/helpers/get-icon-url";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { iconSizes } from "@/components/ui/icon/icon-constants";

interface ItemLinkProps {
    link: string;
    imageName: string;
    text: string;
    onClick?: VoidFuncNoParam;
}

export function ItemLink({ link, imageName, text }: ItemLinkProps) {
    return (
        <li>
            <NavLink to={link} className={({ isActive }) => (isActive ? Styles.active : Styles.itemLinkPage)}>
                <img
                    src={getIconUrl(imageName)}
                    alt={text}
                    width={iconSizes.large}
                    height={iconSizes.large}
                />
                <p className={Styles.text}>{text}</p>
            </NavLink>
        </li>
    );
}
