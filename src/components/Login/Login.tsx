import React, { useState } from "react";
import Style from "./login.module.scss";
import { ButtonLogin, InputLogin } from "../../ui/Login";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hook";
import { logIn } from "../../redux/slices/AuthSlice";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isError, isSetError] = useState(false);

  const tryLogIn = () => {
    if (
      email === import.meta.env.VITE_EMAIL &&
      password === import.meta.env.VITE_PASSWORD
    ) {
      dispatch(logIn());
      isSetError(false);
    } else {
      isSetError(true);
    }
  };

  return (
    <section className={Style.loginPage}>
      <div className={Style.login}>
        <h3>Log in</h3>
        <InputLogin
          labelText="Email"
          value={email}
          setValue={setEmail}
          isError={isError}
        />
        <InputLogin
          labelText="Password"
          value={password}
          setValue={setPassword}
          isError={isError}
        />

        <ButtonLogin onClick={tryLogIn} />
        <footer>
          <p>contact with the developer ?</p>
          <Link to={"mailto:mail@alexeseva94@gmail.com"} className={Style.link}>
            alexeseva94@gmail.com
          </Link>
        </footer>
      </div>
    </section>
  );
};
