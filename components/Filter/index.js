import { useState, memo } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import { BsListUl } from 'react-icons/bs';
import {
  btnTopAction,
  textAction,
  listItem,
  styPopOverContainer,
} from './styles.module.scss';

const FilterComponent = ({ placement, filterItems, onClickFilterItem }) => {
  const [showPopover, setShowPopover] = useState(false);

  const handleShowPopover = () => {
    setShowPopover(!showPopover);
  };

  const handleClickFilter = (sort) => {
    setShowPopover(false);
    onClickFilterItem(sort);
  };
  const popover = (
    <Popover className={styPopOverContainer}>
      <Popover.Content className="p-0">
        <ul className="list-group">
          {filterItems.map((filter) => (
            <li className={`list-group-item  ${listItem}`} key={filter.id}>
              <Button
                variant="light"
                className="w-100 p-3 text-left"
                onClick={() => handleClickFilter(filter)}
              >
                {filter.name}
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
          <BsListUl size={24} className="text-secondary" />
          <span className={textAction} id="sort-action">
            Filter
          </span>
        </div>
      </OverlayTrigger>
    </div>
  );
};

FilterComponent.defaultProps = {
  placement: 'bottom',
};

FilterComponent.propTypes = {
  placement: string,
  filterItems: arrayOf(
    shape({
      name: '',
      value: '',
    })
  ).isRequired,
  onClickFilterItem: func.isRequired,
};
export default memo(FilterComponent);
