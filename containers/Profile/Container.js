import { useForm, FormProvider } from 'react-hook-form';
import { shape } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import AccountInfo from './AccountInfo';
import AccountMenu from './AccountMenu';
import BioComponent from './Bio';
import CompanyInfo from './CompanyInfo';
import { saveBtn, cancelBtn } from './styles.module.scss';

const ProfileContainer = ({ user }) => {
  const { name, email = '', profile = {} } = user;
  const methods = useForm({ defaultValues: { name, email, ...profile } });
  console.log({ profile });
  const onSubmit = (data) => console.log({ data });
  console.log(methods.errors);
  return (
    <FormProvider {...methods}>
      <Row>
        <Col lg="3" className="mb-4">
          <AccountMenu
            fName={name || ''}
            email={email || ''}
            profilePictureUrl={profile.profilePictureUrl || ''}
            schoolName={profile.schoolName || ''}
          />
        </Col>
        <Col lg="9">
          <form>
            <AccountInfo />
            <BioComponent />
            <CompanyInfo />
            <div className="d-flex justify-content-end">
              <Button variant="outline-secondary" className={cancelBtn}>
                Batal
              </Button>
              <Button
                className={saveBtn}
                onClick={methods.handleSubmit(onSubmit)}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </FormProvider>
  );
};

ProfileContainer.propTypes = {
  user: shape({
    email: null,
    exId: null,
    id: '',
    name: '',
  }).isRequired,
};

export default ProfileContainer;
