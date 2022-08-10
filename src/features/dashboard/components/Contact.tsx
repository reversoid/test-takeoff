import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { IContact } from "../utils/types";

export default function Contact({ contact }: { contact: IContact }) {
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
        <Button size="medium" color="primary">
          Edit
        </Button>
        <Button size="medium" color="error">
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
