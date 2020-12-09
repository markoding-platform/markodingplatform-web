const { exec } = require('child_process');

export function deploy() {
  exec(
    'cd /home/ubuntu/markodingplatform-web/ && git fetch --all && git reset --hard origin/develop && git pull origin develop && npm install && npm run build && pm2 restart web',
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
}
