import React, { HTMLAttributes } from "react";
import Styles from "./input.module.scss";
import { getIconUrl } from "@/helpers/getIconUrl";

interface MdInputProps extends HTMLAttributes<HTMLInputElement> {
    value: number;
    setValue: (value: number) => void;
    defaultValue?: number;
    labelText?: string;
    labelTextBold?: boolean;
    type?: string;
    placeholder?: string;
}

export function MdInput({
    defaultValue = 0,
    labelText = "Price",
    labelTextBold,
    value,
    type = "number",
    setValue,
    ...props
}: MdInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setValue(Number(targetValue));
    };

    const returnCurrentValues = () => {
        setValue(defaultValue);
    };

    return (
        <div className={Styles.input}>
            <label id={labelText} className={labelTextBold ? Styles.labelTextBold : Styles.label}>
                {labelText}:
            </label>
            <input
                id={labelText}
                type={type}
                value={value}
                onChange={handleChange}
                step={0.01}
                min={0}
                {...props}
            />
            {value !== defaultValue && (
                <button className={Styles.close} onClick={returnCurrentValues}>
                    <img src={getIconUrl("close.png")} alt="close" width={16} height={16} />
                </button>
            )}
        </div>
    );
}
