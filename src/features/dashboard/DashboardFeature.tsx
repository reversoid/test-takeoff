import { Box, Button, Container, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { ContactsService } from "./utils/ContactsService";
import { IContact } from "./utils/types";
import AddBoxIcon from '@mui/icons-material/AddBox';

const service = new ContactsService();

export default function Dashboard() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  useEffect(() => {
    service.getContacts().then((response) => {
      setContacts(response.data);
    })
  }, [])
  
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
      <Button variant="contained"><AddBoxIcon fontSize="large"/></Button>
      <Box>
        {contacts.map((contact) => <Contact contact={contact} key={nanoid()}/>)}
      </Box>
    </Container>
  );
}
