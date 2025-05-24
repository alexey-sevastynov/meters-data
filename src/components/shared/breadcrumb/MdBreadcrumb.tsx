import styles from "./breadcrumb.module.scss";
import { cn } from "@/lib/cn";
import { MdLink } from "@/components/ui/link/MdLink";
import { isHomeRoute, isNotLastItem } from "@/components/shared/breadcrumb/breadcrumb.function";
import { MdBreadcrumbProps } from "@/components/shared/breadcrumb/breadcrumb.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";

export function MdBreadcrumb({ items }: MdBreadcrumbProps) {
    const theme = useTheme();
    const iconColor = getBaseIconColor(theme.themeMode);

    if (!items) return null;

    return (
        <nav className={styles.breadcrumb}>
            {items.map((item, index) => {
                const isLastItem = !isNotLastItem(index, items.length);
                const linkContent = isHomeRoute(item) ? (
                    <div className={styles.homeIcon}>
                        <MdIcon name={iconNames.home} size={iconSizes.medium} color={iconColor} />
                    </div>
                ) : (
                    item.label
                );

                return (
                    <div key={item.id} className={styles.breadcrumbItem}>
                        {isLastItem ? (
                            <p className={cn(styles.link, styles.active)}>{linkContent}</p>
                        ) : (
                            <MdLink to={item.link} className={styles.link}>
                                {linkContent}
                            </MdLink>
                        )}
                        {!isLastItem && (
                            <div className={styles.separator}>
                                <MdIcon name={iconNames.circle} size={iconSizes.tiny} color={iconColor} />
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
