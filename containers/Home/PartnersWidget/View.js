import MarkodingLogo from 'components/MarkodingLogo';
import Image from 'next/image';

import { logoWrapper, lumino } from './styles.module.scss';

const PartnersContainer = () => {
  return (
    <div className="mt-4 pb-3">
      <h3 className="text-center">Acara ini terselenggara berkat kerjasama:</h3>
      <div className={logoWrapper}>
        <div>
          <Image
            src="/assets/u-report.png"
            width={166}
            height={72}
            layout="fixed"
            className={lumino}
          />
        </div>
        <div>
          <Image
            src="/assets/unicef.png"
            width={166}
            height={72}
            layout="fixed"
            className={lumino}
          />
        </div>
        <div>
          <Image
            src="/assets/tutwuri.png"
            width={166}
            height={72}
            layout="fixed"
            className={lumino}
          />
        </div>
        <MarkodingLogo />
      </div>
    </div>
  );
};

export default PartnersContainer;
