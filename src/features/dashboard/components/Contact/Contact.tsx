import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { open } from "../../../components/ContactDialog/contactDialogSlice";
import { removeContact } from "../utils/contactsSlice";
import { IContact } from "../utils/types";

export default function Contact({contact}: {contact: IContact}) {

  const dispatch = useAppDispatch();

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
        <Button size="medium" color="primary" onClick={() => dispatch(open(contact))}>
          Edit
        </Button>
        <Button size="medium" color="error" onClick={() => dispatch(removeContact(contact.id))}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
