import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from '../features/dashboard/utils/contactsSlice';
import dialogReducer from '../features/dashboard/utils/dialogSlice';

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
