import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { AuthService } from "./AuthHTTPService";
import { CreateUserDTO, LoginUserDto } from "./types";

export interface AuthState {
  status: "idle" | "loading" | "failed";
  token: string | null;
}

const initialState: AuthState = {
  status: "idle",
  token: localStorage.getItem("token"),
};

const _authService = new AuthService();

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginUserDto) => {
    const response = await _authService.login(data);
    return response.data.token;
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (data: CreateUserDTO) => {
    const response = await _authService.registration(data);
    return response.data.token;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = "idle";
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(registration.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registration.fulfilled, (state, action: PayloadAction<string>) => {
      state.status = "idle";
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    });
    builder.addCase(registration.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { removeToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
