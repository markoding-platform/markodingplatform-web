import { useFormContext } from 'react-hook-form';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import ModalComponent from 'components/Modal';
import DynamicPasswordModalContainer from '../PasswordModal';
import { styLabel } from '../styles.module.scss';

const AccountInfo = () => {
  const { register } = useFormContext();
  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowModal((prevState) => !prevState);
  };
  return (
    <>
      <Panel title="Informasi Akun">
        <Row>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} required`}>Nama Depan</label>
            <TextField
              placeholder="Tulis nama solusi digital kamu"
              defaultVal=""
              name="fName"
              ref={register({ required: true })}
              error={false}
              errorTxt="Harap mengisi nama depan"
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} required`}>Nama Belakang</label>
            <TextField
              placeholder=""
              defaultVal=""
              name="lName"
              ref={register({ required: true })}
              error={false}
              errorTxt="Harap mengisi nama belakang"
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} required`}>Email</label>
            <TextField
              placeholder=""
              defaultVal=""
              name="email"
              ref={register({ required: true })}
              error={false}
              errorTxt="Harap mengisi email"
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} required`}>Password</label>
            <div>
              <Button variant="outline-secondary" onClick={handleOpenModal}>
                Ubah Password
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="pb-4">
            <label className={styLabel}>Biografi</label>
            <TextField
              as="textarea"
              placeholder=""
              defaultVal=""
              name="bio"
              ref={register({ required: false })}
            />
          </Col>
        </Row>
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

export default AccountInfo;
