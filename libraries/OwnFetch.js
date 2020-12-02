import fetch from 'isomorphic-unfetch';

const OwnFetch = async (url, options = {}) => {
  const { headers, ...otherOptions } = options || {};
  return fetch(process.env.WEB_URL + url, {
    headers: {
      ...headers,
    },
    ...otherOptions,
  }).then(async (r) => {
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

export default OwnFetch;
