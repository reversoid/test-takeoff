import {
  Box,
  Button,
  Container,
  FormLabel,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { login, selectAuth } from "../utils/authSlice";
import { LoginUserDto } from "../utils/types";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { status, token } = useAppSelector(selectAuth);

  const [form, setForm] = useState<LoginUserDto>({
    login: "",
    password: "",
  });

  const isFormValid = Object.values(form).every((value) =>
    value.replace(/ /g, "")
  );

  const handleLogin = useCallback((form: LoginUserDto) => {
    dispatch(login(form));
  }, []);

  const isLoading = status === "loading";
  return (
    <>
      {token && <Navigate to={"/dashboard"} />}
      <LinearProgress
        color="info"
        sx={{
          visibility: isLoading ? "visible" : "hidden",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
        }}
      />
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          component="h1"
          fontSize={"2.5rem"}
          fontWeight={"600"}
          textAlign={"center"}
          sx={{my: '1rem'}}
        >
          Login
        </Typography>
        <form>
          <TextField value={form.login} onChange={(e) => setForm({...form, login: e.target.value})} fullWidth label="Login" variant="filled" />
          <TextField margin="dense" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} type="password" fullWidth label="Password" variant="filled" />

          <Button sx={{mt: '0.5rem'}} onClick={() => handleLogin(form)} disabled={!isFormValid} variant="contained">Login</Button>
        </form>
        <Box sx={{pt: '1rem'}}>
        <FormLabel>
          Do not have an account yet?{" "}
          <Link to={"/auth/registration"}>Sign up</Link>
        </FormLabel>
        </Box>
        
      </Container>
    </>
  );
}
