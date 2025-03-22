import Styles from "./breadcrumb.module.scss";
import { colors } from "@/constants/colors";
import MdLink from "@/components/ui/link/MdLink";
import {
  isHomeRoute,
  isNotLastItem,
} from "@/components/shared/breadcrumb/breadcrumb.function";
import { MdBreadcrumbProps } from "@/components/shared/breadcrumb/breadcrumb.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";

export function MdBreadcrumb({ items }: MdBreadcrumbProps) {
  if (!items) return null;

  return (
    <nav className={Styles.breadcrumb}>
      {items.map((item, index) => {
        const isLastItem = !isNotLastItem(index, items.length);
        const linkContent = isHomeRoute(item) ? (
          <MdIcon
            name={iconNames.home}
            size={iconSizes.medium}
            color={colors.black}
            className={Styles.homeIcon}
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
              <MdIcon
                name={iconNames.circle}
                size={iconSizes.tiny}
                color={colors.green}
                className={Styles.separator}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
