import { nanoid } from "nanoid";
import { Navigate, Route } from "react-router-dom";
import App from "../App";
import Dashboard from "../features/dashboard/Dashboard";

const _routes = [
  {
    path: "auth",
    element: <App />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to={"dashboard"} />,
  },
];

export const routes = _routes.map(({path, element}) => <Route path={path} element={element} key={nanoid()}></Route>)


