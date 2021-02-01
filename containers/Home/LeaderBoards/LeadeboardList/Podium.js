import Image from 'next/image';
import { BsFillStarFill } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';
import { arrayOf, shape, number, string } from 'prop-types';

import TableComponent from 'components/TableLeaderboards/Table';
import noImage from 'public/assets/default-idea-img.png';

import {
  podiumItem,
  styTopPodiumWrapper,
  styPoints,
  styStar,
  styPodiumWrapper,
  styName,
} from './styles.module.scss';

const positionEnum = {
  1: 2,
  2: 1,
  3: 3,
};
const PodiumContainer = ({ podiums, rest }) => {
  return (
    <div className={styPodiumWrapper}>
      <div className={styTopPodiumWrapper}>
        {podiums.map((item) => (
          <div key={item.id} className={podiumItem}>
            <div>
              <Image
                src={item.avatarUrl || noImage}
                width={80}
                height={80}
                layout="fixed"
                className="rounded-circle bg-white"
              />
              <span className={`py-2 ${styName}`}>{item.name}</span>

              <Badge variant="primary" className={styPoints}>
                <BsFillStarFill color="#FFC107" size="18" className={styStar} />
                <span>{item.points}</span>
              </Badge>
              <div className="py-3 w-100">
                <h1>{positionEnum[item.position]}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 bg-white">
        {rest.map((item) => (
          <TableComponent
            key={item.id}
            name={item.name}
            points={item.points}
            position={item.position}
            imgUrl={item.avatarUrl || noImage}
          />
        ))}
      </div>
    </div>
  );
};

PodiumContainer.propTypes = {
  podiums: arrayOf(
    shape({
      id: number,
      avatarUrl: string,
      name: string,
      points: number,
      position: number,
    })
  ).isRequired,
  rest: arrayOf(
    shape({
      id: number,
      avatarUrl: string,
      name: string,
      points: number,
      position: number,
    })
  ).isRequired,
};
export default PodiumContainer;
