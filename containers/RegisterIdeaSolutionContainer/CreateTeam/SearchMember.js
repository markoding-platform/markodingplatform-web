import { bool, string } from 'prop-types';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';

import useDebounce from 'hooks/useDebounce';
import MarkodingFetch from 'libraries/MarkodingFetch';
import {
  searchGroup,
  search,
  searchIcon,
  listItem,
  listItemWrapper,
  styNameText,
  chief,
} from './styles.module.scss';

const ListItem = ({ name, subTitle, isChief, onSelect }) => {
  return (
    <div
      className={`${listItem} ${isChief && chief}`}
      aria-hidden="true"
      onClick={onSelect}
    >
      <p className={styNameText}>{name}</p>
      <p className="m-0 text-secondary">{subTitle}</p>
    </div>
  );
};

const SearchMember = ({ onSelectStudent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const debouncedKeyword = useDebounce(searchQuery, 200);
  const handleSearchStudents = (e) => {
    const { value } = e.target;
    if (value) {
      setSearchQuery(value);
    }
  };

  const getStudent = async (keyword) => {
    const { ok, result } = await MarkodingFetch(
      `/users/my/students?search=${keyword}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );
    if (ok) {
      setStudents(result);
    }
  };

  const handleSelectStudent = (student) => {
    onSelectStudent(student);
  };

  useEffect(() => {
    if (debouncedKeyword) {
      getStudent(debouncedKeyword);
    }
  }, [debouncedKeyword]);
  return (
    <div>
      <div className="d-none w-100 d-lg-flex align-items-center mb-4">
        <div className={searchGroup}>
          <BiSearchAlt2 className={searchIcon} />
          <Form.Control
            type="text"
            placeholder="Search"
            className={search}
            onChange={handleSearchStudents}
          />
        </div>
      </div>
      <p className="text-secondary">Hasil Pencarian</p>
      <div className={listItemWrapper}>
        {students.map(({ id, name, profile }) => (
          <ListItem
            key={id}
            name={name}
            subTitle={`Siswa ${profile.schoolGradeName}`}
            onSelect={() => handleSelectStudent({ id, name, profile })}
          />
        ))}
      </div>
    </div>
  );
};

ListItem.defaultProps = {
  name: '',
  subTitle: '',
  isChief: false,
};

ListItem.propTypes = {
  name: string,
  subTitle: string,
  isChief: bool,
};

export default SearchMember;
