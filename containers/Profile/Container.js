import { useCallback, useEffect, useState, useRef } from 'react';
import { shape, string } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SkilvulFetch from 'libraries/SkilvulFetch';
import { locationSchoolMap, professionsMap } from 'map/dropdownMap';
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
  imageUrl,
}) => {
  const { name, profile = {} } = user || {};
  const { profileType = {}, schoolName } = profile || {};
  const [provinces, setProvinces] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [cities, setCities] = useState([]);
  const firstLoad = useRef(false);

  const getProvinces = useCallback(async () => {
    const provResult = await SkilvulFetch('/api/skilvul?path=/provinces');
    if (provResult && provResult.provinces) {
      setProvinces(provResult.provinces.map(locationSchoolMap));
    }
  }, []);

  const getProfessions = useCallback(async () => {
    const professionResult = await SkilvulFetch(
      `/api/skilvul?path=/professions`
    );
    if (professionResult && professionResult.professions) {
      setProfessions(professionResult.professions.map(professionsMap));
    }
  }, []);

  const getCities = useCallback(async () => {
    const currProvinceId = province?.id || '';
    if (!currProvinceId) return;
    const cityResult = await SkilvulFetch(
      `/api/skilvul?path=/cities?provinceId=${currProvinceId}`
    );
    if (cityResult && cityResult.cities) {
      setCities(cityResult.cities.map(locationSchoolMap));
    }
  }, [province?.id]);

  useEffect(() => {
    if (!firstLoad.current) {
      getProvinces();
      getProfessions();
      getCities();
      firstLoad.current = true;
    }
  }, [getCities, getProfessions, getProvinces]);

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
            professions={professions}
            province={province}
            city={city}
            defaultgender={gender}
            email={email}
            provinces={provinces}
            cityList={cities}
          />
          <CompanyInfo
            profileType={profileType}
            profile={profile}
            provinces={provinces}
            cityList={cities}
          />
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
  province: shape({}).isRequired,
  city: shape({}).isRequired,
  userXID: string.isRequired,
  imageUrl: string.isRequired,
};

export default ProfileContainer;
