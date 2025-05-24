import { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hook";
import { logIn } from "@/store/slices/auth-slice";
import { MdInputLogin } from "@/components/features/auth/input-login/MdInputLogin";
import { MdButtonLogin } from "@/components/features/auth/button-login/MdButtonLogin";
import { isValidCredentials } from "@/components/features/auth/auth.funcs";
import { getImageUrl } from "@/helpers/assets/get-image-url";

export function MdAuth() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, isSetError] = useState(false);

    const tryLogIn = () => {
        if (isValidCredentials(email, password)) {
            dispatch(logIn());
            isSetError(false);
        } else {
            isSetError(true);
        }
    };

    return (
        <section
            className={styles.loginPage}
            style={{ backgroundImage: `url(${getImageUrl("background-main.png")})` }}
        >
            <div className={styles.login}>
                <h3>Sign in to your account</h3>
                <MdInputLogin labelText="Email" value={email} setValue={setEmail} isError={isError} />
                <MdInputLogin
                    labelText="Password"
                    value={password}
                    setValue={setPassword}
                    isError={isError}
                />

                <MdButtonLogin onClick={tryLogIn} />
                <footer>
                    <p>Need help? Contact the developer:</p>
                    <Link to={"mailto:mail@alexeseva94@gmail.com"} className={styles.link}>
                        alexeseva94@gmail.com
                    </Link>
                </footer>
            </div>
        </section>
    );
}
