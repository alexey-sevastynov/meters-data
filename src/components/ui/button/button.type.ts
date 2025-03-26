import { ColorName } from "@/enums/color-names";
import { ButtonHTMLAttributes } from "react";
import { IconName } from "../icon/icon-constants";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    iconName?: IconName;
    className?: ColorName;
}
