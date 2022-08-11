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
  "contacts/add",
  async (data: IContactDTO) => {
    const response = await _contactsService.addContact(data);
    return response.data;
  }
);

export const removeContact = createAsyncThunk(
  "contacts/remove",
  async (id: number) => {
    const response = await _contactsService.removeContact(id);
    return response.data;
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({id, newData}: {id: number; newData: IContactDTO}) => {
    const response = await _contactsService.updateContact({id, newData});
    return response.data;
  }
);

export const getContacts = createAsyncThunk(
  "contacts/get",
  async () => {
    const response = await _contactsService.getContacts();
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
      })

      .addCase(removeContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "idle";
        state.value.filter((contact) => contact.id !== action.payload);
      })
      .addCase(removeContact.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getContacts.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.status = "idle";
        let index = state.value.findIndex((contact) => contact.id === action.payload.id);
        if (index === -1) return;
        state.value[index] = action.payload;
      })
      .addCase(updateContact.rejected, (state) => {
        state.status = "failed";
      })
  },
});

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;