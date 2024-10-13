import React from "react";
import Style from "./inputLogin.module.scss";
import { getIconUrl } from "@/helpers/getIconUrl";

interface InputLoginProps {
  labelText: "Email" | "Password";
  value: string;
  setValue: (value: string) => void;
  isError: boolean;
}

export const InputLogin: React.FC<InputLoginProps> = ({
  labelText = "Email",
  value,
  setValue,
  isError,
}) => {
  const email = import.meta.env.VITE_EMAIL;
  const password = import.meta.env.VITE_PASSWORD;
  const isAuth = value === email || value === password;

  const type = labelText.toLowerCase();
  const errorMessage = `wrong ${type} !`;
  const placeholder = `Input ${type}...`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const iconIndicatorInput = isAuth ? (
    <img src={getIconUrl("ok.png")} alt="ok" width={19.5} height={19.5} />
  ) : (
    <img src={getIconUrl("close.png")} alt="ok" width={19.5} height={19.5} />
  );

  const showIconInsicatorInput = value.length > 0 && iconIndicatorInput;

  return (
    <div className={Style.inputLogin}>
      <label htmlFor={labelText}>{labelText}</label>
      <div className={Style.input}>
        <input
          id={labelText}
          className={isAuth ? Style.inputTrue : ""}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        {showIconInsicatorInput}
      </div>

      {isError &&
        (isAuth || <p className={Style.errorMessage}>{errorMessage}</p>)}
    </div>
  );
};
