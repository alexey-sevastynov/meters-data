import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { createPortal } from "react-dom";
import { Login } from "./components/Login/Login";
import { useAppSelector } from "./redux/hook";
import { Confirm } from "./components/Confirm/Confirm";

const mountElement = document.getElementById("auth")!;
const confirmWindowPopup = document.getElementById("popup")!;

function App() {
  const pages = useRoutes(routes);

  const isAuth = useAppSelector((props) => props.auth.isAuth);
  const isOpenPopup = useAppSelector((props) => props.confirm.isOpen);
  const messagePopup = useAppSelector((props) => props.confirm.message);

  return (
    <main>
      {createPortal(!isAuth && <Login />, mountElement)}

      {createPortal(
        isOpenPopup && <Confirm question={messagePopup} />,
        confirmWindowPopup
      )}
      <div className={isOpenPopup ? "blur active" : ""}>{isAuth && pages}</div>
    </main>
  );
}

export default App;
