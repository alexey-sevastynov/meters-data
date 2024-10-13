import React from "react";
import { FaCircle } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { COLORS } from "@/constants";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import Link from "@/components/Link/Link";
import Styles from "./breadcrumb.module.scss";
import { isHomeRoute, isNotLastItem } from "./breadcrumb.function";
import { BreadcrumbProps } from "./breadcrumb.type";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
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
              <Link
                to={item.link}
                className={Styles.link}
              >
                {linkContent}
              </Link>
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
};
