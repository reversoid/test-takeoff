import { nanoid } from "nanoid";
import { Navigate, Route } from "react-router-dom";
import { IRoute } from "../../app/types";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

const _routes: IRoute[] = [
    {
      path: "login",
      element: <LoginPage/>,
    },
    {
      path: "registration",
      element: <RegistrationPage />,
    },
    {
      path: "*",
      element: <Navigate to={"login"} />,
    },
  ];
  
  export const routes = _routes.map(({path, element}) => <Route path={path} element={element} key={nanoid()}></Route>)