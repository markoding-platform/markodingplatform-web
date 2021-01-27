import { useState, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';

import SkilvulFetch from 'libraries/SkilvulFetch';

import { locationSchoolMap } from 'map/dropdownMap';
import { styLabel } from '../styles.module.scss';

const genderOption = [
  { id: 0, name: 'Laki-laki', value: 'laki-laki' },
  { id: 1, name: 'Perempuan', value: 'perempuan' },
];
const BioComponent = () => {
  const { register, control, getValues, setValue } = useFormContext();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const account = control?.defaultValuesRef?.current || {};
  const provinceId = getValues('provinceId');
  const [defaultCityName, setDefaultCityName] = useState(account.cityName);

  const getProvinces = useCallback(async () => {
    const provResult = await SkilvulFetch('/api/skilvul?path=/provinces');
    if (provResult && provResult.provinces) {
      setProvinces(provResult.provinces.map(locationSchoolMap));
    }
  }, []);

  const getCities = useCallback(async () => {
    const cityResult = await SkilvulFetch(
      `/api/skilvul?path=/cities?provinceId=${provinceId}`
    );
    if (cityResult && cityResult.cities) {
      setCities(cityResult.cities.map(locationSchoolMap));
    }
  }, [provinceId]);

  const handleSelectGender = () => {};
  const handleSelectProvince = (payload) => {
    setValue('provinceId', payload.key);
    setValue('provinceName', payload.name);
    setValue('cityId', '');
    setValue('cityName', '');
    setDefaultCityName('');
    getCities();
  };

  const handleSelectCity = (payload) => {
    setValue('cityId', payload.key);
    setValue('cityName', payload.name);
  };
  const handleSelectWorkingPos = () => {
    // setValue('problemArea', payload.value);
  };

  useEffect(() => {
    getProvinces();
    if (provinceId) {
      getCities();
    }
  }, [getCities, getProvinces, provinceId]);

  useEffect(() => {
    register('provinceId', { required: true, defaultVal: account.provinceId });
    register('provinceName', {
      required: true,
      defaultVal: account.provinceName,
    });
    register('cityId', { required: true, defaultVal: account.cityId });
    register('cityName', { required: true, defaultVal: account.cityName });
  }, [
    account.cityId,
    account.cityName,
    account.provinceId,
    account.provinceName,
    register,
  ]);
  return (
    <Panel title="Informasi Akun">
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Tanggal Lahir</label>
          <TextField
            placeholder=""
            defaultVal={account.dateOfBirth}
            name="dateOfBirth"
            ref={register({ required: true })}
            error={false}
            errorTxt="Harap mengisi tanggal lahir"
          />
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Jenis Kelamin</label>
          <DropdownComponent
            onSelected={handleSelectGender}
            dropdownItem={genderOption}
            defaultVal={account.gender}
            inputName="gender"
            name="gender"
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="pb-4">
          <label className={`${styLabel} required`}>
            Nomor Telepon/Whatsapp
          </label>
          <TextField
            placeholder="082xxxxx"
            defaultVal={account.telephone}
            name="telephone"
            ref={register({ required: true })}
            error={false}
            errorTxt="Harap mengisi nomor telepon atau whatsapp"
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Provinsi</label>
          <DropdownComponent
            onSelected={handleSelectProvince}
            dropdownItem={provinces}
            defaultVal={account.provinceName}
            inputName="provinceId"
            name="provinceId"
          />
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Kota/Kabupaten</label>
          <div key={provinceId}>
            <DropdownComponent
              onSelected={handleSelectCity}
              dropdownItem={cities}
              defaultVal={defaultCityName}
              name="cityId"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>
            Pekerjaan/Profesi saat ini
          </label>
          <DropdownComponent
            onSelected={handleSelectWorkingPos}
            dropdownItem={[]}
            defaultVal={account.workingPosition}
            inputName="workingPosition"
            name="workingPosition"
          />
        </Col>
      </Row>
    </Panel>
  );
};

export default BioComponent;
