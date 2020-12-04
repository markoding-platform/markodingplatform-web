const CryptoJS = require('crypto-js');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

// const differenceMinute = (oldTimestamp) => {
//   const currentDate = new Date();
//   const now = currentDate.getTime();
//   const diff = (now - oldTimestamp) / 1000 / 60; // calculate to get minute
//   return Math.abs(Math.round(diff));
// };

const encodePayload = (payload) => {
  if (Buffer.from && Buffer.from !== Uint8Array.from) {
    const buff = Buffer.from(payload);
    return buff.toString('base64');
  }
  return null;
};

const decodePayload = (payload) => {
  if (Buffer.from && Buffer.from !== Uint8Array.from) {
    const buff = Buffer.from(payload, 'base64');
    return buff.toString('ascii');
  }
  return null;
};

const createNonce = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return encodePayload(timestamp);
};

const createSignature = (payload) => {
  const hash = CryptoJS.HmacSHA256(payload, process.env.SSO_CLIENT_SECRET);
  return CryptoJS.enc.Hex.stringify(hash);
};

export default (req, res) => {
  if (req.method === 'GET') {
    const payload = createNonce();
    const sig = createSignature(payload);
    res.statusCode = 200;
    res.json({
      success: true,
      data: {
        payload,
        sig,
      },
    });
  }
  if (req.method === 'POST') {
    const { sig, payload } = req.body;
    let data = {
      sig: false,
      payload: null,
    };

    // verify signature
    if (createSignature(payload) === sig) {
      const payloadString = decodeURIComponent(decodePayload(payload));
      // const replaceSeparator1 = payloadString.replace(/=/g, ':');
      // const replaceSeparator2 = replaceSeparator1.replace(/&/g, ',');
      // const payloadJson = JSON.parse(`{${replaceSeparator2}}`);
      // const { nonce } = payloadJson;
      // const time = decodePayload(nonce);
      // check nonce time created > 10 minute or not
      // if (time.length > 1 && differenceMinute(time[1]) < 20) {
      //   data = {
      //     sig: true,
      //     payload: payloadJson,
      //   };
      // }
      data = {
        sig: true,
        payload: payloadString,
      };
    }
    res.statusCode = 200;
    res.json({
      success: true,
      data,
    });
  }
};
