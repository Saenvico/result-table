import { useAppSelector } from '../../redux/hooks';
import { Team } from '../models/team';
import TeamTableItem from './TeamTableItem';

const TeamTable: React.FC = () => {
  const teamsList = useAppSelector((state) => state.team.teams);
  return (
    <table className="teams__table">
      <tbody>
        <tr className="teams__th">
          <th>Place</th>
          <th>Team</th>
          <th>Played</th>
          <th>Win</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>Points</th>
        </tr>
        {teamsList.map((item: Team, index) => (
          <TeamTableItem
            id={item.id}
            key={item.id}
            name={item.name}
            place={index + 1}
            played={item.played}
            win={item.win}
            draw={item.draw}
            lost={item.lost}
            points={item.points}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TeamTable;
