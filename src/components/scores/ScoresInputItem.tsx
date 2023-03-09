import { useRef } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { teamActions } from '../../redux/slices/team-slice';

const ScoresFormItem: React.FC<{ index: number; item: any[] }> = (props) => {
  const team1InputRef = useRef<HTMLInputElement>(null);
  const team2InputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const team1Result = team1InputRef.current!.value;
    const team2Result = team2InputRef.current!.value;

    if (team1Result.trim().length === 0 || team2Result.trim().length === 0) {
      console.log('Please insert match results');
      return;
    }

    const resultTeam1 =
      team1Result > team2Result
        ? 'win'
        : team1Result === team2Result
        ? 'draw'
        : 'lost';

    const resultTeam2 =
      team2Result > team1Result
        ? 'win'
        : team1Result === team2Result
        ? 'draw'
        : 'lost';

    dispatch(
      teamActions.updateTeam({
        team: props.item[0],
        result: resultTeam1,
      })
    );

    dispatch(
      teamActions.updateTeam({
        team: props.item[1],
        result: resultTeam2,
      })
    );

    dispatch(teamActions.removeMatchInput(props.index));

    dispatch(
      teamActions.addMatchResultArray({
        teams: props.item,
        team1Result: team1Result,
        team2Result: team2Result,
      })
    );

    dispatch(teamActions.sortTeams());

    team1InputRef.current!.value = '';
    team2InputRef.current!.value = '';
  };

  return (
    <form onSubmit={submitHandler} className="scores__form">
      <div className="scores__list">
        {props.item.map((a, index) => (
          <div key={a.id} className=" ">
            {
              <div>
                {index === 0 && (
                  <div className="scores__list">
                    <div className="scores__name">{a.name}</div>
                    <input
                      type="number"
                      min="0"
                      ref={team1InputRef}
                      className="scores__input"
                    />
                  </div>
                )}
                {index > 0 && (
                  <div className="scores__list">
                    <div>:</div>
                    <input
                      type="number"
                      min="0"
                      ref={team2InputRef}
                      className="scores__input"
                    />
                    <p className="scores__name">{a.name}</p>
                  </div>
                )}
              </div>
            }
          </div>
        ))}
      </div>
      <button className="scores__list">Add</button>
    </form>
  );
};

export default ScoresFormItem;
