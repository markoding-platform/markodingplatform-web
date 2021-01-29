import { useForm, FormProvider } from 'react-hook-form';
import { useCallback } from 'react';
import { shape, string } from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import SkilvulFetch from 'libraries/SkilvulFetch';
import AccountInfo from './AccountInfo';
import AccountMenu from './AccountMenu';
import BioComponent from './Bio';
import CompanyInfo from './CompanyInfo';
import { saveBtn, cancelBtn } from './styles.module.scss';

const ProfileContainer = ({
  user,
  email,
  firstName,
  lastName,
  birthDate,
  gender,
  userXID,
}) => {
  const { name, profile = {} } = user;
  const methods = useForm({
    defaultValues: {
      ...profile,
      firstName,
      lastName,
      email,
      gender,
      birthDate,
    },
  });

  const renderToast = (msg, error = false) => {
    if (error) {
      return toast.error(<p className="m-0 pl-3">{msg}</p>, {
        autoClose: 3000,
      });
    }
    return toast.success(<p className="m-0 pl-3">{msg}</p>, {
      autoClose: 3000,
    });
  };

  const onSubmit = useCallback(
    async (data) => {
      const { bio, telephone, expertise, ...rest } = data;
      const response = await SkilvulFetch(
        `/api/skilvul?path=/users/${userXID}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(rest),
        }
      );
      if (response && response.user) {
        renderToast('Berhasil memperbarui profil');
      } else {
        renderToast('Gagal memperbarui profil', true);
      }
    },
    [userXID]
  );

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
  email: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  birthDate: string.isRequired,
  gender: string.isRequired,
  userXID: string.isRequired,
};

export default ProfileContainer;
