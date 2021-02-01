import fetch from 'isomorphic-unfetch';
import getCookie from '../utils/getCookie';

const MarkodingFetch = async (url, options = {}, ctx, customToken = null) => {
  let markodingToken = await getCookie('markodingToken', ctx ? ctx.req : null);
  if (customToken) {
    markodingToken = customToken;
  }
  const { headers, ...otherOptions } = options || {};
  return fetch(process.env.MARKODING_API_URL + url, {
    headers: {
      Authorization: markodingToken,
      ...headers,
    },
    ...otherOptions,
  }).then(async (r) => {
    if (r.status === 401) {
      // handle relogin or other if token invalid
      return null;
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
      result,
    };
  });
};

export default MarkodingFetch;
