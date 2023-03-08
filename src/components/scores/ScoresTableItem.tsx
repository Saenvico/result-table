import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';

const ScoresListItem = () => {
  const matchesList = useAppSelector((state) => state.team.matches);
  return (
    <Fragment>
      {matchesList.length > 0 ? (
        matchesList.map((item, index) => (
          <li key={index} className="scores__list">
            {item.map((a: any, index) => (
              <div key={a.id} className="scores__list">
                {index === 0 && (
                  <div className="scores__list">
                    <div>{a.name}</div>
                  </div>
                )}
                {index === 1 && (
                  <div className="scores__list">
                    <div>{a}</div>
                  </div>
                )}
                {index === 2 && (
                  <div className="scores__list">
                    <div>:</div>
                    <div>{a}</div>
                  </div>
                )}
                {index === 3 && (
                  <div className="scores__list">
                    <div>{a.name}</div>
                  </div>
                )}
              </div>
            ))}
          </li>
        ))
      ) : (
        <h4>No matches to display</h4>
      )}
    </Fragment>
  );
};

export default ScoresListItem;
