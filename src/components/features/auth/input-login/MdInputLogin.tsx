import React from "react";
import Style from "./inputLogin.module.scss";
import { isValidLoginInput } from "./inputLogin.funcs";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";

interface InputLoginProps {
    labelText: "Email" | "Password";
    value: string;
    setValue: (value: string) => void;
    isError: boolean;
}

export function MdInputLogin({ labelText = "Email", value, setValue, isError }: InputLoginProps) {
    const type = labelText.toLowerCase();
    const errorMessage = `wrong ${type} !`;
    const placeholder = `Input ${type}...`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const iconIndicatorInput = isValidLoginInput(value) ? (
        <MdIcon name={iconNames.check} size={iconSizes.medium} color={colorNames.green} />
    ) : (
        <MdIcon name={iconNames.close} size={iconSizes.medium} color={colorNames.red} />
    );

    const showIconIndicatorInput = value.length > 0 && iconIndicatorInput;

    return (
        <div className={Style.inputLogin}>
            <label htmlFor={labelText}>{labelText}</label>
            <div className={Style.input}>
                <input
                    id={labelText}
                    className={isValidLoginInput(value) ? Style.inputTrue : ""}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                {showIconIndicatorInput}
            </div>

            {isError && (isValidLoginInput(value) || <p className={Style.errorMessage}>{errorMessage}</p>)}
        </div>
    );
}
