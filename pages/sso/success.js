import PropTypes from 'prop-types';
import Router from 'next/router';
import MarkodingFetch from 'libraries/MarkodingFetch';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Login } from 'utils/auth';
import Loading from 'components/Loading';

const SsoSuccess = ({ sso, sig }) => {
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

    if (response.ok && response.result) {
      const { token, data } = response.result;
      await Login({}, token, data.user);
    } else {
      const message = response.message || 'Login gagal diproses';
      toast.error(message);
      Router.push('/');
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
