import { bool, string } from 'prop-types';
import Form from 'react-bootstrap/Form';
import { BiSearchAlt2 } from 'react-icons/bi';

import {
  searchGroup,
  search,
  searchIcon,
  listItem,
  listItemWrapper,
  styNameText,
  chief,
} from './styles.module.scss';

const ListItem = ({ name, subTitle, isChief }) => {
  return (
    <div className={`${listItem} ${isChief && chief}`}>
      <p className={styNameText}>{name}</p>
      <p className="m-0 text-secondary">{subTitle}</p>
    </div>
  );
};

const SearchMember = () => {
  return (
    <div>
      <div className="d-none w-100 d-lg-flex align-items-center mb-4">
        <div className={searchGroup}>
          <BiSearchAlt2 className={searchIcon} />
          <Form.Control type="text" placeholder="Search" className={search} />
        </div>
      </div>
      <p className="text-secondary">Hasil Pencarian</p>
      <div className={listItemWrapper}>
        <ListItem name="ariqah" subTitle="CEO Gojek" isChief />
        <ListItem name="ariqah" subTitle="CEO Gojek" />
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
