import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { DialogTypes, IContactDTO } from "../utils/types";

export default function ContactDialog({
  open,
  handleSubmit,
  handleClose,
  prevData,
}: {
  open: boolean;
  handleSubmit: (form: IContactDTO) => void;
  handleClose: () => void;
  prevData?: IContactDTO;
}) {
  const [form, setForm] = useState<IContactDTO>(
    prevData ?? {
      name: "",
      email: "",
      phone: "",
    }
  );

  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (prevData) {
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
  }, [prevData]);

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleSubmit(form)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
