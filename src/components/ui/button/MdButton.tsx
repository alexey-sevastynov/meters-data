import { forwardRef } from "react";
import Styles from "./button.module.scss";
import { ButtonProps } from "./button.type";
import { MdIcon } from "../icon/MdIcon";
import { colorNames } from "@/enums/color-names";

export const MdButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, iconName, className, color = colorNames.green, ...props }, ref) => {
        const colorStyles = `bg-${color} hover:bg-${color} active:bg-${color}`;

        return (
            <button ref={ref} className={`${Styles.button} ${className || ""} ${colorStyles}`} {...props}>
                {iconName && <MdIcon name={iconName} />}
                {children}
            </button>
        );
    }
);

MdButton.displayName = "MdButton";
