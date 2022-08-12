import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect } from "react";
import Contact from "./components/Contact/Contact";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactDialog from "./components/ContactDialog/ContactDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getContacts, selectContacts } from "./utils/contactsSlice";
import { open } from "./components/ContactDialog/contactDialogSlice";
import { selectAuth } from "../auth/utils/authSlice";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { value: contacts, status } = useAppSelector(selectContacts);

  const { token } = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const isLoading = status === "loading";

  return (
    <>
      {token ? '' : <Navigate to={"/auth/login"} />}
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
          fontWeight={"500"}
          textAlign={"center"}
        >
          Contacts
        </Typography>
        <Button onClick={() => dispatch(open(undefined))} variant="contained">
          <AddBoxIcon fontSize="large" />
        </Button>
        <Box>
          {contacts.map((contact) => (
            <Contact contact={contact} key={nanoid()} />
          ))}
        </Box>
        <ContactDialog />
      </Container>
    </>
  );
}
