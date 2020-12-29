import Image from 'next/image';
import { BsFillStarFill } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';

import {
  styPointsOutline,
  styStar,
  styPosition,
  styName,
  styItem,
} from './styles.module.scss';

const TableComponent = ({ position, points, name }) => {
  return (
    <div className={styItem}>
      <div className="d-flex">
        <span className={styPosition}>{position}</span>
        <div>
          <Image
            src="/assets/avatar-min.png"
            width={48}
            height={48}
            layout="fixed"
            className="rounded-circle"
          />
        </div>
        <span className={styName}>{name}</span>
      </div>
      <Badge className={styPointsOutline}>
        <BsFillStarFill size="18" className={styStar} />
        <span>{points}</span>
      </Badge>
    </div>
  );
};

export default TableComponent;