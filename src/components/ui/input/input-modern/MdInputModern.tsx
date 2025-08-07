import { ChangeEvent } from "react";
import styles from "./inputModern.module.scss";
import { cn } from "@/lib/cn";
import { InputType, inputTypes } from "@/components/ui/input/input.type";
import { getNumberInputProps } from "@/components/ui/input/MdInput.funcs";
import { VoidFunc } from "@/types/getter-setter-functions";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { IconName } from "@/components/ui/icon/icon-constants";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";

interface MdInputProps {
    value: string;
    onChange: VoidFunc<ChangeEvent<HTMLInputElement>>;
    label: string;
    iconName: IconName;
    type?: InputType;
    isEdit?: boolean;
    step?: number;
    className?: string;
}

export function MdInputModern({
    value,
    onChange,
    label,
    iconName,
    type = inputTypes.number,
    isEdit = false,
    step,
    className,
}: MdInputProps) {
    const theme = useTheme();

    return (
        <div className={cn(className, styles.root)}>
            <div className={styles.iconContainer}>
                <MdIcon name={iconName} color={getBaseIconColor(theme.themeMode)} />
            </div>
            <label className={styles.label}>{label}</label>
            <input
                className={cn(isEdit && styles.inputEdit)}
                type={type}
                value={value}
                onChange={onChange}
                {...getNumberInputProps(type, step)}
            />
        </div>
    );
}
