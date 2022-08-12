import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from '../features/dashboard/utils/contactsSlice';
import dialogReducer from '../features/dashboard/components/ContactDialog/contactDialogSlice';
import authReducer from '../features/auth/utils/authSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    dialog: dialogReducer,
    auth: authReducer,
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
