import { createSlice } from '@reduxjs/toolkit';

const initialState;

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    addTeam(state, action) {},
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
