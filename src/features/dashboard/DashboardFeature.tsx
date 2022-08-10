import { Box, Button, Container, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import Contact from "./components/Contact";
import { HttpService } from "./utils/HttpService";
import { IContact } from "./utils/types";
import Icon from '@mui/material/Icon';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import AddBoxIcon from '@mui/icons-material/AddBox';

const service = new HttpService();

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
