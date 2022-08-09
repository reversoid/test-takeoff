import { nanoid } from "nanoid";
import { Navigate, Route } from "react-router-dom";
import { AuthFeature } from "../features/auth/AuthFeature";
import DashboardFeature from "../features/dashboard/DashboardFeature";
import { IRoute } from "./types";

const _routes: IRoute[] = [
  {
    path: "auth/*",
    element: <AuthFeature/>,
  },
  {
    path: "dashboard",
    element: <DashboardFeature />,
  },
  {
    path: "*",
    element: <Navigate to={"dashboard"} />,
  },
];

export const routes = _routes.map(({path, element}) => <Route path={path} element={element} key={nanoid()}></Route>)


