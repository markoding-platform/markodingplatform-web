import { useFormContext } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextField from 'components/TextField';

import { saveBtn, styLabel, cancelBtn } from '../styles.module.scss';

const PasswordModal = () => {
  const { register } = useFormContext();

  return (
    <div>
      <Row>
        <Col className="pb-4">
          <label className={`${styLabel} required`}>Password Sekarang</label>
          <TextField
            placeholder="Password"
            defaultVal=""
            type="password"
            name="pass"
            ref={register({ required: true })}
            error={false}
            errorTxt="Harap mengisi password"
          />
        </Col>
      </Row>
      <Row>
        <Col className="pb-4">
          <label className={`${styLabel} required`}>Password Baru</label>
          <TextField
            placeholder="Password"
            defaultVal=""
            type="password"
            name="oldPass"
            ref={register({ required: true })}
            error={false}
            errorTxt="Harap mengisi password"
          />
        </Col>
      </Row>
      <Row>
        <Col className="pb-4">
          <label className={`${styLabel} required`}>
            Konfirmasi Password Baru
          </label>
          <TextField
            placeholder="Password"
            defaultVal=""
            type="password"
            name="confirmPass"
            ref={register({ required: true })}
            error={false}
            errorTxt="Harap mengisi password"
          />
        </Col>
      </Row>
      <div className="d-flex justify-content-end">
        <Button variant="outline-secondary" className={cancelBtn}>
          Batal
        </Button>
        <Button className={saveBtn}>Simpan</Button>
      </div>
    </div>
  );
};

export default PasswordModal;
