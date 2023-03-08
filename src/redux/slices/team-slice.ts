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
      const newTeamName = action.payload;
      const existingTeam = state.teams.find(
        (team) => team.name === newTeamName
      );
      state.changed = true;
      const newTeam = {
        id: new Date().toISOString(),
        place: 1,
        name: newTeamName,
        played: 0,
        win: 0,
        draw: 0,
        lost: 0,
        points: 0,
      };

      if (!existingTeam) {
        state.teams.push(newTeam);
        const index = state.teams.findIndex(
          (item) => item.name === newTeamName
        );
        state.teams = state.teams.filter((item) => item.id !== newTeam.id);
        state.teams.push({
          ...newTeam,
          place: index + 1,
        });

        localStorage.setItem(
          'teams',
          JSON.stringify(state.teams.map((item) => item))
        );
      }
    },
    fetchTeams(state, action) {
      state.teams = action.payload.teams;
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
