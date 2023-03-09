import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../components/models/team';

type teamsInitialState = {
  teams: Team[];
  matches: MatchResult[];
  matchesInputs: Team[][];
  deletedIndexes: number[];
};

type MatchResult = {
  match1: Team;
  result1: number;
  result2: number;
  match2: Team;
};

const uniquePairs = (arr: any[]) =>
  arr.flatMap((item1, index1) =>
    arr.flatMap((item2, index2) => (index1 > index2 ? [[item2, item1]] : []))
  );

const teamsItems =
  localStorage.getItem('teams') !== null
    ? JSON.parse(localStorage.getItem('teams') || '{}')
    : [];

const matchItems =
  localStorage.getItem('matches') !== null
    ? JSON.parse(localStorage.getItem('matches') || '{}')
    : [];

const matchesInputsItems =
  localStorage.getItem('matchesInputs') !== null
    ? JSON.parse(localStorage.getItem('matchesInputs') || '{}')
    : [];

const deletedIndexes =
  localStorage.getItem('deletedIndexes') !== null
    ? JSON.parse(localStorage.getItem('deletedIndexes') || '{}')
    : [];

const initialState: teamsInitialState = {
  teams: teamsItems,
  matches: matchItems,
  matchesInputs: matchesInputsItems,
  deletedIndexes: deletedIndexes,
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

      if (!existingTeam) {
        state.teams.push({
          id: new Date().toISOString(),
          place: 0,
          name: newTeamName,
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
      }
    },
    addMatchInput(state) {
      state.matchesInputs = uniquePairs([...state.teams]);
      if (state.deletedIndexes.length > 0) {
        for (let i = 0; state.deletedIndexes.length > i; i++) {
          state.matchesInputs.splice(state.deletedIndexes[i], 1);
        }
      }
      localStorage.setItem(
        'matchesInputs',
        JSON.stringify(state.matchesInputs.map((item) => item))
      );
    },
    removeMatchInput(state, action) {
      const id = action.payload;
      if (id > -1) {
        state.matchesInputs.splice(id, 1);
        state.deletedIndexes.push(id);
        localStorage.setItem(
          'matchesInputs',
          JSON.stringify(state.matchesInputs.map((item) => item))
        );
        localStorage.setItem(
          'deletedIndexes',
          JSON.stringify(state.deletedIndexes.map((item) => item))
        );
      }
    },
    addMatchResultArray(state, action) {
      const newMatch1 = action.payload.teams[0];
      const newMatch2 = action.payload.teams[1];
      state.matches.push({
        match1: newMatch1,
        result1: action.payload.team1Result,
        result2: action.payload.team2Result,
        match2: newMatch2,
      });
      localStorage.setItem(
        'matches',
        JSON.stringify(state.matches.map((item) => item))
      );
    },
    updateTeam(state, action) {
      const team = action.payload.team;
      const result = action.payload.result;
      const existingTeam = state.teams.find((item) => item.name === team.name);
      if (existingTeam) {
        const updatedTeam: Team = {
          ...existingTeam,
          played: team.played + 1,
          win: result === 'win' ? team.win + 1 : team.win,
          draw: result === 'draw' ? team.draw + 1 : team.draw,
          lost: result === 'lost' ? team.lost + 1 : team.lost,
          points:
            result === 'win'
              ? team.points + 3
              : result === 'draw'
              ? team.points + 1
              : team.points,
        };
        state.teams = state.teams.filter((item) => item.id !== team.id);
        state.teams.push(updatedTeam);

        state.matchesInputs = uniquePairs([...state.teams]);
        if (state.deletedIndexes.length > 0) {
          for (let i = 0; state.deletedIndexes.length > i; i++) {
            state.matchesInputs.splice(state.deletedIndexes[i], 1);
          }
        }
        localStorage.setItem(
          'matchesInputs',
          JSON.stringify(state.matchesInputs.map((item) => item))
        );
        localStorage.setItem(
          'teams',
          JSON.stringify(state.teams.map((item) => item))
        );
      }
    },
    sortTeams(state) {
      state.teams.sort(function (a, b) {
        return b.points - a.points;
      });
      localStorage.setItem(
        'teams',
        JSON.stringify(state.teams.map((item) => item))
      );
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
