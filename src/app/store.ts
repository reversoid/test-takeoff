import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from '../features/dashboard/utils/contactsSlice';
import dialogReducer from '../components/ContactDialog/contactDialogSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    dialog: dialogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
