import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import number from 'utils/number';

import { cardStats, badgeValueText } from './styles.module.scss';

const MyStats = ({ title, total }) => {
  return (
    <Card className={cardStats}>
      <Card.Body className="text-center">
        <p className="m-0 text-secondary">{title}</p>
        <p className={badgeValueText}>{number(total)}</p>
      </Card.Body>
    </Card>
  );
};

MyStats.defaultProps = {
  total: 0,
};

MyStats.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
};
export default MyStats;
