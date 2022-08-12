import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./app/routes";
import CssBaseline from '@mui/material/CssBaseline';

const container = document.getElementById("root")!;
const root = createRoot(container);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

root.render(
  <ThemeProvider theme={darkTheme}>
    <React.StrictMode>
      <Provider store={store}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
