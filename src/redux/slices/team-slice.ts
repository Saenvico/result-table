import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../components/models/team';

type teamsInitialState = {
  changed: boolean;
  teams: Team[];
  matches: {}[][];
  matchesInputs: {}[][];
};

const uniquePairs = (arr: any[]) =>
  arr.flatMap((item1, index1) =>
    arr.flatMap((item2, index2) => (index1 > index2 ? [[item1, item2]] : []))
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


const initialState: teamsInitialState = {
  changed: false,
  teams: teamsItems,
  matches: matchItems,
  matchesInputs: uniquePairs(teamsItems),
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
    fetchMatches(state, action) {
      state.matches = action.payload.matches;
    },
    fetchMatchesInputs(state, action) {
      state.matchesInputs = uniquePairs(teamsItems);
      localStorage.setItem(
        'matchesInputs',
        JSON.stringify(state.matchesInputs)
      );
      console.log(uniquePairs(teamsItems), 'matchesInputsItems22');
    },
    removeMatchInput(state, action) {
      const id = action.payload;
      //   const existingItem = state.matchesInputs.find((index) => index === id);
      //   state.matchesInputs = state.matchesInputs.filter(
      //     (a, index) => index !== id
      //   );
      // return state.filter( item=> item != state[action.index]  )
      //   let newArray = [...state.matchesInputs];
      //   state.matchesInputs = newArray.splice(id, 1);

      if (id > -1) {
        state.matchesInputs.splice(id, 1);
        localStorage.setItem(
          'matchesInputs',
          JSON.stringify(state.matchesInputs.map((item) => item))
        );
      }
    },
    addMatchResultArray(state, action) {
      const newMatch = action.payload.teams;
      state.changed = true;
      newMatch.splice(1, 0, action.payload.team1Result);
      newMatch.splice(2, 0, action.payload.team2Result);
      state.matches.push(...newMatch);
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
        state.teams = state.teams.filter((item) => item.id !== team.id);
        const updatedTeam: any = {
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
        state.teams.push(updatedTeam);
        localStorage.setItem(
          'teams',
          JSON.stringify(state.teams.map((item) => item))
        );
      }
    },
    sortTeams(state) {
      state.teams.sort(function (a, b) {
        return a.points - b.points;
      });
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
