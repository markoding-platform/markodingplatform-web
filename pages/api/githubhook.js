const { exec } = require('child_process');

const deployAction = async () => {
  exec(
    'cd /home/ubuntu/markodingplatform-web/ && git reset –hard HEAD && git pull && npm install && npm run build && pm2 restart web',
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
    const gihubSecret = req.headers['x-hub-signature'] || '';
    const githubEvent = req.headers['x-github-event'] || '';
    const merged = req.body.pull_request || '';
    console.log(gihubSecret);
    if (githubEvent === 'push' && merged) {
      deployAction().catch().then();
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
