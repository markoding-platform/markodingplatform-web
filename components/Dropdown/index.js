/* eslint-disable react/display-name */
import { useState, forwardRef, useEffect, useCallback } from 'react';
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
  styDropdownMenu,
  styDropdownItem,
} from './styles.module.scss';

const CustomToggle = forwardRef(({ children, onClick, disabled }, ref) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <Button
      aria-hidden="true"
      className={`bg-transparent ${dropdownBtn}`}
      ref={ref}
      disabled={disabled}
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
  defaultVal,
  withHardSearch,
  onHardSearch,
  disabled,
}) => {
  const [selectedDropdown, setSelectedDropdown] = useState(defaultVal);

  const [keyword, setKeyword] = useState('');
  const [searchedItem, setSearchedItem] = useState([]);

  const handleOnClick = (payload) => {
    setSelectedDropdown(payload.name);
    onSelected(payload);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };

  const debouncedKeyword = useDebounce(keyword, 500);

  const onSearch = useCallback(() => {
    if (!debouncedKeyword) return;
    if (withHardSearch) {
      return onHardSearch(debouncedKeyword.toLowerCase());
    }
    const result = dropdownItem.filter((item) => {
      return item.name.toLowerCase().match(debouncedKeyword.toLowerCase());
    });
    setSearchedItem(result);
  }, [debouncedKeyword, dropdownItem, onHardSearch, withHardSearch]);

  useEffect(() => {
    if (debouncedKeyword) {
      onSearch();
    }
  }, [debouncedKeyword, onSearch]);

  const items =
    keyword.length && withHardSearch === false ? searchedItem : dropdownItem;
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
        disabled={disabled}
      >
        <span className={`${selectedDropdown ? 'text-dark' : 'text-3rd'}`}>
          {selectedDropdown || placeholder}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className={`w-100 p-2 ${styDropdownMenu}`}>
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
          <div key={dropdownItem?.[0]?.name}>
            {items.map((item, idx) => (
              <Dropdown.Item
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                className={styDropdownItem}
                onClick={() => handleOnClick(item)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </div>
        </>
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownComponent.defaultProps = {
  placeholder: 'Pilih',
  dropdownItem: [],
  defaultVal: '',
  disabled: false,
  withSearch: false,
  withHardSearch: false,
  onHardSearch: () => {},
};

DropdownComponent.propTypes = {
  dropdownItem: arrayOf(
    shape({
      key: number,
      name: string,
    })
  ),
  defaultVal: string,
  placeholder: string,
  withSearch: bool,
  withHardSearch: bool,
  onSelected: func.isRequired,
  onHardSearch: func,
  disabled: bool,
};

CustomToggle.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
  disabled: bool.isRequired,
};
export default DropdownComponent;
