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
import { addContact, getContacts, removeContact, selectContacts } from "./utils/contactsSlice";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const {value: contacts, status} = useAppSelector(selectContacts);
  
  useEffect(() => {
    dispatch(getContacts())
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IContactDTO) => {
    dispatch(addContact(data));
    setOpen(false);
  };


  const handleEditContact = (contact: IContact) => {
    console.log("hello", contact);
  };

  const handleRemoveContact = (id: number) => {
    dispatch(removeContact(id));
  };

  useEffect(() => {
    console.log(contacts);
    
  }, [contacts])
  
  const isLoading = status === 'loading';

  return (
    <>
      <LinearProgress color="info" sx={{visibility: isLoading ? 'visible' : 'hidden', position: 'fixed', top: '0', left: '0', width: '100%'}}/>
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
