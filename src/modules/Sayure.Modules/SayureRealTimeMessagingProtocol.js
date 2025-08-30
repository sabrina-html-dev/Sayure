const Sayure = require('../Sayure.js');
class SayureRealTimeMessagingProtocol {
  constructor() {
    const NodeMediaServer = require('node-media-server');
    this.config = {
      rtmp: { port: 1935, chunk_size: 60000 },
      http: { port: 8000, allow_origin: '*' },
      // Adicione aqui a lógica de segurança se necessário
      // auth: { rtmp: true, api: true } 
    };
    this.server = new NodeMediaServer(this.config);
  }

  // Método para inicializar o servidor
  start() {
    this.server.run();
    console.log("RTMP server started on port 1935");
    // Chama o método que lida com os eventos dos usuários
    this._handleEvents();
  }

  // Método para interromper o servidor
  stop() {
    this.server.stop();
    console.log("RTMP server stopped.");
  }

  // Método para reiniciar o servidor
  restart() {
    console.log("Restarting RTMP server...");
    this.stop();
    // Um pequeno atraso pode ser necessário para garantir que a porta seja liberada
    setTimeout(() => this.start(), 1000); 
  }

  // Método para gerenciar eventos de usuários e dados
  _handleEvents() {
    // Evento disparado quando um cliente tenta se conectar e publicar
    this.server.on('prePublish', (id, StreamPath, args) => {
      console.log('User attempting to publish:', id, StreamPath);
      // Aqui você adicionaria a lógica para verificar o usuário
      // Por exemplo, checar uma sessão ou um token
      let session = this.server.getSession(id);
      // Se o usuário não for reconhecido, rejeite a conexão
      // session.reject(); 
    });

    // Evento disparado quando uma conexão é aceita
    this.server.on('postPublish', (id, StreamPath, args) => {
      console.log('User successfully published a stream:', id, StreamPath);
      // Use este ponto para conectar o fluxo de dados do usuário
      // aos módulos de processamento da Sayure, como Emotions ou Core
    });
    
    // Mais eventos podem ser adicionados para 'play' e desconexão
    this.server.on('donePublish', (id, StreamPath, args) => {
        console.log('User finished publishing:', id, StreamPath);
    });
  }
    }
module.exports = SayureRealTimeMessagingProtocol;