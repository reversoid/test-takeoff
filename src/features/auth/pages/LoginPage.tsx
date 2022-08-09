import { Button, Container, FormControl, FormLabel, Link as MLink, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h1" fontSize={'2.5rem'} fontWeight={'500'} textAlign={'center'}>
        Login
      </Typography>
      <FormControl fullWidth>
        <TextField fullWidth label="Email" variant="filled" />
        <TextField fullWidth label="Password" variant="filled" />

        <Button variant="contained">Login</Button>
      </FormControl>
      <FormLabel>
        Do not have an account yet?{" "}
        <Link to={'/auth/registration'}><MLink>Sign up</MLink></Link>
      </FormLabel>

    </Container>
  );
}
