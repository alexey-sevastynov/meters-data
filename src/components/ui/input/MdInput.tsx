import { ChangeEvent } from "react";
import Styles from "./input.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";
import { InputType, inputTypes } from "./input.type";

interface MdInputProps<T = number | string> {
    value: T;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
    type?: InputType;
    defaultValue?: T;
    label?: string;
    placeholder?: string;
    isEdit?: boolean;
}

export function MdInput({
    defaultValue = 0,
    label,
    value,
    onChange,
    onReset,
    type = inputTypes.number,
    isEdit,
}: MdInputProps) {
    const isModified = value !== defaultValue;

    return (
        <div className={Styles.input}>
            {label && <label>{label}:</label>}
            <input
                className={`${isEdit ? "bg-lightGreen" : "bg-mint focus:bg-mint"}`}
                type={type}
                value={value}
                onChange={onChange}
                {...(type === inputTypes.number && { step: 0.01, min: 0 })}
            />
            {isModified && onReset && (
                <button className={Styles.close} onClick={onReset} type="button">
                    <img src={getIconUrl("close.png")} alt="close" width={16} height={16} />
                </button>
            )}
        </div>
    );
}
