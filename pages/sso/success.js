import PropTypes from 'prop-types';
import Router from 'next/router';
import MarkodingFetch from 'libraries/MarkodingFetch';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Login } from 'utils/auth';
import Loading from 'components/Loading';
import getCookie from 'utils/getCookie';
import SkilvulFetch from 'libraries/SkilvulFetch';
import skilvulAccountMap from '../../map/skilvulAccountMap';

const updatePoint = async (token, data) => {
  const response = data;
  const { externalId } = response.user || {};
  if (externalId && externalId !== 'null') {
    const skilvulInfo = await SkilvulFetch(
      `/api/skilvul?path=/users/${externalId}`
    );
    if (skilvulInfo && skilvulInfo.user) {
      const userInfo = skilvulAccountMap(skilvulInfo.user) || {};
      const updated = await MarkodingFetch(
        '/users/skilvul-point',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify({
            skilvulPoint: userInfo.totalPoint,
          }),
        },
        {},
        token
      );
      if (updated && updated.ok) {
        response.user = { ...updated.result, externalId };
      }
    }
  }
  return response;
};

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
      let backPath = getCookie('backPath') || '/';
      const { token, data } = response.result;
      if (!data.profile) {
        backPath = '/signup';
      }
      const updatedData = await updatePoint(token, data);
      await Login({}, token, updatedData, backPath);
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
