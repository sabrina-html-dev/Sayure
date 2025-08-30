const Sayure = require('../Sayure.js');
class SayureSecureShellServer {
    constructor() {
      this.server = new Server();
    }

    start() {
      this.server.on('connection', (client) => {
        console.log('SSH client connected');

        client.on('authentication', (ctx) => {
          if (ctx.method === 'password'
              && ctx.username === 'user'
              && ctx.password === 'password') {
            ctx.accept();
          } else {
            ctx.reject();
          }
        });

        client.on('ready', () => {
          console.log('Client authenticated');

          client.on('session', (accept, reject) => {
            const session = accept();

            session.on('exec', (accept, reject, info) => {
              console.log('Client wants to execute: ' + info.command);
              const stream = accept();
              stream.write('Command received: ' + info.command + '\n');
              stream.exit(0);
              stream.end();
            });
          });
        });

        client.on('end', () => {
          console.log('Client disconnected');
        });
      });

      const PORT = 2222;
      this.server.listen(PORT, '0.0.0.0', () => {
        console.log(`SSH server listening on port ${PORT}`);
      });
    }
}
module.exports = SayureSecureShellServer;