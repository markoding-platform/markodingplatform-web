import { CgArrowLongRight } from 'react-icons/cg';
import { ordered, styStepsInfo } from './styles.module.scss';

const StepsComponent = () => {
  return (
    <div>
      <ul className="list-unstyled d-flex justify-content-center">
        <li className="d-flex mr-2 pt-2">
          <span className={ordered}>1</span>
          <p className={styStepsInfo}>Informasi Akun</p>
        </li>
        <li className="d-flex mr-2">
          <CgArrowLongRight
            size={50}
            color="#2F80ED"
            style={{ paddingBottom: '7px' }}
          />
        </li>
        <li className="d-flex mr-2 pt-2">
          <span className={ordered}>2</span>
          <p className={styStepsInfo}>Data Diri</p>
        </li>
        <li className="d-flex mr-2">
          <CgArrowLongRight
            size={50}
            color="#2F80ED"
            style={{ paddingBottom: '7px' }}
          />
        </li>
        <li className="d-flex mr-2 pt-2">
          <span className={ordered}>3</span>
          <p className={styStepsInfo}>Data Instansi</p>
        </li>
      </ul>
    </div>
  );
};

export default StepsComponent;
