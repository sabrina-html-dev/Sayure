// Importação dos módulos necessários
const express = require('express');
const http = require('http');
const https = require('https');
const socketIO = require('socket.io');
const mysql = require('mysql2');
const imap = (require('C:/Users/PMI/AppData/Local/Microsoft/TypeScript/5.7/node_modules/@types/imap-simple/index.d.ts'))?require('C:/Users/PMI/AppData/Local/Microsoft/TypeScript/5.7/node_modules/@types/imap-simple/index.d.ts'): null;// till add other module equals to imap module.
const cors = require('cors');
const ssh2 = require('C:/Users/PMI/AppData/Local/Microsoft/TypeScript/5.7/node_modules/@types/ssh2/index.d.ts');
const crypto = require('crypto');
const webpush = require('C:/Users/PMI/AppData/Local/Microsoft/TypeScript/5.7/node_modules/@types/web-push/index.d.ts');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurações gerais
app.use(express.json());
app.use(cors());  // habilita o CORS

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'my_database'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL conectado');
});

// Configuração do IMAP para recebimento de emails
const imapConfig = {
  imap: {
    user: 'sabrinahtml2@gmail.com',
    password: 'sua_senha',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  }
};

// Configuração do WebPush para notificações push
const publicVapidKey = 'SUA_PUBLIC_VAPID_KEY';
const privateVapidKey = 'SUA_PRIVATE_VAPID_KEY';
webpush.setVapidDetails('mailto:seu_email@gmail.com', publicVapidKey, privateVapidKey);

// Configuração do SSH
const sshClient = new ssh2.Client();
sshClient.on('ready', () => {
  console.log('Conexão SSH estabelecida');
});

// Rota para enviar notificação via WebPush
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const payload = JSON.stringify({ title: 'Push Test', body: 'Notificação enviada!' });

  webpush.sendNotification(subscription, payload)
    .then(result => res.status(200).json({ message: 'Notificação enviada' }))
    .catch(err => console.error(err));
});

// Função para encriptar dados com Crypto
const encrypt = (text) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
};

// Configuração de rotas REST (GET, POST, PUT, DELETE, CONNECT, OPTIONS)
app.get('/', (req, res) => {
    switch(req.url){
        case "/mail/compose":()=>{
          res.send("Method GET route Mail");
        };break;
        case "/users/":()=>{
          res.send("Get/Users");
        };break;
        default: res.send('GET request received');
    }
});
app.post('/', (req, res) => res.send('POST request received'));
app.put('/', (req, res) => res.send('PUT request received'));
app.delete('/', (req, res) => res.send('DELETE request received'));
app.options('/', (req, res) => res.send('OPTIONS request received'));
app.connect('/', (req, res) => res.send('CONNECT request received'));

