import styles from "./linkButtonGroup.module.scss";
import { cn } from "@/lib/cn";
import { LinkButtonGroupProps } from "@/components/features/monthly-utility-report/link-button-group/linkButtonGroup.interface";
import { MdNavigationCard } from "@/components/ui/navigation-card/MdNavigationCard";

export function LinkButtonGroup({ linksGroup, className }: LinkButtonGroupProps) {
    return (
        <div className={cn(styles.root, className)}>
            {linksGroup.map(({ iconName, path, label, description }, index) => (
                <MdNavigationCard
                    key={index}
                    label={label}
                    iconName={iconName}
                    link={path}
                    description={description}
                />
            ))}
        </div>
    );
}
