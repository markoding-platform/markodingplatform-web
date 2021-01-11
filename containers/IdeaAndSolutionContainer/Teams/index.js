import ProfileCard from 'components/ProfileCard';
import { arrayOf, number, shape, string } from 'prop-types';
import { teamsWrapper } from './style.module.scss';

const Teams = ({ items }) => {
  return (
    <div className={teamsWrapper}>
      {items.map((t) => (
        <ProfileCard
          key={t.id}
          title={t.title}
          primaryText={t.name}
          secondaryText={t.studentStatus}
        />
      ))}
    </div>
  );
};

Teams.propTypes = {
  items: arrayOf(
    shape({
      id: number,
      title: string,
      name: string,
      studentStatus: string,
    })
  ).isRequired,
};

export default Teams;
