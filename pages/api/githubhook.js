const { exec } = require('child_process');
const CryptoJS = require('crypto-js');

const dotEnvResult = require('dotenv').config();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const deployAction = async () => {
  exec(
    'cd /home/ubuntu/markodingplatform-web/ && git reset -–hard HEAD && git pull develop && npm install && npm run build && pm2 restart web',
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
};

export default (req, res) => {
  if (req.method === 'POST') {
    const githubSig = req.headers['x-hub-signature'] || '';
    const githubEvent = req.headers['x-github-event'] || '';
    const hash = CryptoJS.HmacSHA1(
      JSON.stringify(req.body),
      process.env.SECRET
    );
    const localSig = `sha1=${CryptoJS.enc.Hex.stringify(hash)}`;
    console.log('githubEvent', githubEvent);
    console.log('github Signature', githubSig);
    console.log('local Signature', localSig);
    if (githubSig === localSig) {
      // eslint-disable-next-line camelcase
      const { action, pull_request } = req.body || {};
      // eslint-disable-next-line camelcase
      const { merged } = pull_request || false;
      console.log('merged status', merged);
      console.log('action status', action);
      if (action === 'closed' && githubEvent === 'pull_requests' && merged) {
        deployAction().catch().then();
      }
    }
    res.statusCode = 200;
    res.json({
      success: true,
      data: [],
    });
  } else {
    res.statusCode = 404;
    res.json({
      success: false,
      message: 'Data not found',
    });
  }
};
