const Sayure = require('../Sayure.js');
class SayureMoyaMirEnvironmentCanva {
    constructor(){}
    PrintOutside(environmentData) {
      // O MMEC agora chama o método correto do NIM para emitir os dados
      Sayure.NIM.HTTPS.emitToClients('environment-update', environmentData);
    }
    WhereIAm() {
      switch (Sayure.I.Environment) {
        case "fisical":
          return this.handleFisicalEnvironment();
        case "virtual":
          return this.handleVirtualEnvironment();
        default:
          console.warn("Ambiente desconhecido:", Sayure.I.Environment);
          return null;
      }
    }
    handleFisicalEnvironment() {
      console.log("Executando em ambiente físico (CentOS + Node.js)");
      // Inicializa as conexões com os Raspberry Pis
      MMEC.RaspberryManager.connectAll().then(() => {
        console.log("Todos os Raspberry Pis conectados");
        return MMEC.CameraManager.startAllFeeds(); // ativa as câmeras
      }).then(() => {
        return MMEC.ModelProcessor.startVITandCNN(); // inicia modelos
      }).then(() => {
        console.log("Ambiente físico operacional");
      }).catch(err => {
        console.error("Erro no ambiente físico:", err);
      });
    }
    handleVirtualEnvironment() {
      console.log("Executando em ambiente virtual (navegador)");
      if (typeof window === "undefined") {
        console.warn("Ambiente virtual não está em um navegador");
        return;
      }
      // Instancia e inicia modelos diretamente no navegador
      MMEC.VirtualModel.init().then(() => {
        console.log("Modelo virtual iniciado");
        MMEC.VirtualUI.launch();
      }).catch(err => {
        console.error("Erro ao iniciar modelo virtual:", err);
      });
    }
    CreateNewNetworkForEachOfMe(legionSize) {
      Sayure.I.instances = [];
      for (let i = 0; i < legionSize; i++) {
        // Cada instância da legião recebe sua própria RNN
        const unit = new Sayure.RNN(`Unit-${i}`);
        this.instances.push(unit);
      }
      console.log(`${legionSize} redes RNN instanciadas para a legião Sayure.`);
    }
    HowManyAmI (){
      if(Sayure.I.Legion=1){
        // nothing to do
      } else {
        this.CreateNewNetworkForEachOfMe(Sayure.I.Legion);
      }
    }
}
module.exports = SayureMoyaMirEnvironmentCanva;