import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';

const ScoresListItem = () => {
  const matchesList = useAppSelector((state) => state.team.matches);
  return (
    <Fragment>
      {matchesList.length > 0 ? (
        matchesList.map((item, index) => (
          <li key={index} className="scores__list">
            <div key={item.match1.id} className="scores__list">
              <div className="scores__list scores__name">
                <div>{item.match1.name}</div>
              </div>
              <div className="scores__list">
                <div>{item.result1}</div>
              </div>
              <div className="scores__list">
                <div>:</div>
                <div>{item.result2}</div>
              </div>
              <div className="scores__list scores__name">
                <div>{item.match2.name}</div>
              </div>
            </div>
          </li>
        ))
      ) : (
        <h4>No matches to display</h4>
      )}
    </Fragment>
  );
};

export default ScoresListItem;
