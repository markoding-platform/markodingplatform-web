import fetch from 'isomorphic-unfetch';
import getCookie from '../utils/getCookie';
import SkilvulToken from './SkilvulToken';

const SkilvulFetch = async (url, options = {}, ctx, customToken = null) => {
  let skilvulToken = await getCookie('skilvulToken', ctx ? ctx.req : null);
  if (customToken && customToken.value) {
    skilvulToken = customToken.value;
  }
  const { headers, ...otherOptions } = options || {};
  return fetch(process.env.WEB_URL + url, {
    headers: {
      Authorization: `Bearer ${skilvulToken}`,
      ...headers,
    },
    ...otherOptions,
  }).then(async (r) => {
    if (r.status !== 200) {
      const newToken = await SkilvulToken(ctx);
      return SkilvulFetch(url, options, ctx, newToken);
    }
    let result;
    try {
      result = await r.json();
    } catch (e) {
      result = {};
    }
    return {
      status: r.status,
      ok: r.ok,
      ...result,
    };
  });
};

export default SkilvulFetch;
