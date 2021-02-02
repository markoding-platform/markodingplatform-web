import nextConnect from 'next-connect';
import { checkAuthorization } from '../../middleware/authorization';

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const courseApi = nextConnect()
  .use(checkAuthorization)
  .get(async (req, res) => {
    try {
      const {
        query: { limit, offset },
        headers: { authorization },
      } = req;

      const response = await fetch(
        `${process.env.SKILVUL_API_URL}/products?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: {
            Authorization: authorization,
          },
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

export default courseApi;
