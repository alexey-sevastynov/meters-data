import React, { HTMLAttributes } from "react";
import Styles from "./input.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  defaultValue: number;
  labelText?: string;
  labelTextBold?: boolean;
}

export const Input: React.FC<InputProps> = ({
  defaultValue = 0,
  labelText = "Price",
  labelTextBold,
  ...props
}) => {
  return (
    <div className={Styles.input}>
      <label className={labelTextBold ? Styles.labelTextBold : Styles.label}>
        {labelText}:
      </label>
      <input
        type="number"
        defaultValue={defaultValue}
        step={0.01}
        min={0}
        {...props}
      />
      <img src={getIconUrl("close.png")} alt="close" width={16} height={16} />
    </div>
  );
};
