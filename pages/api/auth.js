const CryptoJS = require('crypto-js');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const nonce = () => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  const md5 = CryptoJS.MD5(timestamp);
  return CryptoJS.enc.Hex.stringify(md5);
};

const signature = (payload) => {
  const hash = CryptoJS.HmacSHA256(payload, process.env.SSO_CLIENT_SECRET);
  return CryptoJS.enc.Hex.stringify(hash);
};

export default (req, res) => {
  if (req.method === 'GET') {
    const payload = nonce();
    const sig = signature(payload);
    res.statusCode = 200;
    res.json({
      success: true,
      data: {
        payload,
        sig,
      },
    });
  }
};
