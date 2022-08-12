import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { IContactDTO } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { close, selectDialogState } from "./contactDialogSlice";
import {
  addContact,
  updateContact,
} from "../../utils/contactsSlice";
import { defaultFormValue } from "./constants";


export default function ContactDialog() {
  const dispatch = useAppDispatch();

  const { isOpen, contact } = useAppSelector(selectDialogState);

  const [form, setForm] = useState<IContactDTO>(defaultFormValue);

  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = () => {
    if (contact) {
      let id: number = contact.id;
      let newData: IContactDTO = form;
      dispatch(updateContact({ id, newData }));
    } else {
      dispatch(addContact(form));
    }
    setForm(defaultFormValue);
    dispatch(close());
  };

  useEffect(() => {
    if (contact) {
      setForm(contact);
      setDialogContent({
        title: "Edit contact",
        description: "Here you can edit an existing contact",
      });
    } else {
      setDialogContent({
        title: "Add new contact",
        description: "Here you can add new contact to the list",
      });
    }
  }, [contact]);

  return (
    <Dialog open={isOpen} onClose={() => dispatch(close())}>
      <DialogTitle>{dialogContent.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent.description}</DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          margin="dense"
          id="name"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          margin="dense"
          id="name"
          label="Phone"
          type="email"
          fullWidth
          variant="standard"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(close())}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
