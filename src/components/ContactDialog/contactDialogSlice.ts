import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IContact } from "../../features/dashboard/utils/types";

export interface DialogState {
  isOpen: boolean;
  contact?: IContact;
}

const initialState: DialogState = {
  isOpen: false,
};

export const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        open: (state, action: PayloadAction<IContact | undefined>) => {
          state.contact = action?.payload;
          state.isOpen = true;
        },
        close: (state) => {
          state.isOpen = false;
          state.contact = undefined;
        },
      },
})

export const { close, open } = dialogSlice.actions;

export const selectDialogState = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
