// Sayure.Modules/SayureObserverOfEmittedReflexesAndDistributorOfReactions.js

class SayureObserverOfEmittedReflexesAndDistributorOfReactions {
  constructor(envBus) {
    this.envBus = envBus;
    this.reactionHandlers = {};

    this.envBus.on("reflex:emit", (payload) => {
      this.envBus.emit("observer:reflexCaptured", {
        reflex: payload,
        message: "Reflexo capturado pelo Observer."
      });
      this.distributeReaction(payload);
    });

    this.envBus.emit("observer:init", {
      message: "SayureObserverOfEmittedReflexesAndDistributorOfReactions inicializado e escutando reflexos."
    });
  }

  // Permite registrar novos tipos de reações
  registerReaction(reflexType, handler) {
    if (!this.reactionHandlers[reflexType]) {
      this.reactionHandlers[reflexType] = [];
    }
    this.reactionHandlers[reflexType].push(handler);

    this.envBus.emit("observer:registerReaction", {
      reflexType,
      message: `Handler registrado para reflexo: ${reflexType}`
    });
  }

  // Distribui reações com base no tipo de reflexo
  distributeReaction(reflex) {
    const { type, data } = reflex;
    const handlers = this.reactionHandlers[type] || [];

    if (handlers.length === 0) {
      this.envBus.emit("observer:noReaction", {
        type,
        message: `Nenhum handler registrado para reflexo: ${type}`
      });
      return;
    }

    handlers.forEach((handler) => {
      try {
        handler(data, this.envBus);

        this.envBus.emit("observer:reactionExecuted", {
          type,
          data,
          message: `Reação executada para reflexo: ${type}`
        });
      } catch (err) {
        this.envBus.emit("observer:reactionError", {
          type,
          error: err.message,
          message: "Erro durante execução da reação."
        });
      }
    });
  }

  // Envia reflexo artificialmente (simulação ou teste)
  emitReflex(type, data) {
    this.envBus.emit("reflex:emit", { type, data });
  }
}

module.exports = SayureObserverOfEmittedReflexesAndDistributorOfReactions;
