import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { createPortal } from "react-dom";
import { Login } from "./components/Login/Login";
import { useAppSelector } from "./redux/hook";

const mountElement = document.getElementById("auth")!;

function App() {
  const pages = useRoutes(routes);

  const isAuth = useAppSelector((props) => props.auth.isAuth);

  return (
    <main>
      {createPortal(!isAuth && <Login />, mountElement)}
      {isAuth && pages}
    </main>
  );
}

export default App;
