import nextConnect from 'next-connect';

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const schoolGradeApi = nextConnect()
  .get(async (req, res) => {
    try {
      const {
        query: { path },
        headers: { authorization },
      } = req;

      const response = await fetch(`${process.env.SKILVUL_API_URL}${path}`, {
        method: 'GET',
        headers: {
          Authorization: authorization,
        },
      });
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

export default schoolGradeApi;