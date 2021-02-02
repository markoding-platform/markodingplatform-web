import Router from 'next/router';
import setCookie from 'utils/setCookie';
import MarkodingFetch from 'libraries/MarkodingFetch';
import getCookie from 'utils/getCookie';
import SkilvulFetch from 'libraries/SkilvulFetch';

export const Login = (context, token, data, backUrl = '/') => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: backUrl,
    });
    context.res.end();
  } else {
    const { user, profile, idea } = data;
    console.log({ data });
    const expCookie = 86000;
    const userProfile = profile ? JSON.stringify(profile) : null;
    const userIdea = idea ? JSON.stringify(idea) : null;
    const userAccount = user ? JSON.stringify(user) : null;
    console.log({ user });
    const { externalId } = user;
    setCookie([
      { label: 'markodingToken', value: token, age: expCookie },
      { label: 'userName', value: user.name, age: expCookie },
      { label: 'userID', value: user.id, age: expCookie },
      { label: 'userXID', value: externalId, age: expCookie },
      { label: 'userIdea', value: userIdea, age: expCookie },
      { label: 'userProfile', value: userProfile, age: expCookie },
      { label: 'userAccount', value: userAccount, age: expCookie },
    ]);
    Router.replace(backUrl);
  }
};

export const Logout = async (context, back = true) => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  } else {
    const userXID = await getCookie('userXID');
    await SkilvulFetch(`/api/skilvul?path=/users/${userXID}/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    await setCookie([
      { label: 'markodingToken', value: '', age: 0 },
      { label: 'userName', value: '', age: 0 },
      { label: 'userID', value: '', age: 0 },
      { label: 'userXID', value: '', age: 0 },
      { label: 'userProfile', value: null, age: 0 },
      { label: 'userIdea', value: null, age: 0 },
      { label: 'userAccount', value: null, age: 0 },
    ]);
    if (back) {
      await Router.replace(`/`);
    }
  }
};

export const SSO = (context) => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  } else {
    const path = window.location.pathname;
    setCookie([{ label: 'backPath', value: path, age: 1500 }]);
    MarkodingFetch(`/auth/start`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        const { sso, sig } = response.result;
        window.location.replace(
          `${process.env.SSO_WEB_URL}?sso=${sso}&sig=${sig}`
        );
      }
    });
  }
};
