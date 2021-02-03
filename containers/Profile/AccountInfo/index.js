import { useState, useCallback, useEffect, memo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { arrayOf, shape, string } from 'prop-types';

import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';
import ModalComponent from 'components/Modal';
// import DatePickerComponent from 'components/DatePicker';
import SkilvulFetch from 'libraries/SkilvulFetch';
import { locationSchoolMap } from 'map/dropdownMap';
import DynamicPasswordModalContainer from '../PasswordModal';
import {
  styLabel,
  required,
  dropdownError,
  saveBtn,
  cancelBtn,
} from '../styles.module.scss';

const genderOption = [
  { id: 0, name: 'Laki-laki', value: 'MALE' },
  { id: 1, name: 'Perempuan', value: 'FEMALE' },
];
const genderEnum = {
  MALE: 'Laki-laki',
  FEMALE: 'Perempuan',
};
const AccountInfo = ({
  userXID,
  firstName,
  lastName,
  birthDate,
  profession,
  province,
  defaultgender,
  email,
  city,
  provinces,
  professions,
  cityList,
}) => {
  const router = useRouter();
  const {
    register,
    control,
    errors,
    setValue,
    getValues,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      birthDate,
      profession,
      province,
      provinceId: province.id,
      provinceName: province.name,
      gender: defaultgender,
      email,
      cityId: city.id,
      cityName: city.name,
    },
  });

  const [isShowModal, setIsShowModal] = useState(false);

  const [cities, setCities] = useState([]);

  const account = control?.defaultValuesRef?.current;

  const provinceId = getValues('provinceId');
  const [defaultCityName, setDefaultCityName] = useState(account.cityName);

  const handleOpenModal = () => {
    setIsShowModal((prevState) => !prevState);
  };

  const handleSelectGender = (currGender) => {
    setValue('gender', currGender.value);
  };

  // const handleOnSelectDate = (date) => {
  //   setValue('birthDate', new Date(date).toISOString());
  // };

  const getCities = useCallback(async () => {
    const currProvinceId = getValues('provinceId');
    const cityResult = await SkilvulFetch(
      `/api/skilvul?path=/cities?provinceId=${currProvinceId}`
    );
    if (cityResult && cityResult.cities) {
      setCities(cityResult.cities.map(locationSchoolMap));
    }
  }, [getValues]);

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
  const handleSelectProfession = (payload) => {
    setValue('profession', payload.name);
  };

  const renderToast = (msg, error = false) => {
    if (error) {
      return toast.error(<p className="m-0 pl-3">{msg}</p>, {
        autoClose: 3000,
      });
    }
    return toast.success(<p className="m-0 pl-3">{msg}</p>, {
      autoClose: 3000,
    });
  };

  const onSubmit = useCallback(
    async (data) => {
      if (userXID && userXID !== 'null') {
        const response = await SkilvulFetch(
          `/api/skilvul?path=/users/${userXID}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(data),
          }
        );

        if (response.ok && response?.user) {
          renderToast('Berhasil memperbarui profil');
        } else {
          renderToast('Gagal memperbarui profil', true);
        }
      }
    },
    [userXID]
  );

  useEffect(() => {
    const { cityId, cityName, provinceName, gender } = account || {};
    register('provinceId', { required: true, defaultVal: account.provinceId });
    register('provinceName', {
      required: true,
      defaultVal: provinceName,
    });
    register('cityId', { required: true, defaultVal: cityId });
    register('cityName', { required: true, defaultVal: cityName });
    register('profession', { required: false, defaultVal: profession });
    register('gender', { required: true, defaultVal: gender });
    register('birthDate', { required: true, defaultVal: birthDate });
  }, [account, birthDate, profession, register]);

  const isErrorGenderField = errors.gender && !watch('gender');
  const isErrorProvinceField = errors.provinceId && !watch('provinceId');
  const isErrorCityField = errors.cityId && !watch('cityId');

  return (
    <>
      <Panel title="Informasi Akun">
        <Row>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Nama Depan</label>
            <TextField
              defaultVal={account.firstName}
              name="firstName"
              ref={register({ required: true })}
              error={!!errors.firstName}
              errorTxt="Wajib diisi"
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Nama Belakang</label>
            <TextField
              defaultVal={account.lastName}
              name="lastName"
              ref={register({ required: true })}
              error={!!errors.lastName}
              errorTxt="Wajib diisi"
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Email</label>
            <TextField
              defaultVal={account.email}
              name="email"
              ref={register({
                required: true,
                // eslint-disable-next-line no-useless-escape
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              error={!!errors.email}
              errorTxt="Masukkan alamat email yang valid."
            />
          </Col>
          {/* <Col lg="6" sm="12" className="pb-4">
            <div>
              <Button variant="outline-secondary" onClick={handleOpenModal}>
                Ubah Password
              </Button>
            </div>
          </Col> */}
          {/* <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Tanggal Lahir</label>
            <DatePickerComponent
              defaultVal={account.birthDate}
              name="birthDate"
              ref={register({ required: true })}
              error={!!errors.birthDate}
              onSelectDate={handleOnSelectDate}
            />
          </Col> */}
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Jenis Kelamin</label>
            <div className={isErrorGenderField && dropdownError}>
              <DropdownComponent
                onSelected={handleSelectGender}
                dropdownItem={genderOption}
                defaultVal={genderEnum[account.gender]}
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
                  dropdownItem={cities.length ? cities : cityList}
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
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel}`}>Pekerjaan/Profesi saat ini</label>
            <DropdownComponent
              onSelected={handleSelectProfession}
              dropdownItem={professions}
              defaultVal={account.profession}
              inputName="profession"
              name="profession"
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button
            variant="outline-secondary"
            className={cancelBtn}
            onClick={() => router.back()}
          >
            Batal
          </Button>
          <Button className={saveBtn} onClick={handleSubmit(onSubmit)}>
            Simpan
          </Button>
        </div>
      </Panel>

      <ModalComponent
        show={isShowModal}
        onClose={handleOpenModal}
        title="Ubah Password"
      >
        <DynamicPasswordModalContainer />
      </ModalComponent>
    </>
  );
};

AccountInfo.propTypes = {
  userXID: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  birthDate: string.isRequired,
  profession: string.isRequired,
  province: shape({ id: string, name: string }).isRequired,
  defaultgender: string.isRequired,
  email: string.isRequired,
  city: shape({ id: string, name: string }).isRequired,
  provinces: arrayOf(shape({})).isRequired,
  professions: arrayOf(shape({})).isRequired,
  cityList: arrayOf(shape({})).isRequired,
};

export default memo(AccountInfo);
