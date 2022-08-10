import {
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { FormLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as MLink } from "@mui/material";

export default function RegistrationPage() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h1"
        component="h1"
        fontSize={"2.5rem"}
        fontWeight={"500"}
        textAlign={"center"}
      >
        Registration
      </Typography>
      <form>
        <TextField fullWidth label="Name" variant="filled" />
        <TextField fullWidth label="Email" variant="filled" />
        <TextField fullWidth label="Password" variant="filled" />
        <Button variant="contained">Registration</Button>
      </form>
      <FormLabel>
        Already have an account?{" "}
        <Link to={"/auth/login"}>
          <MLink>Sign in</MLink>
        </Link>
      </FormLabel>
    </Container>
  );
}
