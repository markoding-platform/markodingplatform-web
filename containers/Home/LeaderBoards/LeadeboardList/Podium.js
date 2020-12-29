import Image from 'next/image';
import { BsFillStarFill } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';

import TableComponent from 'components/TableLeaderboards/Table';

import {
  podiumItem,
  styTopPodiumWrapper,
  styPoints,
  styStar,
  styPodiumWrapper,
} from './styles.module.scss';

const PodiumContainer = () => {
  const podiums = [
    {
      id: '0',
      avatarUrl: '',
      name: 'Ariqah',
      points: 300,
      position: '2',
    },
    {
      id: '1',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '1',
    },
    {
      id: '2',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '3',
    },
  ];

  const rest = [
    {
      id: '3',
      avatarUrl: '',
      name: 'Ariqah',
      points: 400,
      position: '4',
    },
    {
      id: '4',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '5',
    },
    {
      id: '5',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      position: '6',
    },
  ];
  return (
    <div className={styPodiumWrapper}>
      <div className={styTopPodiumWrapper}>
        {podiums.map((item) => (
          <div key={item.id} className={podiumItem}>
            <Image
              src="/assets/avatar-min.png"
              width={80}
              height={80}
              layout="fixed"
              className="rounded-circle"
            />
            <span className="py-2">{item.name}</span>
            <Badge variant="primary" className={styPoints}>
              <BsFillStarFill color="#FFC107" size="18" className={styStar} />
              <span>{item.points}</span>
            </Badge>
            <div className="py-3 w-100">
              <h1>{item.position}</h1>
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
          />
        ))}
      </div>
    </div>
  );
};

export default PodiumContainer;
