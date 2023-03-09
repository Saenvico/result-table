import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import ScoresInputItem from './ScoresInputItem';
import ScoresTableItem from './ScoresTableItem';

const ScoresTable = () => {
  const matchesInputs = useAppSelector((state) => state.team.matchesInputs);

  return (
    <Fragment>
      <ScoresTableItem />
      {matchesInputs.length > 0 ? (
        matchesInputs.map((item, index) => (
          <div key={index}>
            {item.length < 3 && <ScoresInputItem index={index} item={item} />}
          </div>
        ))
      ) : (
        <div>Please add more Teams</div>
      )}
    </Fragment>
  );
};

export default ScoresTable;
