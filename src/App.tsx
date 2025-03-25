import { useRoutes } from "react-router-dom";
import { createPortal } from "react-dom";
import routes from "@/routes";
import { MdAuth } from "@/components/features/auth/MdAuth";
import { useAppSelector } from "@/store/hook";
import { MdConfirm } from "@/components/shared/confirm/MdConfirm";

const mountElement = document.getElementById("auth")!;
const confirmWindowPopup = document.getElementById("popup")!;

function App() {
    const pages = useRoutes(routes);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const isOpenPopup = useAppSelector((state) => state.confirm.isOpen);
    const messagePopup = useAppSelector((state) => state.confirm.message);

    return (
        <main>
            {createPortal(!isAuth && <MdAuth />, mountElement)}

            {createPortal(isOpenPopup && <MdConfirm question={messagePopup} />, confirmWindowPopup)}
            <div className={isOpenPopup ? "blur active" : ""}>{isAuth && pages}</div>
        </main>
    );
}

export default App;
