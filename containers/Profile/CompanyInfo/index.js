import { useCallback, useState, useEffect, useRef, memo } from 'react';
import { useForm } from 'react-hook-form';
import { shape, string, arrayOf } from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import SkilvulFetch from 'libraries/SkilvulFetch';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Panel from 'components/Panel';

import DropdownComponent from 'components/Dropdown';
import TextField from 'components/TextField';
import Loading from 'components/Loading';

import MarkodingFetch from 'libraries/MarkodingFetch';
import {
  locationSchoolMap,
  schoolGradeMap,
  schoolTypeMap,
} from 'map/dropdownMap';
import { LIST_FORM } from '../../constants';
import {
  styLabel,
  required,
  styTextfield,
  saveBtn,
  cancelBtn,
} from '../styles.module.scss';

const CompanyInfo = ({ profileType, profile, provinces, cityList }) => {
  const router = useRouter();
  const {
    register,
    control,
    getValues,
    setValue,
    errors,
    handleSubmit,
  } = useForm({
    defaultValues: { ...profile },
  });

  const [schoolGrades, setSchoolGrades] = useState([]);
  const account = control?.defaultValuesRef?.current;
  const [schools, setSchools] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolsKeyword = useRef('');

  const getCities = useCallback(async (currentProvinceId) => {
    const cityResult = await SkilvulFetch(
      `/api/skilvul?path=/cities?provinceId=${currentProvinceId}`
    );
    if (cityResult && cityResult.cities) {
      setCities(cityResult.cities.map(locationSchoolMap));
    }
  }, []);

  const getSchoolGrades = useCallback(async () => {
    const sgResult = await SkilvulFetch('/api/skilvul?path=/schools/grades');
    if (sgResult && sgResult.schoolGrades) {
      setSchoolGrades(sgResult.schoolGrades.map(schoolGradeMap));
    }
  }, []);

  const getSchoolTypes = useCallback(async () => {
    const stResult = await SkilvulFetch('/api/skilvul?path=/schools/types');
    if (stResult && stResult.schoolTypes) {
      setSchoolTypes(stResult.schoolTypes.map(schoolTypeMap));
    }
  }, []);

  const getSchools = useCallback(
    async ({
      schoolGradeId,
      currProvinceId,
      cityId,
      schoolTypeId,
      query = '',
    }) => {
      if (!schoolGradeId && !currProvinceId) return;
      const schoolRes = await SkilvulFetch(
        `/api/schools?schoolGradeId=${schoolGradeId}&provinceId=${currProvinceId}&cityId=${cityId}&schoolTypeId=${schoolTypeId}&search=${query}`
      );
      if (schoolRes && schoolRes.schools) {
        setSchools(schoolRes.schools.map(locationSchoolMap));
      }
    },
    []
  );

  const handleSelectProvince = (payload) => {
    const { key, name } = payload;
    setValue('provinceId', key);
    setValue('provinceName', name);

    getCities(key);
  };

  const onSearch = useCallback(
    (q) => {
      if (schoolsKeyword.current !== q) {
        const schoolGradeId =
          getValues('schoolGradeId') || account.schoolGradeId;
        const currProvinceId = getValues('provinceId') || account.provinceId;
        const schoolTypeId = getValues('schoolTypeId') || account.schoolTypeId;
        const cityId = getValues('cityId') || account.schoolTypeId;
        getSchools({
          schoolGradeId,
          currProvinceId,
          cityId,
          schoolTypeId,
          query: q,
        });
        schoolsKeyword.current = q;
      }
    },
    [
      account.provinceId,
      account.schoolGradeId,
      account.schoolTypeId,
      getSchools,
      getValues,
    ]
  );

  const handleSelectCity = (payload) => {
    const { key, name } = payload;
    setValue('cityId', key);
    setValue('cityName', name);
    const schoolGradeId = getValues('schoolGradeId') || account.schoolGradeId;
    const currProvinceId = getValues('provinceId') || account.provinceId;
    const schoolTypeId = getValues('schoolTypeId') || account.schoolTypeId;
    getSchools({ schoolGradeId, currProvinceId, cityId: key, schoolTypeId });
  };

  const handleSelectSchoolGradeName = (payload) => {
    const { key, name } = payload;
    setValue('schoolGradeId', key);
    setValue('schoolGradeName', name);
    const currProvinceId = getValues('provinceId') || account.provinceId;
    const cityId = getValues('cityId') || account.cityId;
    const schoolTypeId = getValues('schoolTypeId') || account.schoolTypeId;
    getSchools({ schoolGradeId: key, currProvinceId, cityId, schoolTypeId });
  };
  const handleSelectSchoolType = (payload) => {
    const { key, name } = payload;
    setValue('schoolTypeId', key);
    setValue('schoolTypeName', name);
    const currProvinceId = getValues('provinceId') || account.provinceId;
    const cityId = getValues('cityId') || account.cityId;
    const schoolGradeId = getValues('schoolGradeId') || account.schoolTypeId;
    getSchools({
      schoolGradeId,
      currProvinceId,
      cityId,
      schoolTypeId: key,
    });
  };

  const handleSelectSchoolName = (payload) => {
    setValue('schoolId', payload.key);
    setValue('schoolName', payload.name);
  };

  const handleSelectLastEdu = (payload) => {
    setValue('lastEducationGradeId', payload.key);
    setValue('lastEducationGradeName', payload.name);
  };
  const handleSelectDropdown = (payload, key) => {
    switch (key) {
      case 'schoolGradeName':
        handleSelectSchoolGradeName(payload);
        break;
      case 'schoolTypeName':
        handleSelectSchoolType(payload);
        break;
      case 'provinceName':
        handleSelectProvince(payload);
        break;
      case 'cityName':
        handleSelectCity(payload);
        break;
      case 'schoolName':
        handleSelectSchoolName(payload);
        break;
      case 'lastEducationGradeName':
        handleSelectLastEdu(payload);
        break;
      default:
        break;
    }
  };

  const renderToast = ({ msg, error = false, time = 3000 }) => {
    if (error) {
      return toast.error(<p className="m-0 pl-3">{msg}</p>, {
        autoClose: time,
      });
    }
    return toast.success(<p className="m-0 pl-3">{msg}</p>, {
      autoClose: time,
    });
  };

  const updateProfile = useCallback(async (value) => {
    setLoading(true);
    const response = await MarkodingFetch('/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(value),
    });
    if (response.ok && response.result) {
      renderToast({
        msg:
          'Berhasil memperbarui profil. Silahkan log in kembali untuk mendapatkan pembaruan',
        time: 5000,
      });
    } else {
      renderToast({
        msg: 'Maaf, terjadi kesalahan, silahkan coba kembali.',
        error: true,
      });
    }
    setLoading(false);
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      updateProfile(data);
    },
    [updateProfile]
  );

  useEffect(() => {
    const {
      schoolGradeId,
      provinceId,
      cityId,
      schoolGradeName,
      schoolName,
      schoolId,
      schoolTypeId,
      schoolTypeName,
      provinceName,
      cityName,
    } = account;
    register('provinceId', {
      required: false,
      defaultVal: provinceId,
    });
    register('provinceName', {
      required: false,
      defaultVal: provinceName,
    });
    register('cityName', {
      required: false,
      defaultVal: cityName,
    });
    register('cityId', {
      required: false,
      defaultVal: cityId,
    });
    register('schoolGradeName', {
      required: false,
      defaultVal: schoolGradeName,
    });
    register('schoolGradeId', {
      required: false,
      defaultVal: schoolGradeId,
    });
    register('schoolName', {
      required: false,
      defaultVal: schoolName,
    });
    register('schoolId', {
      required: false,
      defaultVal: schoolId,
    });
    register('schoolTypeId', {
      required: false,
      defaultVal: schoolTypeId,
    });
    register('schoolTypeName', {
      required: false,
      defaultVal: schoolTypeName,
    });
    register('profileType', {
      required: false,
      defaultVal: profileType,
    });
  }, [
    account,
    getCities,
    getSchoolGrades,
    getSchoolTypes,
    getSchools,
    profileType,
    register,
  ]);

  useEffect(() => {
    getSchoolGrades();
    getSchoolTypes();
  }, [getSchoolGrades, getSchoolTypes]);

  return (
    <Panel title="Data Instansi">
      <Row>
        {LIST_FORM[profileType].map((item) => {
          let dropdownItems;
          switch (item.key) {
            case 'schoolGradeName':
              dropdownItems = schoolGrades;
              break;
            case 'schoolTypeName':
              dropdownItems = schoolTypes;
              break;
            case 'provinceName':
              dropdownItems = provinces;
              break;
            case 'cityName':
              dropdownItems = cities.length ? cities : cityList;
              break;
            case 'schoolName':
              dropdownItems = schools;
              break;
            case 'lastEducationGradeName':
              dropdownItems = schoolGrades;
              break;
            default:
              dropdownItems = [];
              break;
          }

          return (
            <Col key={item.key} md={item.columns} sm={12} className="pb-4">
              <label className={`${styLabel} ${item.required && required}`}>
                {item.label}
              </label>
              {item.as === 'textfield' && (
                <TextField
                  name={item.key}
                  ref={register({ required: item.required })}
                  className={styTextfield}
                  defaultVal={account[item.key]}
                />
              )}
              {item.as === 'dropdown' && (
                <DropdownComponent
                  dropdownItem={dropdownItems}
                  defaultVal={account[item.key]}
                  withSearch={item.key === 'schoolName'}
                  withHardSearch={item.key === 'schoolName'}
                  onSelected={(selected) => {
                    handleSelectDropdown(selected, item.key);
                  }}
                  onHardSearch={(q) => {
                    onSearch(q);
                  }}
                />
              )}
              <span className="text-danger">
                {errors[item.key] && 'Wajib diisi'}
              </span>
            </Col>
          );
        })}
      </Row>
      <div className="d-flex justify-content-end">
        <Button
          variant="outline-secondary"
          className={cancelBtn}
          onClick={() => router.back()}
        >
          Batal
        </Button>
        <Button
          className={saveBtn}
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          <div className="d-flex align-items-center justify-content-center">
            {loading && <Loading withText={false} />}
            <span>Simpan</span>
          </div>
        </Button>
      </div>
    </Panel>
  );
};

CompanyInfo.propTypes = {
  profileType: string.isRequired,
  profile: shape({}).isRequired,
  provinces: arrayOf(shape({ id: string, name: string })).isRequired,
  cityList: arrayOf(shape({ id: string, name: string })).isRequired,
};
export default memo(CompanyInfo);
