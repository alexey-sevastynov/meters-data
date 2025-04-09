import { ChangeEvent } from "react";
import Styles from "./input.module.scss";
import { InputType, inputTypes } from "@/components/ui/input/input.type";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getInputFieldClass, getNumberInputProps } from "@/components/ui/input/MdInput.funcs";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

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
                    {...getNumberInputProps(type, step)}
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
