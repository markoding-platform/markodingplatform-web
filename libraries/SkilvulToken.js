import fetch from 'isomorphic-unfetch';
import setCookie from '../utils/setCookie';
import getCookie from '../utils/getCookie';

const SkilvulToken = async (ctx = null) => {
  const skilvulToken = await getCookie('skilvulToken', ctx ? ctx.req : null);
  if (
    skilvulToken === null ||
    skilvulToken === '' ||
    skilvulToken === 'undefined'
  ) {
    return fetch(`${process.env.WEB_URL}/api/token`).then(async (r) => {
      if (r.status !== 200) {
        window.stop();
        return null;
      }
      try {
        const res = await r.json();
        const expCookie = 86000;
        const data = {
          label: 'skilvulToken',
          value: res.accessToken,
          age: expCookie,
        };
        await setCookie([data]);
        return data;
      } catch (e) {
        window.stop();
        return null;
      }
    });
  }
};

export default SkilvulToken;
