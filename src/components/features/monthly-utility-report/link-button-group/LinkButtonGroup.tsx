import styles from "./linkButtonGroup.module.scss";
import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";
import { MdButton } from "@/components/ui/button/MdButton";
import { LinkButtonGroupProps } from "@/components/features/monthly-utility-report/link-button-group/linkButtonGroup.interface";
import { colorNames } from "@/enums/color-names";

export function LinkButtonGroup({ linksGroup, className }: LinkButtonGroupProps) {
    return (
        <div className={cn(styles.linkButtonGroup, className)}>
            {linksGroup.map(({ iconName, path, label }, index) => (
                <Link key={index} to={path}>
                    <MdButton iconName={iconName} color={colorNames.green}>
                        {label}
                    </MdButton>
                </Link>
            ))}
        </div>
    );
}
