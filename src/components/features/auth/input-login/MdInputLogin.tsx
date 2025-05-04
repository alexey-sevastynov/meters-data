import React from "react";
import Style from "./inputLogin.module.scss";
import { getIconUrl } from "@/helpers/assets/get-icon-url";
import { isValidLoginInput } from "./inputLogin.funcs";

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
        <img src={getIconUrl("ok.png")} alt="ok" width={19.5} height={19.5} />
    ) : (
        <img src={getIconUrl("close.png")} alt="ok" width={19.5} height={19.5} />
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
