import { Team } from '../models/team';

const TeamListItem: React.FC<Team> = (props) => {
  return (
    <tr>
      <td className="teams__td">{props.place}</td>
      <td className="teams__td">{props.name}</td>
      <td className="teams__td">{props.played}</td>
      <td className="teams__td">{props.win}</td>
      <td className="teams__td">{props.draw}</td>
      <td className="teams__td">{props.lost}</td>
      <td className="teams__td">{props.points}</td>
    </tr>
  );
};

export default TeamListItem;
