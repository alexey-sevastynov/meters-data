import { forwardRef } from "react";
import Styles from "./button.module.scss";
import { ButtonProps } from "./button.type";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${Styles.button} ${className || ""}`}
        {...props}
      >
        {icon && <span className={Styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
