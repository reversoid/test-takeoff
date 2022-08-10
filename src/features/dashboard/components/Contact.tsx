import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { IContact } from "../utils/types";

export default function Contact({
  contact,
  handleEdit,
  handleRemove,
}: {
  contact: IContact;
  handleEdit: (contact: IContact) => void;
  handleRemove: (id: number) => void;
}) {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h5">
          {contact.name}
        </Typography>

        <Typography fontSize="1rem" component="p">
          {contact.email}
        </Typography>

        <Typography fontSize="1rem" component="p">
          {contact.phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary" onClick={() => handleEdit(contact)}>
          Edit
        </Button>
        <Button size="medium" color="error" onClick={() => handleRemove(contact.id)}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
