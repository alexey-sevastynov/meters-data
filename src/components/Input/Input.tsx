import React, { HTMLAttributes } from "react";
import Styles from "./input.module.scss";
import { getIconUrl } from "../../helpers/getIconUrl";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  defaultValue: number | string;
  labelText?: string;
  labelTextBold?: boolean;
  value: number | string;
  type?: string;
  setValue: (value: any) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  defaultValue = 0,
  labelText = "Price",
  labelTextBold,
  id,
  value,
  type = "number",
  setValue,

  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const returnСurrentValues = () => {
    setValue(defaultValue);
  };

  return (
    <div className={Styles.input}>
      <label
        id={labelText}
        className={labelTextBold ? Styles.labelTextBold : Styles.label}
      >
        {labelText}:
      </label>
      <input
        id={labelText}
        type={type}
        value={value}
        onChange={handleChange}
        step={0.01}
        min={0}
        {...props}
      />
      {value !== defaultValue && (
        <button className={Styles.close} onClick={returnСurrentValues}>
          <img
            src={getIconUrl("close.png")}
            alt="close"
            width={16}
            height={16}
          />
        </button>
      )}
    </div>
  );
};
