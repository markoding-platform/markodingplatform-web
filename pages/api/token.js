import nextConnect from 'next-connect';

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const tokenApi = nextConnect()
  .get(async (req, res) => {
    try {
      const response = await fetch(
        `${process.env.SKILVUL_API_URL}/oauth/token`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientId: process.env.SSO_CLIENT_ID,
            clientSecret: process.env.SSO_CLIENT_SECRET,
          }),
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { refreshToken } = await req.body;
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
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error,
      });
    }
  })
  .patch(async () => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default tokenApi;
