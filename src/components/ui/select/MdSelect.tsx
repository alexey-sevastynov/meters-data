import React, { HTMLAttributes } from "react";
import styles from "./select.module.scss";
import { UtilityPrice } from "@/store/models/utility-price";

interface MdSelectProps extends HTMLAttributes<HTMLSelectElement> {
    labelText: string;
    options: UtilityPrice[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function MdSelect({ labelText, options, value, onChange, ...props }: MdSelectProps) {
    return (
        <div className={styles.select}>
            <label>{labelText}:</label>
            <select value={value} onChange={onChange} {...props}>
                {options.map((option) => (
                    <option key={option._id}>{option.category}</option>
                ))}
            </select>
        </div>
    );
}
