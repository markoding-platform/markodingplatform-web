import { useCallback, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import SkilvulFetch from 'libraries/SkilvulFetch';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';

import DropdownComponent from 'components/Dropdown';

import { locationSchoolMap, schoolGradeMap } from 'map/dropdownMap';
import { styLabel } from '../styles.module.scss';

const CompanyInfo = () => {
  const { register, control, getValues } = useFormContext();
  const [schoolGrades, setSchoolGrades] = useState([]);
  const account = control?.defaultValuesRef?.current;
  const [schools, setSchools] = useState([]);

  const getSchoolGrades = useCallback(async () => {
    const sgResult = await SkilvulFetch('/api/skilvul?path=/schools/grades');
    if (sgResult && sgResult.schoolGrades) {
      setSchoolGrades(sgResult.schoolGrades.map(schoolGradeMap));
    }
  }, []);

  const getSchools = useCallback(async () => {
    const schoolGradeId = await getValues('schoolGradeId');
    const provinceId = await getValues('provinceId');
    const cityId = await getValues('cityId');
    const schoolRes = await SkilvulFetch(
      `/api/schools?schoolGradeId=${schoolGradeId}&provinceId=${provinceId}&cityId=${cityId}`
    );
    if (schoolRes && schoolRes.schools) {
      setSchools(schoolRes.schools.map(locationSchoolMap));
    }
  }, [getValues]);

  const handleSelectSchoolGradeName = () => {
    return false;
  };

  const handleSelectSchoolName = () => {
    return false;
  };
  useEffect(() => {
    register('schoolGradeName', {
      required: false,
      defaultVal: account.schoolGradeName,
    });
    register('schoolGradeId', {
      required: false,
      defaultVal: account.schoolGradeId,
    });
    register('schoolName', {
      required: false,
      defaultVal: account.schoolName,
    });
    register('schoolId', {
      required: false,
      defaultVal: account.schoolId,
    });

    getSchoolGrades();
    getSchools();
  }, [account, getSchoolGrades, getSchools, register]);
  return (
    <Panel title="Informasi Akun">
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Jenjang</label>
          <DropdownComponent
            onSelected={handleSelectSchoolGradeName}
            dropdownItem={schoolGrades}
            defaultVal={account.schoolGradeName}
            inputName="schoolGradeName"
            name="schoolGradeName"
          />
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>
            Nama Instansi Pendidikan
          </label>
          <DropdownComponent
            onSelected={handleSelectSchoolName}
            dropdownItem={schools}
            defaultVal={account.schoolName}
            inputName="schoolGradeName"
            name="schoolGradeName"
          />
        </Col>
      </Row>
    </Panel>
  );
};

export default CompanyInfo;
