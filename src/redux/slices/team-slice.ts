import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../components/models/team';

type teamsInitialState = {
  changed: boolean;
  teams: Team[];
};

const teamsItems =
  localStorage.getItem('teams') !== null
    ? JSON.parse(localStorage.getItem('teams') || '{}')
    : [];

const initialState: teamsInitialState = {
  changed: false,
  teams: teamsItems,
};

const teamSlice = createSlice({
  name: 'team',
  initialState: initialState,
  reducers: {
    addTeam(state, action) {
      const newTeam = action.payload;
      const existingTeam = state.teams.find((team) => team.name === newTeam);
      state.changed = true;
      const index = state.teams.findIndex((item) => item.name === newTeam);

      //   const index = state.teams.map((i) => i.name).indexOf(newTeam);
      if (!existingTeam) {
        state.teams.push({
          id: new Date().toISOString(),
          place: index,
          name: newTeam,
          played: 0,
          win: 0,
          draw: 0,
          lost: 0,
          points: 0,
        });
        localStorage.setItem(
          'teams',
          JSON.stringify(state.teams.map((item) => item))
        );
        // localStorage.setItem('totalTeams', JSON.stringify(state.totalTeams));
      }
    },
    fetchTeams(state, action) {
      state.teams = action.payload.teams;
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
