import { useState } from "react";
import Style from "./auth.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { logIn } from "@/redux/slices/AuthSlice";
import { MdInputLogin } from "@/components/features/auth/input-login/MdInputLogin";
import { MdButtonLogin } from "@/components/features/auth/button-login/MdButtonLogin";

export function MdAuth() {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isError, isSetError] = useState(false);

    const tryLogIn = () => {
        if (email === import.meta.env.VITE_EMAIL && password === import.meta.env.VITE_PASSWORD) {
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
                <MdInputLogin labelText="Email" value={email} setValue={setEmail} isError={isError} />
                <MdInputLogin
                    labelText="Password"
                    value={password}
                    setValue={setPassword}
                    isError={isError}
                />

                <MdButtonLogin onClick={tryLogIn} />
                <footer>
                    <p>contact with the developer ?</p>
                    <Link to={"mailto:mail@alexeseva94@gmail.com"} className={Style.link}>
                        alexeseva94@gmail.com
                    </Link>
                </footer>
            </div>
        </section>
    );
}
