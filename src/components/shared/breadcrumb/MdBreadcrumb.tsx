import Styles from "./breadcrumb.module.scss";
import { cn } from "@/lib/cn";
import { colorNames } from "@/enums/color-names";
import { MdLink } from "@/components/ui/link/MdLink";
import { isHomeRoute, isNotLastItem } from "@/components/shared/breadcrumb/breadcrumb.function";
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
                    <div className={Styles.homeIcon}>
                        <MdIcon name={iconNames.home} size={iconSizes.medium} color={colorNames.black} />
                    </div>
                ) : (
                    item.label
                );

                return (
                    <div key={item.id} className={Styles.breadcrumbItem}>
                        {isLastItem ? (
                            <p className={cn(Styles.link, Styles.active)}>{linkContent}</p>
                        ) : (
                            <MdLink to={item.link} className={Styles.link}>
                                {linkContent}
                            </MdLink>
                        )}
                        {!isLastItem && (
                            <div className={Styles.separator}>
                                <MdIcon
                                    name={iconNames.circle}
                                    size={iconSizes.tiny}
                                    color={colorNames.green}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
