import { Routes } from "react-router-dom";
import { routes } from "./routes";

export function AuthFeature() {
  return (
    <>
      <Routes> {routes} </Routes>
    </>
  );
}