// Conexão Socket.io para comunicação em tempo real
io.on('connection', (socket) => {
  console.log('Usuário conectado');
  
  // Evento personalizado
  socket.on('mensagem', (data) => {
    console.log(`Mensagem recebida: ${data}`);
    socket.broadcast.emit('mensagem', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Função para verificar emails no IMAP
const checkEmails = () => {
  imap.connect(imapConfig)
    .then((connection) => {
      return connection.openBox('INBOX').then(() => {
        const searchCriteria = ['UNSEEN'];
        const fetchOptions = { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'], struct: true };
        
        return connection.search(searchCriteria, fetchOptions).then((messages) => {
          messages.forEach((msg) => {
            const parts = imap.getParts(msg.attributes.struct);
            console.log(parts);
          });
          connection.end();
        });
      });
    }).catch((err) => console.error(err));
};

// Disparar email usando SMTP
app.post('/send-email', (req, res) => {
//   const mailOptions = {
//     from: 'seu_email@gmail.com',
//     to: req.body.to,
//     subject: req.body.subject,
//     text: req.body.text
//   };

//   smtpTransporter.sendMail(mailOptions, (error, info) => {
//     if (error) return res.status(500).send(error.toString());
//     res.status(200).json({ message: 'Email enviado com sucesso' });
//   });
// Importando o módulo smtp-connection
const SMTPConnection = require('C:/Users/PMI/Documents/Server/node_modules/smtp-connection/lib/smtp-connection');

// Configuração da conexão SMTP
const connection = new SMTPConnection({
  host: 'smtp.exemplo.com',       // Endereço do servidor SMTP
  port: 587,                       // Porta do servidor SMTP
  secure: false                    // Defina como true se a porta for 465
});

// Função para enviar o email
function sendEmail() {
  connection.connect(() => {
    console.log('Conectado ao servidor SMTP');

    // Autenticando o usuário
    connection.login({
      user: 'seuemail@exemplo.com', // Usuário SMTP
      pass: 'suaSenha'              // Senha SMTP
    }, (error) => {
      if (error) {
        console.log('Erro de autenticação:', error);
        return;
      }

      console.log('Autenticado com sucesso');

      // Definindo o conteúdo do email
      const email = {
        from: 'seuemail@exemplo.com',
        to: 'destinatario@exemplo.com',
        subject: 'Assunto do Email',
        text: 'Conteúdo do email em texto',
        html: '<h1>Conteúdo HTML do email</h1>'
      };

      // Enviando o email
      connection.send({
        from: email.from,
        to: email.to
      }, `Subject: ${email.subject}\r\n\r\n${email.text}`, (err, info) => {
        if (err) {
          console.log('Erro ao enviar email:', err);
        } else {
          console.log('Email enviado:', info);
        }

        // Fechando a conexão após o envio
        connection.quit();
      });
    });
  });
}

// Chamada da função para enviar o email
sendEmail();

});

// Rota para encriptar dados com Crypto
app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  const encrypted = encrypt(text);
  res.json({ encrypted });
});

// Iniciar o servidor
server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
/*
Para criar uma interface de visualização e gerenciamento de e-mails com as funcionalidades de envio e recebimento, podemos expandir o servidor Node.js para incluir um frontend com um banco de dados. Vamos criar um fluxo onde:

Os e-mails recebidos serão armazenados em um banco de dados.
Um frontend será criado para exibir, enviar e gerenciar esses e-mails.
Aqui está uma abordagem completa:

1. Setup: Banco de Dados (SQLite)
Para simplificar, podemos usar o SQLite para armazenar os e-mails em uma tabela emails, que armazenará detalhes como remetente, destinatário, assunto, e corpo da mensagem.

bash
Копировать код
npm install sqlite3 express smtp-server smtp-connection mailparser cors
2. Configurando o Banco de Dados
Vamos configurar o banco de dados para armazenar os e-mails.

javascript
Копировать код
// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./emails.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender TEXT,
      receiver TEXT,
      subject TEXT,
      body TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
3. Backend: Configurando Servidor SMTP e API REST com Express
Aqui, o servidor SMTP armazenará os e-mails recebidos no banco de dados e as rotas da API no Express permitirão a visualização e o envio de e-mails.

javascript
Копировать код
// server.js
const express = require('express');
const { SMTPServer } = require('smtp-server');
const SMTPConnection = require('smtp-connection');
const simpleParser = require('mailparser').simpleParser;
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Configurando o servidor SMTP para receber emails
const smtpServer = new SMTPServer({
  authOptional: true,
  onData(stream, session, callback) {
    simpleParser(stream)
      .then(parsed => {
        const { from, to, subject, text } = parsed;
        db.run(
          `INSERT INTO emails (sender, receiver, subject, body) VALUES (?, ?, ?, ?)`,
          [from.text, to.text, subject, text],
          err => {
            if (err) console.error('Erro ao salvar email:', err);
          }
        );
        console.log(`Email recebido de: ${from.text}`);
      })
      .catch(err => console.error('Erro ao processar email:', err))
      .finally(() => callback());
  },
});

smtpServer.listen(2525, () => {
  console.log('Servidor SMTP escutando na porta 2525');
});

// Rota para listar emails
app.get('/emails', (req, res) => {
  db.all('SELECT * FROM emails ORDER BY timestamp DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota para enviar email
app.post('/send', (req, res) => {
  const { host, port, secure, auth, from, to, subject, text } = req.body;
  const connection = new SMTPConnection({ host, port, secure });

  connection.connect(() => {
    connection.login(auth, err => {
      if (err) return res.status(500).json({ error: 'Falha na autenticação' });

      const message = `From: ${from}\nTo: ${to}\nSubject: ${subject}\n\n${text}`;
      connection.send({ from, to }, message, err => {
        if (err) return res.status(500).json({ error: 'Erro ao enviar email' });
        res.json({ message: 'Email enviado com sucesso' });
        connection.quit();
      });
    });
  });
});

app.listen(3000, () => {
  console.log('API de emails escutando na porta 3000');
});
4. Frontend: Interface para Gerenciamento de E-mails
Para o frontend, utilizaremos HTML e JavaScript. A interface permitirá visualizar os e-mails recebidos e enviar novos e-mails.

html
Копировать код
<!-- index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerenciador de Emails</title>
</head>
<body>
  <h1>Gerenciador de Emails</h1>

  <section>
    <h2>Enviar Email</h2>
    <form id="sendEmailForm">
      <input type="email" id="to" placeholder="Para" required>
      <input type="text" id="subject" placeholder="Assunto" required>
      <textarea id="text" placeholder="Mensagem" required></textarea>
      <button type="submit">Enviar</button>
    </form>
  </section>

  <section>
    <h2>Caixa de Entrada</h2>
    <ul id="emailList"></ul>
  </section>

  <script>
    async function fetchEmails() {
      const response = await fetch('http://localhost:3000/emails');
      const emails = await response.json();
      const emailList = document.getElementById('emailList');
      emailList.innerHTML = '';
      emails.forEach(email => {
        const li = document.createElement('li');
        li.textContent = `De: ${email.sender} | Assunto: ${email.subject} | ${email.timestamp}`;
        emailList.appendChild(li);
      });
    }

    document.getElementById('sendEmailForm').addEventListener('submit', async event => {
      event.preventDefault();
      const to = document.getElementById('to').value;
      const subject = document.getElementById('subject').value;
      const text = document.getElementById('text').value;

      await fetch('http://localhost:3000/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'smtp.exemplo.com',
          port: 587,
          secure: false,
          auth: { user: 'seu-usuario', pass: 'sua-senha' },
          from: 'seu-email@exemplo.com',
          to,
          subject,
          text
        })
      });
      alert('Email enviado com sucesso!');
      fetchEmails();
    });

    // Carregar emails ao carregar a página
    fetchEmails();
  </script>
</body>
</html>
Resumo das Funcionalidades:
Envio de E-mails: A partir do frontend, é possível enviar e-mails usando a rota /send da API.
Visualização de E-mails: O frontend exibe a lista de e-mails recebidos armazenados no banco de dados.
Armazenamento de E-mails: Todos os e-mails recebidos pelo servidor SMTP são armazenados no SQLite para consulta posterior.
Executando a aplicação
Inicie o servidor SMTP e API:

bash
Копировать код
node server.js
Em seguida, abra index.html em um navegador para visualizar e enviar e-mails.

Este exemplo básico ilustra como estruturar um sistema de gerenciamento de e-mails em Node.js e uma interface de usuário HTML.
*/