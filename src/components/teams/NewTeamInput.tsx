import { useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { teamActions } from '../../redux/slices/team-slice';

const NewTeamInput: React.FC = () => {
  const teamNameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const name = teamNameInputRef.current!.value;

    if (name.trim().length === 0) {
      console.log("Name field should not be empty")
      return;
    }

    dispatch(teamActions.addTeam(name));
    dispatch(teamActions.addMatchInput(name));

    teamNameInputRef.current!.value = '';
  };

  return (
    <form onSubmit={submitHandler} className="teams__form">
      <input
        type="text"
        id="text"
        placeholder="New team"
        ref={teamNameInputRef}
      />
      <button>Add</button>
    </form>
  );
};

export default NewTeamInput;
