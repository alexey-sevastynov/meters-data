import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import styles from "./button.module.scss";
import { ButtonProps } from "@/components/ui/button/button.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";

export const MdButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, iconName, className, disabled, color = colorNames.green, ...props }, ref) => {
        const colorStyles = !disabled && `bg-${color} hover:bg-${color} active:bg-${color}`;

        return (
            <button
                ref={ref}
                className={cn(styles.root, className, colorStyles)}
                disabled={disabled}
                {...props}
            >
                {iconName && <MdIcon name={iconName} />}
                {children}
            </button>
        );
    }
);

MdButton.displayName = "MdButton";
