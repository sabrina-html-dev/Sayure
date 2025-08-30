const net = require('net');
const tls = require('tls');
const Sayure = require('../Sayure.js');
class SayureInternetMessageAccessProtocol {
    constructor(host, port, useTLS) {
        this.host = host;
        this.port = port;
        this.useTLS = useTLS;
        this.socket = null;
        this.tagCounter = 1; // Começa em 1
        this.buffer = '';
        this.currentResolve = null; // Armazena a função de resolução
      }
      connect() {
        return new Promise((resolve, reject) => {
          const connectOptions = { host: this.host, port: this.port };
          const onConnect = () => {
            this.socket.on('data', (data) => this._onData(data));
            resolve();
          };
          if (this.useTLS) {
            this.socket = tls.connect(connectOptions, onConnect);
          } else {
            this.socket = net.connect(connectOptions, onConnect);
          }
          this.socket.on('error', (err) => reject(err));
        });
      }
      _onData(data) {
        this.buffer += data.toString();
        const lines = this.buffer.split('\r\n');
        if (lines[lines.length - 2]?.match(/^A\d{3} (OK|NO|BAD)/)) {
          this.currentResolve(this.buffer);
          this.buffer = '';
        }
      }
      _sendCommand(command) {
        return new Promise((resolve) => {
          const tag = 'A' + String(this.tagCounter).padStart(3, '0');
          this.tagCounter++;
          const fullCommand = `${tag} ${command}\r\n`;
          this.currentResolve = resolve;
          this.socket.write(fullCommand);
        });
      }
      async login(username, password) {
        const response = await this._sendCommand(`LOGIN "${username}" "${password}"`);
        return response;
      }
      async logout() {
          const response = await this._sendCommand('LOGOUT');
          this.socket.end();
          return response;
      }
      async listMailboxes() {
          const response = await this._sendCommand(`LIST "" "*"`);
          return response;
      }
      async selectMailbox(mailbox) {
          const response = await this._sendCommand(`SELECT "${mailbox}"`);
          return response;
      }
      async search(criteria = 'ALL') {
          const response = await this._sendCommand(`SEARCH ${criteria}`);
          return response;
      }
    }
module.exports = SayureInternetMessageAccessProtocol;