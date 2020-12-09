import nextConnect from 'next-connect';
import { deploy } from '../../middleware/deployment';

const CryptoJS = require('crypto-js');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const authApi = nextConnect()
  .post(async (req, res) => {
    const githubSig = req.headers['x-hub-signature'] || '';
    const githubEvent = req.headers['x-github-event'] || '';
    const hash = CryptoJS.HmacSHA1(
      JSON.stringify(req.body),
      process.env.GITHUB_HOOK_BRANCH
    );
    const localSig = `sha1=${CryptoJS.enc.Hex.stringify(hash)}`;
    if (githubSig === localSig) {
      // eslint-disable-next-line camelcase
      const { action, pull_request } = req.body || {};
      // eslint-disable-next-line camelcase
      const { merged } = pull_request || false;
      if (action === 'closed' && githubEvent === 'pull_request' && merged) {
        deploy();
      }
    }
    res.status(200).json({
      error: false,
      message: 'success',
    });
  })
  .patch(async () => {
    throw new Error('Throws me around! Error can be caught and handled.');
  });

export default authApi;
