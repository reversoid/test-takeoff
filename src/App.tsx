import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes } from "react-router-dom";
import { routes } from "./app/routes";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useAppSelector } from "./app/hooks";
import { selectContacts } from "./features/dashboard/utils/contactsSlice";
import { selectAuth } from "./features/auth/utils/authSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [alert, setAlert] = useState({ isOpen: false, text: "" });
  const { status: contactsStatus } = useAppSelector(selectContacts);
  const { status: authStatus } = useAppSelector(selectAuth);


  useEffect(() => {    
    if (authStatus === "failed") {
      setAlert({ isOpen: true, text: "Error" });
    }
  }, [authStatus]);

  useEffect(() => {    
    if (contactsStatus === "failed") {
      setAlert({ isOpen: true, text: "Error" });
    }
  }, [contactsStatus]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alert.isOpen}
        onClose={() => setAlert({ isOpen: false, text: "" })}
        message={alert.text}
        autoHideDuration={2000}
      />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>{routes}</Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
