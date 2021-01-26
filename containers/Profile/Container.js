import { useForm, FormProvider } from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import AccountInfo from './AccountInfo';
import AccountMenu from './AccountMenu';
import BioComponent from './Bio';
import CompanyInfo from './CompanyInfo';
import { saveBtn, cancelBtn } from './styles.module.scss';

const ProfileContainer = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <Row>
        <Col lg="3" className="mb-4">
          <AccountMenu />
        </Col>
        <Col lg="9">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <AccountInfo />
            <BioComponent />
            <CompanyInfo />
            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" className={cancelBtn}>
                Batal
              </Button>
              <Button className={saveBtn}>Simpan</Button>
            </div>
          </form>
        </Col>
      </Row>
    </FormProvider>
  );
};

export default ProfileContainer;
