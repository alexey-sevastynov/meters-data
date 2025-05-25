import { ChangeEvent } from "react";
import styles from "./input.module.scss";
import { InputType, inputTypes } from "@/components/ui/input/input.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getNumberInputProps } from "@/components/ui/input/MdInput.funcs";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { cn } from "@/lib/cn";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getIconColorByTheme } from "@/helpers/theme/get-icon-color";

interface MdInputProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onReset?: VoidFuncNoParam;
    type?: InputType;
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    isEdit?: boolean;
    step?: number;
}

export function MdInput({
    defaultValue,
    label,
    value,
    onChange,
    onReset,
    type = inputTypes.number,
    isEdit = false,
    step,
}: MdInputProps) {
    const theme = useTheme();
    const isModified = value !== defaultValue;

    return (
        <div className={styles.root}>
            {label && <label>{label}:</label>}

            <div className={styles.inputContainer}>
                <input
                    className={cn(isEdit && styles.inputEdit)}
                    type={type}
                    value={value}
                    onChange={onChange}
                    {...getNumberInputProps(type, step)}
                />
                {isModified && onReset && (
                    <button className={styles.close} onClick={onReset} type="button">
                        <MdIcon
                            name={iconNames.close}
                            color={getIconColorByTheme(colorNames.lightRed, colorNames.red, theme.themeMode)}
                            size={iconSizes.medium}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
