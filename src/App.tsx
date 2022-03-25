import "antd/dist/antd.css";
import { useRoutes } from "react-router-dom";

import { routes } from "routes/routes.routes";
import "styles/index.scss";

function App() {
  const element = useRoutes(routes);
  return <div className="App">{element}</div>;
}

export default App;
