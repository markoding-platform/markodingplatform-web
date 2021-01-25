import Form from 'react-bootstrap/Form';
import Link from 'next/link';
import { BiSearchAlt2 } from 'react-icons/bi';
import useDebounce from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import MarkodingFetch from 'libraries/MarkodingFetch';
import styles from './styles.module.scss';

const SearchHeader = () => {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);
  const debouncedKeyword = useDebounce(keyword, 300);

  const onSearch = async (value) => {
    const res = await MarkodingFetch(`/search?keyword=${value}`);
    if (res && res.result) {
      setResult(res.result);
    }
  };

  useEffect(() => {
    if (debouncedKeyword) {
      onSearch(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    setKeyword(value);
  };

  return (
    <div className={styles.searchRoot}>
      <div className={styles.searchGroup}>
        <Form.Control
          type="text"
          placeholder="Search"
          className={styles.search}
          onChange={handleSearch}
        />
        <BiSearchAlt2 className={styles.searchIcon} />
      </div>
      {keyword !== '' && (
        <div className={styles.searchResult}>
          <div className="mb-2">
            <h6>Idea</h6>
            {result && result.ideas && result.ideas.length && (
              <ul className="list-unstyled">
                {result.ideas.map((ide) => (
                  <li key={ide.id}>
                    <Link href={`/idea/${ide.id}`}>
                      <a href={`/idea/${ide.id}`}>{ide.solutionName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.divider}>
            <h6>Event</h6>
            {result && result.events && result.events.length > 0 && (
              <ul className="list-unstyled">
                {result.events.map((eve) => (
                  <li key={eve.id}>
                    <Link href={`/event/${eve.id}`}>
                      <a href={`/event/${eve.id}`}>{eve.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
