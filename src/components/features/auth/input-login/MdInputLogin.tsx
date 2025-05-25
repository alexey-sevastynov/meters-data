import styles from "./inputLogin.module.scss";
import { isValidLoginInput } from "@/components/features/auth/input-login/inputLogin.funcs";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getIconColorByTheme } from "@/helpers/theme/get-icon-color";

interface InputLoginProps {
    labelText: "Email" | "Password";
    value: string;
    setValue: (value: string) => void;
    isError: boolean;
}

export function MdInputLogin({ labelText = "Email", value, setValue, isError }: InputLoginProps) {
    const theme = useTheme();
    const type = labelText.toLowerCase();
    const placeholder = `Input ${type}...`;
    const errorMessage = `Wrong ${type} !`;
    const showIcon = value.length > 0;
    const iconColor = isValidLoginInput(value)
        ? colorNames.green
        : getIconColorByTheme(colorNames.lightRed, colorNames.red, theme.themeMode);

    return (
        <div className={styles.root}>
            <label htmlFor={labelText}>{labelText}</label>
            <div className={styles.inputBox}>
                <input
                    id={labelText}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {showIcon && (
                    <MdIcon
                        name={isValidLoginInput(value) ? iconNames.check : iconNames.close}
                        size={iconSizes.medium}
                        color={iconColor}
                    />
                )}
            </div>

            {isError && !isValidLoginInput(value) && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
}
