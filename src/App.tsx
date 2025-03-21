import { useRoutes } from "react-router-dom";
import { createPortal } from "react-dom";
import routes from "@/routes";
import { MdLogin } from "@/components/features/auth/login/MdLogin";
import { useAppSelector } from "@/redux/hook";
import { MdConfirm } from "@/components/shared/confirm/MdConfirm";

const mountElement = document.getElementById("auth")!;
const confirmWindowPopup = document.getElementById("popup")!;

function App() {
  const pages = useRoutes(routes);

  const isAuth = useAppSelector((props) => props.auth.isAuth);
  const isOpenPopup = useAppSelector((props) => props.confirm.isOpen);
  const messagePopup = useAppSelector((props) => props.confirm.message);

  return (
    <main>
      {createPortal(!isAuth && <MdLogin />, mountElement)}

      {createPortal(
        isOpenPopup && <MdConfirm question={messagePopup} />,
        confirmWindowPopup
      )}
      <div className={isOpenPopup ? "blur active" : ""}>{isAuth && pages}</div>
    </main>
  );
}

export default App;
