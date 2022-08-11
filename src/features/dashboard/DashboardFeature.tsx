import {
  Box,
  Button,
  CircularProgress,
  Container,
  Hidden,
  LinearProgress,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { ContactsService } from "./utils/ContactsService";
import { IContact, IContactDTO } from "./utils/types";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactDialog from "./components/ContactDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addContact, getContacts, selectContacts } from "./utils/contactsSlice";

export default function Dashboard() {
  // const [contacts, setContacts] = useState<IContact[]>([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IContactDTO) => {
    dispatch(addContact(data));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getContacts())
  }, []);


  const handleEditContact = (contact: IContact) => {
    console.log("hello", contact);
  };

  const handleRemoveContact = (id: number) => {
    console.log("hey", id);
  };

  const dispatch = useAppDispatch();

  const {value: contacts, status} = useAppSelector(selectContacts);

  return (
    <>
      <LinearProgress color="info" sx={status === 'loading' ? {} : {visibility: "hidden"}}/>
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
        <Button onClick={() => setOpen(true)} variant="contained">
          <AddBoxIcon fontSize="large" />
        </Button>
        <Box>
          {contacts.map((contact) => (
            <Contact
              handleEdit={handleEditContact}
              handleRemove={handleRemoveContact}
              contact={contact}
              key={nanoid()}
            />
          ))}
        </Box>
        <ContactDialog
          open={open}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      </Container>
    </>
  );
}
