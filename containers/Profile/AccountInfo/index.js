import { useFormContext } from 'react-hook-form';

import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Panel from 'components/Panel';
import TextField from 'components/TextField';
import ModalComponent from 'components/Modal';
import DynamicPasswordModalContainer from '../PasswordModal';
import { styLabel, required } from '../styles.module.scss';

const AccountInfo = () => {
  const { register, control, errors } = useFormContext();

  const [isShowModal, setIsShowModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowModal((prevState) => !prevState);
  };

  const account = control?.defaultValuesRef?.current || {};
  console.log({ account });
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
              errorTxt="Harap mengisi nama depan"
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Nama Belakang</label>
            <TextField
              defaultVal={account.lastName}
              name="lastName"
              ref={register({ required: false })}
              error={!!errors.lastName}
              errorTxt="Harap mengisi nama belakang"
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Email</label>
            <TextField
              defaultVal={account.email}
              name="email"
              ref={register({ required: false })}
              error={false}
            />
          </Col>
          <Col lg="6" sm="12" className="pb-4">
            <label className={`${styLabel} ${required}`}>Password</label>
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
              defaultVal={account.bio}
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

// AccountInfo.defaultProps = {
//   lName: '',
//   bio: '',
// };

// AccountInfo.propTypes = {
//   fName: string.isRequired,
//   lName: string,
//   email: string.isRequired,
//   bio: string,
// };

export default AccountInfo;
