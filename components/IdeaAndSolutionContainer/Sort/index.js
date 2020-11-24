import { BiSortDown } from 'react-icons/bi';
import { btnTopAction, textAction } from '../style.module.scss';

const SortIdea = () => {
  return (
    <div className={btnTopAction}>
      <BiSortDown size={24} className="text-secondary" />
      <span className={textAction} id="sort-action">
        Sort
      </span>
    </div>
  );
};

export default SortIdea;
