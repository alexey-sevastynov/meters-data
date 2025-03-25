import React, { HTMLAttributes } from "react";
import Styles from "./select.module.scss";
import { UtilityPrice } from "@/store/models/utility-price";

interface MdSelectProps extends HTMLAttributes<HTMLSelectElement> {
    children?: string;
    options: UtilityPrice[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function MdSelect({ children = "Add category", options, value, onChange, ...props }: MdSelectProps) {
    return (
        <div className={Styles.select}>
            <label>{children}:</label>
            <select value={value} onChange={onChange} {...props}>
                {options.map((option) => (
                    <option key={option._id}>{option.category}</option>
                ))}
            </select>
        </div>
    );
}
