import './App.css';
import NewTeamInput from './components/teams/NewTeamInput';
import TeamTable from './components/teams/TeamTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NewTeamInput />
        <TeamTable />
      </header>
    </div>
  );
}

export default App;
