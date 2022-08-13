import {
  Box,
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useState } from "react";
import Contact from "./components/Contact/Contact";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactDialog from "./components/ContactDialog/ContactDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getContacts, selectContacts } from "./utils/contactsSlice";
import { open } from "./components/ContactDialog/contactDialogSlice";
import { removeToken, selectAuth } from "../auth/utils/authSlice";
import { Navigate } from "react-router-dom";
import { handleAuthError } from "./utils/handleAuthError";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { value: contacts, status } = useAppSelector(selectContacts);

  const [search, setSearch] = useState("");

  const { token } = useAppSelector(selectAuth);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = useCallback((pattern?: string) => {
    dispatch(getContacts(pattern ?? ''))
      .unwrap()
      .catch(handleAuthError(dispatch, removeToken));
  }, []);

  const isLoading = status === "loading";

  return (
    <>
      {token ? "" : <Navigate to={"/auth/login"} />}
      <LinearProgress
        color="info"
        sx={{
          visibility: isLoading ? "visible" : "hidden",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
        }}
      />
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          component="h1"
          fontSize={"2.5rem"}
          fontWeight={"600"}
          textAlign={"center"}
          sx={{ my: "1rem" }}
        >
          Contacts
        </Typography>
        <Button
          sx={{ mb: "0.5rem" }}
          onClick={() => dispatch(open(undefined))}
          variant="contained"
        >
          <AddBoxIcon fontSize="large" />
        </Button>
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box sx={{display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mt: "0.5rem", flexGrow: '1' }}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
            <Button sx={{height: '80%'}} onClick={() => loadContacts(search)} variant="contained">Search</Button>
          </Box>

          {contacts.map((contact) => (
            <Contact contact={contact} key={nanoid()} />
          ))}
        </Box>
        <ContactDialog />
      </Container>
    </>
  );
}
