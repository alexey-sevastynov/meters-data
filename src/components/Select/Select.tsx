import React, { HTMLAttributes } from "react";
import Styles from "./select.module.scss";
import { TypeListUtylityPrices } from "../../types/constants";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  children?: string;
  options: TypeListUtylityPrices;
}

export const Select: React.FC<SelectProps> = ({
  children = "Add category",
  options,
  ...props
}) => {
  return (
    <div className={Styles.select}>
      <label>{children}:</label>
      <select {...props}>
        {options.map((option) => (
          <option key={option.id}>{option.category}</option>
        ))}
      </select>
    </div>
  );
};
