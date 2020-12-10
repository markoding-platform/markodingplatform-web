/* eslint-disable react/display-name */
import { useState, forwardRef, useEffect } from 'react';
import { arrayOf, number, string, shape, func, node, bool } from 'prop-types';
import { BsChevronDown } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';

import useDebounce from 'hooks/useDebounce';
import {
  dropdownBtn,
  rotate,
  rotateDown,
  searchGroup,
  searchIcon,
  search,
} from './styles.module.scss';

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

const DropdownComponent = ({
  placeholder,
  onSelected,
  dropdownItem,
  withSearch,
  onSearch,
}) => {
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 200);

  const handleOnClick = (payload) => {
    setSelectedDropdown(payload.text);
    onSelected(payload);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };

  useEffect(() => onSearch(debouncedKeyword), [debouncedKeyword, onSearch]);

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span className={`${selectedDropdown ? 'text-dark' : 'text-3rd'}`}>
          {selectedDropdown || placeholder}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100 p-2">
        <>
          {withSearch && (
            <div className={searchGroup}>
              <BiSearchAlt2 className={searchIcon} />
              <Form.Control
                type="text"
                placeholder="Search"
                className={search}
                onChange={handleSearch}
              />
            </div>
          )}
          {dropdownItem.map((item, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Dropdown.Item key={idx} onClick={() => handleOnClick(item)}>
              {item.text}
            </Dropdown.Item>
          ))}
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownComponent.defaultProps = {
  placeholder: 'Pilih',
  dropdownItem: [],
  withSearch: false,
  onSearch: () => {},
};

DropdownComponent.propTypes = {
  dropdownItem: arrayOf(
    shape({
      key: number,
      text: string,
    })
  ),
  placeholder: string,
  withSearch: bool,
  onSearch: func,
  onSelected: func.isRequired,
};

CustomToggle.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
};
export default DropdownComponent;
