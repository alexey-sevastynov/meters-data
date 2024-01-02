import React from "react";

import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const pages = useRoutes(routes);

  return <main>{pages}</main>;
}

export default App;
