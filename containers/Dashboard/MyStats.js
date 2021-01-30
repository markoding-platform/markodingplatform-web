import Card from 'react-bootstrap/Card';
import { string } from 'prop-types';

import { cardStats, badgeValueText } from './styles.module.scss';

const MyStats = ({ title }) => {
  return (
    <Card className={cardStats}>
      <Card.Body className="text-center">
        <p className="m-0 text-secondary">{title}</p>
        <p className={badgeValueText}>0</p>
      </Card.Body>
    </Card>
  );
};

MyStats.propTypes = {
  title: string.isRequired,
};
export default MyStats;
