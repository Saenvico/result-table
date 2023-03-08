import { configureStore } from '@reduxjs/toolkit';
import teamSlice from './slices/team-slice';

export const store = configureStore({
  reducer: {
    team: teamSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
