import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import ScoresInputItem from './ScoresInputItem';
import ScoresTableItem from './ScoresTableItem';

const ScoresTable = () => {
  const teamsList = useAppSelector((state) => state.team.teams);
  const matchesList = useAppSelector((state) => state.team.matchesInputs);

  const uniquePairs = (arr: any[]) =>
    arr.flatMap((item1, index1) =>
      arr.flatMap((item2, index2) => (index1 > index2 ? [[item1, item2]] : []))
    );

  const matchPairs = uniquePairs(teamsList);
  console.log(matchesList.length, 'lken');
  console.log(matchesList, 'lken');

  return (
    <Fragment>
      <ScoresTableItem />
      {matchesList.length > 0 ? (
        matchesList.map((item, index) => (
          <ScoresInputItem key={index} index={index} item={item} />
        ))
      ) : (
        <div>Please add more Teams</div>
      )}
    </Fragment>
  );
};

export default ScoresTable;
