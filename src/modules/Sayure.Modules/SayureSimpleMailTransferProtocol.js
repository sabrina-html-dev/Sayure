const Sayure = require('../Sayure.js');
class SayureSimpleMailTransferProtocol {
    constructor() {
      const { SMTPServer } = require('smtp-server');
      this.server = new SMTPServer({
        onData(stream, session, callback) {
          let message = '';
          stream.on('data', (chunk) => message += chunk);
          stream.on('end', () => {
            console.log('Email received:\n', message);
            callback(null);
          });
        },
        disabledCommands: ['STARTTLS', 'AUTH'],
      });
    }

    start() {
      const PORT = 2525;
      this.server.listen(PORT, () => {
        console.log(`SMTP server listening on port ${PORT}`);
      });
    }
    }
module.exports = SayureSimpleMailTransferProtocol;