import { ChangeEvent } from "react";
import Styles from "./input.module.scss";
import { getIconUrl } from "@/helpers/get-icon-url";
import { InputType, inputTypes } from "./input.type";

interface MdInputProps {
    value: number;
    setValue: (value: number) => void;
    type?: InputType;
    defaultValue?: number;
    label?: string;
    placeholder?: string;
    isEdit?: boolean;
}

export function MdInput({
    defaultValue = 0,
    label,
    value,
    type = inputTypes.number,
    setValue,
    isEdit,
}: MdInputProps) {
    const isModified = value !== defaultValue;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setValue(Number(targetValue));
    };

    const returnCurrentValues = () => {
        setValue(defaultValue);
    };

    return (
        <div className={Styles.input}>
            {label && <label>{label}:</label>}
            <input
                className={`${isEdit ? "bg-lightGreen" : "bg-mint focus:bg-mint"}`}
                type={type}
                value={value}
                onChange={handleChange}
                {...(type === inputTypes.number && { step: 0.01, min: 0 })}
            />
            {isModified && (
                <button className={Styles.close} onClick={returnCurrentValues}>
                    <img src={getIconUrl("close.png")} alt="close" width={16} height={16} />
                </button>
            )}
        </div>
    );
}
