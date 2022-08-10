import { Box, Button, Container, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { ContactsService } from "./utils/ContactsService";
import { DialogTypes, IContact, IContactDTO } from "./utils/types";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ContactDialog from "./components/ContactDialog";

const service = new ContactsService();

export default function Dashboard() {
  const [contacts, setContacts] = useState<IContact[]>([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IContactDTO) => {
    console.log(data);
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
