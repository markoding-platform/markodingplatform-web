import PropTypes from 'prop-types';
import MarkodingFetch from 'libraries/MarkodingFetch';
import { useEffect, useState } from 'react';
import { Login } from 'utils/auth';
import Loading from 'components/Loading';

const SsoSuccess = ({ sso, sig }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const getToken = async () => {
    const response = await MarkodingFetch('/auth/finish', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        sso,
        sig,
      }),
    });

    if (response.ok && response.token && response.data) {
      const { user } = response.data;
      await Login({}, response.token, user);
    } else {
      const message = response.message || 'Login gagal diproses';
      setErrorMessage(message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="text-center p-5">
      <div className="center w-25">
        <Loading />
      </div>
      {errorMessage && (
        <p className="text-center text-danger">{errorMessage}</p>
      )}
    </div>
  );
};

SsoSuccess.propTypes = {
  sso: PropTypes.string.isRequired,
  sig: PropTypes.string.isRequired,
};

SsoSuccess.getInitialProps = async (ctx) => {
  const { sso, sig } = await ctx.query;
  return {
    sso,
    sig,
  };
};

export default SsoSuccess;
