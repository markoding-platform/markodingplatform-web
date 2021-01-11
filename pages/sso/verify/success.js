import { Logout } from 'utils/auth';

const SsoVerifySuccess = () => {
  Logout({}, false);

  return (
    <div className="text-center">
      <p>Email kamu berhasil di verifikasi</p>
      <p>Silahkan login kembali dengan akun kamu</p>
    </div>
  );
};

export default SsoVerifySuccess;
