import { useState, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import DatePickerComponent from 'components/DatePicker';

import SkilvulFetch from 'libraries/SkilvulFetch';

import { locationSchoolMap, professionsMap } from 'map/dropdownMap';
import { styLabel, required, dropdownError } from '../styles.module.scss';

const genderOption = [
  { id: 0, name: 'Laki-laki', value: 'laki-laki' },
  { id: 1, name: 'Perempuan', value: 'perempuan' },
];
const BioComponent = () => {
  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    errors,
  } = useFormContext();

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [professions, setProfessions] = useState([]);
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

  const getProfessions = useCallback(async () => {
    const professionResult = await SkilvulFetch(
      `/api/skilvul?path=/professions`
    );
    if (professionResult && professionResult.professions) {
      setProfessions(professionResult.professions.map(professionsMap));
    }
  }, []);

  const handleSelectGender = (gender) => {
    setValue('gender', gender);
  };

  const handleOnSelectDate = (date) => {
    setValue('dateOfBirth', date);
  };
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
  const handleSelectExpertise = (payload) => {
    setValue('expertise', payload.name);
  };

  useEffect(() => {
    getProvinces();
    getProfessions();
    if (provinceId) {
      getCities();
    }
  }, [getCities, getProfessions, getProvinces, provinceId]);

  useEffect(() => {
    const { cityId, cityName, expertise, provinceName, gender } = account || {};
    register('provinceId', { required: true, defaultVal: account.provinceId });
    register('provinceName', {
      required: true,
      defaultVal: provinceName,
    });
    register('cityId', { required: true, defaultVal: cityId });
    register('cityName', { required: true, defaultVal: cityName });
    register('expertise', { required: false, defaultVal: expertise });
    register('gender', { required: true, defaultVal: gender });
  }, [account, register]);

  const isErrorGenderField = errors.gender && !watch('teacherId');
  const isErrorProvinceField = errors.provinceId && !watch('provinceId');
  const isErrorCityField = errors.cityId && !watch('cityId');
  console.log(account.dateOfBirth, account.birthDate);
  return (
    <Panel title="Informasi Akun">
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel}`}>Tanggal Lahir</label>
          <DatePickerComponent
            defaultVal={account.dateOfBirth || account.birthDate}
            name="dateOfBirth"
            ref={register({ required: false })}
            error={false}
            onSelectDate={handleOnSelectDate}
          />
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} ${required}`}>Jenis Kelamin</label>
          <div className={isErrorGenderField && dropdownError}>
            <DropdownComponent
              onSelected={handleSelectGender}
              dropdownItem={genderOption}
              defaultVal={account.gender}
              inputName="gender"
              name="gender"
            />
          </div>
          {isErrorGenderField && (
            <Form.Text className="text-muted pt-1">
              Harap mengisi jenis kelamin
            </Form.Text>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg="12" className="pb-4">
          <label className={`${styLabel}`}>Nomor Telepon/Whatsapp</label>
          <TextField
            placeholder="082xxxxx"
            defaultVal={account.telephone}
            name="telephone"
            ref={register({ required: false })}
            error={false}
            errorTxt="Harap mengisi nomor telepon atau whatsapp"
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} ${required}`}>Provinsi</label>
          <div className={isErrorProvinceField && dropdownError}>
            <DropdownComponent
              onSelected={handleSelectProvince}
              dropdownItem={provinces}
              defaultVal={account.provinceName}
              inputName="provinceId"
              name="provinceId"
            />
          </div>
          {isErrorProvinceField && (
            <Form.Text className="text-muted pt-1">
              Harap mengisi provinsi
            </Form.Text>
          )}
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} ${required}`}>Kota/Kabupaten</label>
          <div key={provinceId}>
            <div className={isErrorCityField && dropdownError}>
              <DropdownComponent
                onSelected={handleSelectCity}
                dropdownItem={cities}
                defaultVal={defaultCityName}
                name="cityId"
              />
            </div>
            {isErrorCityField && (
              <Form.Text className="text-muted pt-1">
                Harap mengisi nama kota
              </Form.Text>
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel}`}>Pekerjaan/Profesi saat ini</label>
          <DropdownComponent
            onSelected={handleSelectExpertise}
            dropdownItem={professions}
            defaultVal={account.expertise}
            inputName="expertise"
            name="expertise"
          />
        </Col>
      </Row>
    </Panel>
  );
};

export default BioComponent;
