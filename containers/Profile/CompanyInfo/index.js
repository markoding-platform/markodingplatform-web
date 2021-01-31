import { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { shape, string } from 'prop-types';

import SkilvulFetch from 'libraries/SkilvulFetch';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Panel from 'components/Panel';

import DropdownComponent from 'components/Dropdown';
import TextField from 'components/TextField';

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

const CompanyInfo = ({ profileType, profile }) => {
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
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  // const [defaultCityName, setDefaultCityName] = useState(account.cityName);
  console.log({ errors });
  const getProvinces = useCallback(async () => {
    const provResult = await SkilvulFetch('/api/skilvul?path=/provinces');
    if (provResult && provResult.provinces) {
      setProvinces(provResult.provinces.map(locationSchoolMap));
    }
  }, []);

  const getCities = useCallback(
    async (currentProvinceId) => {
      // const currentProvinceId = await getValues('provinceId');
      const cityResult = await SkilvulFetch(
        `/api/skilvul?path=/cities?provinceId=${currentProvinceId}`
      );
      if (cityResult && cityResult.cities) {
        console.log({ cityResult });
        setCities(cityResult.cities.map(locationSchoolMap));
      }
    },
    [getValues]
  );

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
    async ({ schoolGradeId, currProvinceId, cityId, schoolTypeId }) => {
      console.log({ schoolGradeId, currProvinceId, cityId, schoolTypeId });
      const schoolRes = await SkilvulFetch(
        `/api/schools?schoolGradeId=${schoolGradeId}&provinceId=${currProvinceId}&cityId=${cityId}&schoolTypeId=${schoolTypeId}`
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
    console.log(payload, key);
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

  const onSubmit = useCallback(async (data) => {
    console.log({ data });
    return data;
  }, []);

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
    } = account;
    getProvinces();
    getSchoolGrades();
    getSchoolTypes();
    getSchools({
      schoolGradeId,
      currProvinceId: provinceId,
      cityId,
      schoolTypeId,
    });
    getCities(provinceId);
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
  }, [
    account,
    getCities,
    getProvinces,
    getSchoolGrades,
    getSchoolTypes,
    getSchools,
    register,
  ]);

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
              dropdownItems = cities;
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
                />
              )}
              {item.as === 'dropdown' && (
                <DropdownComponent
                  dropdownItem={dropdownItems}
                  defaultVal={account[item.key]}
                  withSearch={item.key === 'schoolName'}
                  onSelected={(selected) => {
                    handleSelectDropdown(selected, item.key);
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
        <Button variant="outline-secondary" className={cancelBtn}>
          Batal
        </Button>
        <Button className={saveBtn} onClick={handleSubmit(onSubmit)}>
          Simpan
        </Button>
      </div>
    </Panel>
  );
};

CompanyInfo.propTypes = {
  profileType: string.isRequired,
  profile: shape({}).isRequired,
};
export default CompanyInfo;
