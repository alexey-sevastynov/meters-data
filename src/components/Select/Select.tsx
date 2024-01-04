import React, { HTMLAttributes } from "react";
import Styles from "./select.module.scss";

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ ...props }) => {
  return (
    <div className={Styles.select}>
      <label>Price:</label>
      <select {...props}>
        <option></option>
      </select>
    </div>
  );
};
