import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact, IContactDTO } from "./types";
import { ContactsService } from "./ContactsHTTPService";
import { RootState } from "../../../app/store";
import { AxiosError } from "axios";

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
  async (data: IContactDTO, { getState }) => {
    const token = (getState() as RootState).auth.token ?? "";
    try {
      const response = await _contactsService.addContact(data, token);
      console.log("thats response", response.status);

      return response.data;
    } catch (error) {
      let response = (error as AxiosError).response;
      throw response?.status;
    }
  }
);

export const removeContact = createAsyncThunk(
  "contacts/remove",
  async (id: number, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token ?? "";
      await _contactsService.removeContact(id, token);
      return id;
    } catch (error) {
      let response = (error as AxiosError).response;
      throw response?.status;
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async (
    { id, newData }: { id: number; newData: IContactDTO },
    { getState }
  ) => {
    try {
      const token = (getState() as RootState).auth.token ?? "";
      const response = await _contactsService.updateContact(
        { id, newData },
        token
      );
      return response.data;
    } catch (error) {
      let response = (error as AxiosError).response;
      throw response?.status;
    }
  }
);

export const getContacts = createAsyncThunk(
  "contacts/get",
  async (pattern: string, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token ?? "";
      const response = await _contactsService.getContacts(token, pattern);
      return response.data;
    } catch (error) {
      let response = (error as AxiosError).response;
      throw response?.status;
    }
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.status = "idle";
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<IContact>) => {
          state.status = "idle";
          state.value.push(action.payload);
        }
      )
      .addCase(addContact.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(removeContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        removeContact.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "idle";
          state.value = state.value.filter(
            (contact) => contact.id !== action.payload
          );
        }
      )
      .addCase(removeContact.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(getContacts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getContacts.fulfilled,
        (state, action: PayloadAction<IContact[]>) => {
          state.status = "idle";
          state.value = action.payload;
        }
      )
      .addCase(getContacts.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(updateContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<IContact>) => {
          state.status = "idle";
          let index = state.value.findIndex(
            (contact) => contact.id === action.payload.id
          );
          if (index === -1) return;
          state.value[index] = action.payload;
        }
      )
      .addCase(updateContact.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts;

export default contactsSlice.reducer;
