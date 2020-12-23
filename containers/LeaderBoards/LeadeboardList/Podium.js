import Image from 'next/image';
import { BsFillStarFill } from 'react-icons/bs';

import {
  podiumItem,
  styTopPodiumWrapper,
  styPoints,
  styStar,
} from './styles.module.scss';

const PodiumContainer = () => {
  const podiums = [
    {
      id: '0',
      avatarUrl: '',
      name: 'Ariqah',
      points: 300,
      rating: '1',
    },
    {
      id: '1',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      rating: '2',
    },
    {
      id: '1',
      avatarUrl: '',
      name: 'Faren',
      points: 300,
      rating: '3',
    },
  ];
  return (
    <div>
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
            <span className={styPoints}>
              <BsFillStarFill size="18" className={styStar} />
              <span>{item.points}</span>
            </span>
            <div className="py-3">
              <h1>{item.rating}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodiumContainer;
