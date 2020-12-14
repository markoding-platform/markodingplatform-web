import Router from 'next/router';
import setCookie from 'utils/setCookie';
import MarkodingFetch from 'libraries/MarkodingFetch';

export const Login = (context, token, user) => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  } else {
    const expCookie = 86000;
    setCookie([
      { label: 'markodingToken', value: token, age: expCookie },
      { label: 'userName', value: user.name, age: expCookie },
      { label: 'userEmail', value: user.email, age: expCookie },
      { label: 'externalID', value: user.externalId, age: expCookie },
      { label: 'userID', value: user.id, age: expCookie },
    ]);
    Router.replace(`/`);
  }
};

export const Logout = (context) => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  } else {
    setCookie([
      { label: 'markodingToken', value: '', age: 0 },
      { label: 'userName', value: '', age: 0 },
      { label: 'userEmail', value: '', age: 0 },
      { label: 'externalID', value: '', age: 0 },
      { label: 'userID', value: '', age: 0 },
    ]);
    Router.replace(`/`);
  }
};

export const SSO = (context) => {
  if (typeof window === 'undefined') {
    context.res.writeHead(302, {
      Location: `/`,
    });
    context.res.end();
  } else {
    MarkodingFetch(`/auth/start`, {
      method: 'POST',
    }).then((response) => {
      if (response.ok) {
        const { sso, sig } = response;
        window.location.replace(
          `${process.env.SSO_WEB_URL}?sso=${sso}&sig=${sig}`
        );
      }
    });
  }
};
