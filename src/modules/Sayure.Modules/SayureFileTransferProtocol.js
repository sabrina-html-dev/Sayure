class SayureFileTransferProtocol {
  constructor(nasPath = './') {
    const FtpSrv = require('ftp-srv');
    this.server = new FtpSrv({
      url: "ftp://127.0.0.1:21",
      pasv_url: '127.0.0.1', // Necessário para alguns clientes
      // authTimeout: 300, // Tempo limite para autenticação em segundos
    });
    this.nasPath = nasPath; // Caminho para o NAS ou diretório
    // Você pode armazenar usuários aqui ou em um banco de dados da Sayure
    this.users = [
      { username: 'Sayure-AI', password: 'my-secret-password', rootDir: nasPath },
      { username: 'Guest', password: 'guest-password', rootDir: './guest_files' }
    ];
  }

  start() {
    this.server.on('login', ({ connection, username, password }, resolve, reject) => {
      // Encontra o usuário na lista interna da Sayure
      const user = this.users.find(u => u.username === username);
      
      if (user && user.password === password) {
        // Autentica com sucesso e define o diretório raiz para o usuário
        resolve({ root: user.rootDir });
        console.log(`User ${username} logged in successfully.`);
      } else {
        // Rejeita o login se as credenciais estiverem incorretas
        reject(new Error("Invalid username or password"));
        console.warn(`Failed login attempt for user ${username}.`);
      }
    });

    this.server.listen()
      .then(() => {
        console.log(`FTP server listening on port 21. Root directory is: ${this.nasPath}`);
      })
      .catch(err => {
        console.error("Failed to start FTP server:", err);
      });
  }

  stop() {
    return this.server.close().then(() => {
        console.log("FTP server stopped.");
    });
  }
    }
module.exports = SayureFileTransferProtocol;