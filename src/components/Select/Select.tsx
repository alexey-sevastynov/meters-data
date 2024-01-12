import React, { HTMLAttributes } from "react";
import Styles from "./select.module.scss";
import { TypeListUtylityPrices } from "../../types/constants";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  children?: string;
  options: TypeListUtylityPrices;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  children = "Add category",
  options,
  value,
  onChange,
  ...props
}) => {
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
};
