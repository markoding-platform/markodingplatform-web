import nextConnect from 'next-connect';
import { createNonce, createSignature } from '../../middleware/encodeDecode';

const authApi = nextConnect()
  .get(async (req, res) => {
    const payload = await createNonce();
    const sig = await createSignature(payload);
    res.status(200).json({
      error: false,
      data: {
        payload,
        sig,
      },
    });
  })
  .patch(async () => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default authApi;
