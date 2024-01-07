import React, { ButtonHTMLAttributes } from "react";
import Styles from "./button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={Styles.button} {...props}>
      {children}
    </button>
  );
};
