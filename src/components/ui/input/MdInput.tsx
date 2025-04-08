import { ChangeEvent } from "react";
import Styles from "./input.module.scss";
import { InputType, inputTypes } from "@/components/ui/input/input.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getInputFieldClass } from "@/components/ui/input/MdInput.funcs";

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
    isEdit = false,
}: MdInputProps) {
    const isModified = value !== defaultValue;

    return (
        <div className={Styles.input}>
            {label && <label>{label}:</label>}

            <div className={Styles.inputContainer}>
                <input
                    className={getInputFieldClass(isEdit)}
                    type={type}
                    value={value}
                    onChange={onChange}
                    {...(type === inputTypes.number && { step: 0.1, min: 0 })}
                />
                {isModified && onReset && (
                    <button className={Styles.close} onClick={onReset} type="button">
                        <MdIcon name={iconNames.close} color={colorNames.red} size={iconSizes.medium} />
                    </button>
                )}
            </div>
        </div>
    );
}
