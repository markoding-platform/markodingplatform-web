import Card from 'react-bootstrap/Card';

import { cardStats, badgeValueText } from './styles.module.scss';

const MyStats = () => {
  return (
    <Card className={cardStats}>
      <Card.Body className="text-center">
        <p className="m-0 text-secondary">MBadge</p>
        <p className={badgeValueText}>0</p>
      </Card.Body>
    </Card>
  );
};

export default MyStats;
