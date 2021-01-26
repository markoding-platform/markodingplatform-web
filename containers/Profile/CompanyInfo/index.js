// import { useFormContext } from 'react-hook-form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';
// import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';

import { styLabel } from '../styles.module.scss';

const CompanyInfo = () => {
  // const { register } = useFormContext();

  const handleSelectSchoolGradeName = () => {
    return false;
  };

  const handleSelectSchoolName = () => {
    return false;
  };
  return (
    <Panel title="Informasi Akun">
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Jenjang</label>
          <DropdownComponent
            onSelected={handleSelectSchoolGradeName}
            dropdownItem={[]}
            defaultVal=""
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
            dropdownItem={[]}
            defaultVal=""
            inputName="schoolGradeName"
            name="schoolGradeName"
          />
        </Col>
      </Row>
    </Panel>
  );
};

export default CompanyInfo;
