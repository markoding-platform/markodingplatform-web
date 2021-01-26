import { useFormContext } from 'react-hook-form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import DropdownComponent from 'components/Dropdown';

import { styLabel } from '../styles.module.scss';

const genderOption = [
  { id: 0, text: 'Laki-laki', value: 'laki-laki' },
  { id: 1, text: 'Perempuan', value: 'perempuan' },
];
const BioComponent = () => {
  const { register } = useFormContext();

  const handleSelectGender = () => {
    // setValue('problemArea', payload.value);
  };
  const handleSelectProvince = () => {
    // setValue('problemArea', payload.value);
  };
  const handleSelectWorkingPos = () => {
    // setValue('problemArea', payload.value);
  };

  return (
    <Panel title="Informasi Akun">
      <Row>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Tanggal Lahir</label>
          <TextField
            placeholder=""
            defaultVal=""
            name="dob"
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
            defaultVal=""
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
            placeholder="Masukan nomor telepon/whatsapp"
            defaultVal=""
            name="phone"
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
            dropdownItem={[]}
            defaultVal=""
            inputName="province"
            name="province"
          />
        </Col>
        <Col lg="6" sm="12" className="pb-4">
          <label className={`${styLabel} required`}>Kota/Kabupaten</label>
          <DropdownComponent
            onSelected={handleSelectProvince}
            dropdownItem={[]}
            defaultVal=""
            inputName="city"
            name="city"
          />
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
            defaultVal=""
            inputName="workingPosition"
            name="workingPosition"
          />
        </Col>
      </Row>
    </Panel>
  );
};

export default BioComponent;
