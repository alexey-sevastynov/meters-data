import { useRoutes } from "react-router-dom";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import routes from "@/routes";
import { MdAuth } from "@/components/features/auth/MdAuth";
import { useAppSelector } from "@/store/hook";
import { MdConfirm } from "@/components/shared/confirm/MdConfirm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/lib/toast-custom.scss";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { themeModes } from "@/components/context/theme-provider/theme-provider-types";

const mountElement = document.getElementById("auth")!;
const confirmWindowPopup = document.getElementById("popup")!;

function App() {
    const theme = useTheme();
    const pages = useRoutes(routes);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const isOpenPopup = useAppSelector((state) => state.confirm.isOpen);
    const messagePopup = useAppSelector((state) => state.confirm.message);

    return (
        <main className={cn(theme.isDarkMode && themeModes.dark)}>
            {createPortal(!isAuth && <MdAuth />, mountElement)}

            {createPortal(isOpenPopup && <MdConfirm question={messagePopup} />, confirmWindowPopup)}
            <div className={cn(isOpenPopup && "blur active")}>{isAuth && pages}</div>

            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme.themeMode}
            />
        </main>
    );
}

export default App;
