import { FaCircle } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { COLORS } from "@/constants";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import MdLink from "@/components/ui/link/MdLink";
import Styles from "./breadcrumb.module.scss";
import { isHomeRoute, isNotLastItem } from "./breadcrumb.function";
import { MdBreadcrumbProps } from "./breadcrumb.type";

export function MdBreadcrumb({ items }: MdBreadcrumbProps) {
  if (!items) return null;

  return (
    <nav className={Styles.breadcrumb}>
      {items.map((item, index) => {
        const isLastItem = !isNotLastItem(index, items.length);
        const linkContent = isHomeRoute(item) ? (
          <GoHome
            className={Styles.homeIcon}
            size={SIZE_ICONS.medium}
          />
        ) : (
          item.label
        );

        return (
          <div
            key={item.id}
            className={Styles.breadcrumbItem}
          >
            {isLastItem ? (
              <p className={`${Styles.link} ${Styles.active}`}>{linkContent}</p>
            ) : (
              <MdLink
                to={item.link}
                className={Styles.link}
              >
                {linkContent}
              </MdLink>
            )}
            {!isLastItem && (
              <FaCircle
                className={Styles.separator}
                color={COLORS.green}
                size={SIZE_ICONS.tiny}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
