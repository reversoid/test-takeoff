import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

const initialState: boolean = false;

export const dialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        open: (state) => {
          state = true;
        },
        close: (state) => {
          state = false;
        },
      },
})

export const selectDialogState = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
