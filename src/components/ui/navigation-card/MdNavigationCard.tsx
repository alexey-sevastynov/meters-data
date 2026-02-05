import styles from "./navigationCard.module.scss";
import { cn } from "@/lib/cn";
import { MdLink } from "@/components/ui/link/MdLink";
import { IconName, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";

interface MdNavigationCardProps {
    label: string;
    description: string;
    iconName: IconName;
    link: string;
    className?: string;
}

export function MdNavigationCard({ label, description, iconName, link, className }: MdNavigationCardProps) {
    return (
        <MdLink className={cn(styles.root, className)} to={link} role="link" tabIndex={0}>
            <MdIcon name={iconName} size={iconSizes.large} color={colorNames.grey} />

            <div className={styles.content}>
                <h3 className={styles.title} title={label}>
                    {label}
                </h3>
                <p className={styles.description} title={description}>
                    {description}
                </p>
            </div>
        </MdLink>
    );
}
