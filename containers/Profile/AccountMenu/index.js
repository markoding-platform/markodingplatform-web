import { toast } from 'react-toastify';

import MarkodingFetch from 'libraries/MarkodingFetch';
import UploadComponent from 'containers/Profile/UploadAvatar';

import {
  profileCard,
  profileSection,
  contentTitle,
} from './styles.module.scss';

const AccountMenu = ({ fName, email, imageUrl, schoolName }) => {
  const renderToast = ({ msg, error = false, time = 3000 }) => {
    if (error) {
      return toast.error(<p className="m-0 pl-3">{msg}</p>, {
        autoClose: time,
      });
    }
    return toast.success(<p className="m-0 pl-3">{msg}</p>, {
      autoClose: time,
    });
  };

  const handleUpdateProfileImage = async (url) => {
    const response = await MarkodingFetch('/users/image', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ imageUrl: url }),
    });
    if (response.ok) {
      renderToast({ msg: 'Berhasil mengubah foto profil' });
    } else {
      renderToast({ msg: 'Gagal mengubah foto profil', error: true });
    }
  };

  return (
    <div className={profileCard}>
      <div className="text-center">
        <UploadComponent
          onUploadImg={handleUpdateProfileImage}
          defaultVal={imageUrl}
        />
      </div>
      <div className={`pt-3 ${profileSection}`}>
        <p className={contentTitle}>{fName}</p>
        <p className="m-0 text-break">{email}</p>
        <p className="m-0 text-break">{schoolName}</p>
      </div>
    </div>
  );
};

export default AccountMenu;
