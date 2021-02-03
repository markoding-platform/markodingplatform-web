import nextConnect from 'next-connect';
import fs from 'fs';
import dayjs from 'dayjs';

dayjs.locale('id');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const getToken = async () => {
  try {
    const response = await fetch(`${process.env.SKILVUL_API_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_CLIENT_SECRET,
      }),
    });
    return response.json();
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

const getRefreshToken = async (refreshToken) => {
  try {
    const response = await fetch(
      `${process.env.SKILVUL_API_URL}/oauth/token/refresh`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: process.env.SSO_CLIENT_ID,
          refreshToken,
        }),
      }
    );
    return response.json();
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

const writeFile = async (data) => {
  // set token data
  const stringifyData = JSON.stringify(data);
  // write to file token
  fs.writeFile('skilvul.token.json', stringifyData, () => {});
  return true;
};

const tokenApi = nextConnect()
  .get(async (req, res) => {
    const tokenFile = fs.readFileSync('skilvul.token.json', 'utf8');
    if (tokenFile !== '') {
      const obj = JSON.parse(tokenFile);
      const now = dayjs(new Date());
      const end = dayjs(obj.exp);
      const duration = now.diff(end, 'hour');
      if (duration > 12) {
        // expired call refreshToken
        const resTokenRef = getRefreshToken(obj.refreshToken);
        if (
          resTokenRef &&
          resTokenRef.accessToken &&
          resTokenRef.error === null
        ) {
          const newObj = obj;
          newObj.accessToken = resTokenRef.accessToken;
          writeFile(newObj);
          res.status(200).json(newObj);
        } else {
          const resToken = await getToken();
          if (resToken && !resToken.error) {
            const data = {
              accessToken: resToken.accessToken,
              refreshToken: resToken.refreshToken,
              exp: dayjs(new Date()),
            };
            writeFile(data);
            res.status(200).json(data);
          } else {
            res.status(500).json(resToken);
          }
        }
      } else {
        res.status(200).json(obj);
      }
    } else {
      const resToken = await getToken();
      if (resToken && !resToken.error) {
        const data = {
          accessToken: resToken.accessToken,
          refreshToken: resToken.refreshToken,
          exp: dayjs(new Date()),
        };
        writeFile(data);
        res.status(200).json(data);
      } else {
        res.status(500).json(resToken);
      }
    }
  })
  .patch(async () => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default tokenApi;
