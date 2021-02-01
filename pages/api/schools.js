import nextConnect from 'next-connect';

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const schoolsApi = nextConnect()
  .get(async (req, res) => {
    try {
      const {
        query: { schoolGradeId, provinceId, cityId, search },
        headers: { authorization },
      } = req;

      const response = await fetch(
        `${process.env.SKILVUL_API_URL}/schools?schoolGradeId=${schoolGradeId}&provinceId=${provinceId}&cityId=${cityId}&search=${search}`,
        {
          method: 'GET',
          headers: {
            Authorization: authorization,
          },
        }
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(500).json({
        error: true,
        message: e,
      });
    }
  })
  .patch(async () => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default schoolsApi;
