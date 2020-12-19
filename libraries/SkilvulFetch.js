import fetch from 'isomorphic-unfetch';
import setCookie from 'utils/setCookie';
import getCookie from '../utils/getCookie';
import SkilvulToken from './SkilvulToken';

const SkilvulFetch = async (
  url,
  options = {},
  ctx,
  customToken = null,
  retry = 0
) => {
  const clearSkilvulToken = async () => {
    return setCookie([{ label: 'skilvulToken', value: '', age: 0 }]);
  };

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
    if (r.status !== 200 && retry === 0) {
      await clearSkilvulToken();
      const newToken = await SkilvulToken(ctx);
      return SkilvulFetch(url, options, ctx, newToken, 1);
    }
    let result;
    try {
      result = await r.json();
      if (
        result.error &&
        result.error === 'ACCESS_TOKEN_NOT_VALID' &&
        retry === 0
      ) {
        await clearSkilvulToken();
        const newToken = await SkilvulToken(ctx);
        return SkilvulFetch(url, options, ctx, newToken, 1);
      }
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
