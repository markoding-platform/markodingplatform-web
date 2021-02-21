import { useState } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import { BiSortDown } from 'react-icons/bi';
import {
  btnTopAction,
  textAction,
  listItem,
  styPopOverContainer,
} from './styles.module.scss';

const SortComponent = ({ placement, sortItems, onClickSortItem }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [activeSort, setActiveSort] = useState('');

  const handleShowPopover = () => {
    setShowPopover(!showPopover);
  };

  const handleClickSort = (sort) => {
    setShowPopover(false);
    setActiveSort(sort.id);
    onClickSortItem(sort);
  };
  const popover = (
    <Popover className={styPopOverContainer}>
      <Popover.Content className="p-0">
        <ul className="list-group">
          {sortItems.map((sort) => (
            <li className={`list-group-item  ${listItem}`} key={sort.id}>
              <Button
                variant="light"
                className={`w-100 p-3 text-left ${
                  activeSort === sort.id ? 'active' : ''
                }`}
                onClick={() => handleClickSort(sort)}
              >
                {sort.name}
              </Button>
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover>
  );

  return (
    <div>
      <OverlayTrigger
        trigger="click"
        key={placement}
        placement={placement}
        overlay={popover}
        rootClose
        show={showPopover}
        onToggle={handleShowPopover}
      >
        <div role="button" className={btnTopAction}>
          <BiSortDown size={24} className="text-secondary" />
          <span className={textAction} id="sort-action">
            Sort
          </span>
        </div>
      </OverlayTrigger>
    </div>
  );
};

SortComponent.defaultProps = {
  placement: 'bottom',
};

SortComponent.propTypes = {
  placement: string,
  sortItems: arrayOf(
    shape({
      name: '',
      value: '',
    })
  ).isRequired,
  onClickSortItem: func.isRequired,
};
export default SortComponent;
