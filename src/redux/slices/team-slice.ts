import { createSlice } from '@reduxjs/toolkit';
import { Team } from '../../components/models/team';

type teamsInitialState = {
  changed: boolean;
  teams: Team[];
  matches: MatchResult[];
  matchesInputs: {}[][];
};

type MatchResult = {
  match1: Team;
  result1: number;
  result2: number;
  match2: Team;
};

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
  matchesInputs: matchesInputsItems,
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
    addMatchInput(state, action) {
        //perdaryti kad poros butu nuo vardo
      const uniquePairs = (arr: any[]) =>
        arr.flatMap((item1, index1) =>
          arr.flatMap((item2, index2) =>
            index1 > index2 ? [[item1, item2]] : []
          )
        );
        const teamEl = state.teams.filter((x) => x.name === action.payload);
        // state.matchesInputs.push(teamEl);
      state.matchesInputs = uniquePairs([...state.teams]);
      //   state.matchesInputs = [...state.matchesInputs, ...newArray];
      //   state.matchesInputs = state.matchesInputs.filter(
      //     (item, pos) => state.matchesInputs.indexOf(item) === pos
      //   );

      localStorage.setItem(
        'matchesInputs',
        JSON.stringify(state.matchesInputs.map((item) => item))
      );
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

      // const handleDelete = (indexToDelete) => {
      //   setCats((existingCats) =>
      //     existingCats.filter((_, index) => index !== indexToDelete)
      //   );
      // };

      if (id > -1) {
        //   state.matchesInputs.filter((_, index) => index !== id);

        // state.matchesInputs[id] = [
        //   ...state.matchesInputs[id],
        //   { visible: 'false' },
        // ];
        // state.matchesInputs = [...state.matchesInputs[id] + {visible: none}];
        state.matchesInputs.splice(id, 1);
        localStorage.setItem(
          'matchesInputs',
          JSON.stringify(state.matchesInputs.map((item) => item))
        );
      }
    },
    addMatchResultArray(state, action) {
      const newMatch1 = action.payload.teams[0];
      const newMatch2 = action.payload.teams[1];
      state.changed = true;
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
      console.log(result, team, 'team');
      console.log(state.teams, 'state.teams');
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
        console.log(updatedTeam, 'updatedTeam');
        console.log(state.teams, 'state.teams before removal ');

        state.teams = state.teams.filter((item) => item.id !== team.id);
        console.log(state.teams, 'state.teams after removal ');

        state.teams.push(updatedTeam);

        console.log(state.teams, 'state.teams after push');

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
