import {
  Button,
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FormLabel } from "@mui/material";
import { useCallback, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { registration, selectAuth } from "../utils/authSlice";
import { CreateUserDTO } from "../utils/types";

export default function RegistrationPage() {
  const dispatch = useAppDispatch();
  const { status, token } = useAppSelector(selectAuth);

  const [form, setForm] = useState<CreateUserDTO>({
    name: "",
    login: "",
    password: "",
  });

  const isFormValid = Object.values(form).every((value) =>
    value.replace(/ /g, "")
  );

  const isLoading = status === "loading";

  const handleRegistration = useCallback((form: CreateUserDTO) => {
    dispatch(registration(form));
  }, []);

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
          fontWeight={"500"}
          textAlign={"center"}
        >
          Registration
        </Typography>
        <form>
          <TextField
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            label="Name"
            variant="filled"
          />
          <TextField
            value={form.login}
            onChange={(e) => setForm({ ...form, login: e.target.value })}
            fullWidth
            label="Login"
            variant="filled"
          />
          <TextField
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
            label="Password"
            variant="filled"
            type="password"
          />
          <Button
            disabled={!isFormValid}
            variant="contained"
            onClick={() => handleRegistration(form)}
          >
            Registration
          </Button>
        </form>
        <FormLabel>
          Already have an account?
          <Link to={"/auth/login"}>Sign in</Link>
        </FormLabel>
      </Container>
    </>
  );
}
