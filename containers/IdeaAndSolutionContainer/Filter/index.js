import { BsListUl } from 'react-icons/bs';
import { btnTopAction, textAction } from '../style.module.scss';

const FilterIdea = () => {
  return (
    <div className={btnTopAction}>
      <BsListUl size={24} className="text-secondary" />
      <span className={textAction}>Filter</span>
    </div>
  );
};

export default FilterIdea;
