import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact, IContactDTO } from "./types";
import { ContactsService } from "./ContactsService";
import { RootState } from "../../../app/store";

export interface ContactsState {
  value: IContact[];
  status: "idle" | "loading" | "failed";
}

const initialState: ContactsState = {
  value: [],
  status: "idle",
};

const _contactsService = new ContactsService();

export const addContact = createAsyncThunk(
  "contacts/fetchContacts",
  async (data: IContactDTO) => {
    const response = await _contactsService.addContact(data);
    return response.data;
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.status = "idle";
        state.value.push(action.payload);
      })
      .addCase(addContact.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;