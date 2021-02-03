import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import Link from 'next/link';
import { string } from 'prop-types';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextField from 'components/TextField';
import { toast } from 'react-toastify';
import DropdownComponent from 'components/Dropdown';
import { useForm } from 'react-hook-form';
import SkilvulFetch from 'libraries/SkilvulFetch';
import MarkodingFetch from 'libraries/MarkodingFetch';
import Loading from 'components/Loading';
import getCookie from 'utils/getCookie';
import { Login } from 'utils/auth';
import StepsComponent from './Steps';
import {
  styCardHeader,
  styLabel,
  styTextfield,
  styTerm,
  required,
} from './styles.module.scss';
import { LIST_FORM, ACCOUNT_TYPE_ENUM, tAndCLink } from '../constants';
import {
  locationSchoolMap,
  schoolGradeMap,
  schoolTypeMap,
} from '../../map/dropdownMap';

const SignupForm = ({ registerAs }) => {
  const {
    handleSubmit,
    register,
    unregister,
    errors,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      profileType: 'student',

      schoolId: '',
      schoolName: '',
      schoolTypeId: '',
      schoolTypeName: '',
      schoolGradeId: '',
      schoolGradeName: '',
      classId: '',
      className: '',

      cityId: '',
      cityName: '',
      provinceId: '',
      provinceName: '',

      workingPosition: '',
      companyName: '',
      expertise: '',

      startTeachingYear: '',

      lastEducationGradeId: '',
      lastEducationGradeName: '',
    },
  });
  const [isStudentSupporter, setIsStudentSupporter] = useState(false);
  const [schoolGrades, setSchoolGrades] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const schoolsKeyword = useRef('');

  const getForm = useMemo(() => {
    if (isStudentSupporter) {
      return LIST_FORM.student;
    }
    if (!isStudentSupporter) {
      return LIST_FORM[registerAs];
    }

    return [];
  }, [isStudentSupporter, registerAs]);

  const handleSelectStudentSupporter = (value) => {
    setIsStudentSupporter(!!value.key);
  };

  const getSchoolGrades = async () => {
    const sgResult = await SkilvulFetch('/api/skilvul?path=/schools/grades');
    if (sgResult && sgResult.schoolGrades) {
      setSchoolGrades(sgResult.schoolGrades.map(schoolGradeMap));
    }
  };

  const getSchoolTypes = async () => {
    const stResult = await SkilvulFetch('/api/skilvul?path=/schools/types');
    if (stResult && stResult.schoolTypes) {
      setSchoolTypes(stResult.schoolTypes.map(schoolTypeMap));
    }
  };

  const getProvinces = async () => {
    const provResult = await SkilvulFetch('/api/skilvul?path=/provinces');
    if (provResult && provResult.provinces) {
      setProvinces(provResult.provinces.map(locationSchoolMap));
    }
  };

  const getCities = async () => {
    const provinceId = await getValues('provinceId');
    const cityResult = await SkilvulFetch(
      `/api/skilvul?path=/cities?provinceId=${provinceId}`
    );
    if (cityResult && cityResult.cities) {
      setCities(cityResult.cities.map(locationSchoolMap));
    }
  };

  const getSchools = useCallback(
    async (keyword = '') => {
      const schoolGradeId = await getValues('schoolGradeId');
      const provinceId = await getValues('provinceId');
      const cityId = await getValues('cityId');
      if (!schoolGradeId && !provinceId) return;
      const schoolRes = await SkilvulFetch(
        `/api/schools?schoolGradeId=${schoolGradeId}&provinceId=${provinceId}&cityId=${cityId}&search=${keyword}`
      );
      if (schoolRes && schoolRes.schools) {
        setSchools(schoolRes.schools.map(locationSchoolMap));
      }
    },
    [getValues]
  );

  const onSearch = useCallback(
    (q) => {
      if (schoolsKeyword.current !== q) {
        getSchools(q);
        schoolsKeyword.current = q;
      }
    },
    [getSchools]
  );

  const handleSelectDropdown = (payload, key) => {
    switch (key) {
      case 'schoolGradeName':
        setValue('schoolGradeId', payload.key);
        setValue('schoolGradeName', payload.name);
        break;
      case 'schoolTypeName':
        setValue('schoolTypeId', payload.key);
        setValue('schoolTypeName', payload.name);
        break;
      case 'provinceName':
        setValue('provinceId', payload.key);
        setValue('provinceName', payload.name);
        getCities();
        break;
      case 'cityName':
        setValue('cityId', payload.key);
        setValue('cityName', payload.name);
        getSchools('');
        break;
      case 'schoolName':
        setValue('schoolId', payload.key);
        setValue('schoolName', payload.name);
        break;
      case 'lastEducationGradeName':
        setValue('lastEducationGradeId', payload.key);
        setValue('lastEducationGradeName', payload.name);
        break;
      default:
        break;
    }
  };

  const doRegister = async (value) => {
    setLoading(true);
    const response = await MarkodingFetch('/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(value),
    });
    if (response.ok && response.result) {
      toast.success('Pendaftaran berhasil.');
      const backPath = getCookie('backPath') || '/';
      const { token, data } = response.result;
      await Login({}, token, data, backPath);
    } else {
      toast.error('Maaf, terjadi kesalahan, silahkan coba kembali.');
    }
    setLoading(false);
  };

  useEffect(() => {
    getSchoolGrades();
    if (
      registerAs === 'student' ||
      registerAs === 'teacher' ||
      (registerAs === 'supporter' && isStudentSupporter)
    ) {
      register('schoolGradeId', { required: true });
      register('schoolGradeName', { required: true });
      register('schoolTypeId', { required: true });
      register('schoolTypeName', { required: true });
      register('provinceId', { required: true });
      register('provinceName', { required: true });
      register('cityId', { required: true });
      register('cityName', { required: true });
      register('schoolId', { required: true });
      register('schoolName', { required: true });
      getSchoolTypes();
      getProvinces();
    }

    if (registerAs === 'teacher' || registerAs === 'mentor') {
      register('expertise', { required: true });
      register('workingPosition', { required: true });
      register('lastEducationGradeId', { required: true });
      register('lastEducationGradeName', { required: true });
    }

    if (registerAs === 'teacher') {
      register('startTeachingYear', { required: true });
    }

    if (registerAs === 'mentor') {
      register('companyName', { required: true });
    }

    if (registerAs === 'supporter' && !isStudentSupporter) {
      register('expertise', { required: true });
      register('workingPosition', { required: true });
      register('lastEducationGradeId', { required: true });
      register('lastEducationGradeName', { required: true });
      register('companyName', { required: true });
      unregister([
        'schoolGradeId',
        'schoolGradeName',
        'schoolTypeId',
        'schoolTypeName',
        'provinceId',
        'provinceName',
        'cityId',
        'cityName',
        'schoolId',
        'schoolName',
      ]);
    }

    if (registerAs === 'supporter' && isStudentSupporter) {
      unregister([
        'expertise',
        'workingPosition',
        'lastEducationGradeId',
        'lastEducationGradeName',
        'companyName',
      ]);
    }

    register('profileType');
    setValue('profileType', registerAs);
  }, [registerAs, isStudentSupporter, register, setValue, unregister]);

  return (
    <Form onSubmit={handleSubmit(doRegister)}>
      {Object.keys(errors)}
      <Card>
        <Card.Header className={styCardHeader}>
          <h2 className="text-capitalize">
            Daftar Sebagai &nbsp;
            {ACCOUNT_TYPE_ENUM[registerAs]}
          </h2>
        </Card.Header>
        <div className="border-bottom mb-3">
          <p className="text-center text-secondary">
            Sebelum memulai perjalananmu yuk cerita tentang dirimu
          </p>
        </div>
        <div className="container px-3 mb-4">
          <StepsComponent />
          <div className="row">
            <>
              {registerAs === 'supporter' && (
                <div className="col-12 pb-4">
                  <label className={`${styLabel} ${required}`}>
                    Apakah anda masih duduk di bangku sekolah?
                  </label>
                  <DropdownComponent
                    onSelected={handleSelectStudentSupporter}
                    dropdownItem={[
                      {
                        key: 1,
                        name: 'Ya',
                      },
                      {
                        key: 0,
                        name: 'Tidak',
                      },
                    ]}
                  />
                </div>
              )}
            </>
            {getForm.map((item) => {
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
                <div
                  key={item.key}
                  className={`col-md-${item.columns} col-sm-12 pb-4`}
                >
                  <label className={`${styLabel} ${item.required && required}`}>
                    {item.label}
                  </label>
                  {item.as === 'textfield' && (
                    <TextField
                      name={item.key}
                      ref={register({ required: true })}
                      className={styTextfield}
                    />
                  )}
                  {item.as === 'dropdown' && (
                    <DropdownComponent
                      dropdownItem={dropdownItems}
                      withSearch={item.key === 'schoolName'}
                      onSelected={(selected) => {
                        handleSelectDropdown(selected, item.key);
                      }}
                      withHardSearch={item.key === 'schoolName'}
                      onHardSearch={(q) => {
                        onSearch(q);
                      }}
                    />
                  )}
                  <span className="text-danger">
                    {errors[item.key] && 'Wajib diisi'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={`form-check ${styTerm}`}>
            <input
              type="checkbox"
              className="form-check-input"
              name="agreement"
              ref={register({ required: true })}
            />
            <Link href={tAndCLink}>
              <a href={tAndCLink} rel="noreferrer" target="_blank">
                <label
                  className={`form-check-label ml-4 ${
                    errors.agreement && 'text-danger'
                  }`}
                  htmlFor="exampleCheck1"
                >
                  Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta
                  Kebijakan Privasi
                </label>
              </a>
            </Link>
          </div>

          <div>
            <Button
              className="w-100 mt-5 font-weight-bold"
              type="submit"
              variant="warning"
              disabled={loading}
            >
              <div className="d-flex align-items-center justify-content-center">
                {loading && <Loading withText={false} />}
                <span>Daftar</span>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </Form>
  );
};

SignupForm.propTypes = {
  registerAs: string.isRequired,
};
export default SignupForm;
