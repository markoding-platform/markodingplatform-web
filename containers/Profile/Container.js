import { shape, string } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AccountInfo from './AccountInfo';
import AccountMenu from './AccountMenu';
import CompanyInfo from './CompanyInfo';

const ProfileContainer = ({
  user,
  email,
  firstName,
  lastName,
  birthDate,
  profession,
  province,
  city,
  gender,
  userXID,
}) => {
  const { name, profile = {} } = user || {};
  const { profileType = {}, imageUrl, schoolName } = profile || {};

  return (
    <Row>
      <Col lg="3" className="mb-4">
        <AccountMenu
          fName={name || ''}
          email={email || ''}
          imageUrl={imageUrl || ''}
          schoolName={schoolName || ''}
        />
      </Col>
      <Col lg="9">
        <form>
          <AccountInfo
            userXID={userXID}
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            profession={profession}
            province={province}
            city={city}
            defaultgender={gender}
            email={email}
          />
          <CompanyInfo profileType={profileType} profile={profile} />
        </form>
      </Col>
    </Row>
  );
};

ProfileContainer.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  birthDate: string.isRequired,
  gender: string.isRequired,
  profession: string.isRequired,
  province: string.isRequired,
  city: string.isRequired,
  userXID: string.isRequired,
};

export default ProfileContainer;
