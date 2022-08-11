import { Box, Button, CircularProgress, Container, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { ContactsService } from "./utils/ContactsService";
import { IContact, IContactDTO } from "./utils/types";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactDialog from "./components/ContactDialog";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addContact, selectContacts } from "./utils/contactsSlice";

const service = new ContactsService();

export default function Dashboard() {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IContactDTO) => {
    dispatch(addContact(data));
    setOpen(false);
  };

  useEffect(() => {
    service.getContacts().then((response) => {
      setContacts(response.data);
    });
  }, []);

  const handleEditContact = (contact: IContact) => {
    console.log("hello", contact);
  };

  const handleRemoveContact = (id: number) => {
    console.log("hey", id);
  };

  const dispatch = useAppDispatch();

  const contactsSelector = useAppSelector(selectContacts);

  return (
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
  );
}
