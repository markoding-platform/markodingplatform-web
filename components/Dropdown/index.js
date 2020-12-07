/* eslint-disable react/display-name */
import { useState, forwardRef } from 'react';
import { arrayOf, number, string, shape, func, node } from 'prop-types';
import { BsChevronDown } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { dropdownBtn, rotate, rotateDown } from './styles.module.scss';

const CustomToggle = forwardRef(({ children, onClick }, ref) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <Button
      aria-hidden="true"
      className={`bg-transparent ${dropdownBtn}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        setIsClick(!isClick);
      }}
    >
      {children}

      <BsChevronDown
        color="#A9A5B6"
        className={`${rotate} ${isClick && rotateDown}`}
        size={20}
      />
    </Button>
  );
});

const DropdownComponent = ({ placeholder, onSelected, dropdownItem }) => {
  const [selectedDropdown, setSelectedDropdown] = useState(placeholder);
  const handleOnClick = (payload) => {
    setSelectedDropdown(payload.text);
    onSelected(payload);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span className="text-3rd">{selectedDropdown}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {dropdownItem.map((item) => (
          <Dropdown.Item key={item.key} onClick={() => handleOnClick(item)}>
            {item.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownComponent.defaultProps = {
  placeholder: 'Pilih',
  dropdownItem: [],
};

DropdownComponent.propTypes = {
  placeholder: string,
  dropdownItem: arrayOf(
    shape({
      key: number,
      text: string,
    })
  ),
  onSelected: func.isRequired,
};

CustomToggle.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
};
export default DropdownComponent;
