import './App.css';
import ScoresTable from './components/scores/ScoresTable';
import NewTeamInput from './components/teams/NewTeamInput';
import TeamTable from './components/teams/TeamTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NewTeamInput />
        <TeamTable />
        <ScoresTable />
      </header>
    </div>
  );
}

export default App;
