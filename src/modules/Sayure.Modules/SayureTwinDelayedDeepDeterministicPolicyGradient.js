class SayureTwinDelayedDeepDeterministicPolicyGradient {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("TD3 precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    // Configurações padrão
    this.config = Object.assign({
      gamma: 0.99,
      tau: 0.005,
      actorLearningRate: 0.001,
      criticLearningRate: 0.001,
      replayBufferSize: 100000,
      batchSize: 100,
      policyNoise: 0.2,
      noiseClip: 0.5,
      policyDelay: 2
    }, config);

    // Redes (stubs)
    this.actor = null;
    this.critic1 = null;
    this.critic2 = null;
    this.targetActor = null;
    this.targetCritic1 = null;
    this.targetCritic2 = null;

    this.replayBuffer = [];
    this.trainStep = 0;

    this.envBus.emit("td3:init", { config: this.config });
  }

  // Seleciona ação com ruído exploratório
  selectAction(state, noise = 0.1) {
    let action = Math.random(); // stub da ação do ator
    let noisyAction = action + noise * (Math.random() - 0.5);

    this.envBus.emit("td3:selectAction", { state, action: noisyAction });
    return noisyAction;
  }

  // Armazena experiência
  storeTransition(state, action, reward, nextState, done) {
    this.replayBuffer.push({ state, action, reward, nextState, done });
    if (this.replayBuffer.length > this.config.replayBufferSize) {
      this.replayBuffer.shift();
    }

    this.envBus.emit("td3:storeTransition", { state, action, reward, nextState, done });
  }

  // Treinamento principal
  train() {
    if (this.replayBuffer.length < this.config.batchSize) return;

    const batch = this.replayBuffer.slice(-this.config.batchSize);
    this.trainStep++;

    // --- Twin critics update (stub) ---
    const criticLoss = Math.random();

    // --- Actor update a cada policyDelay steps ---
    let actorUpdated = false;
    if (this.trainStep % this.config.policyDelay === 0) {
      actorUpdated = true;
    }

    // --- Target update (soft update) ---
    this.envBus.emit("td3:updateTargetNetworks", { tau: this.config.tau });

    this.envBus.emit("td3:train", {
      step: this.trainStep,
      batchSize: batch.length,
      criticLoss,
      actorUpdated
    });

    return { criticLoss, actorUpdated };
  }

  // Salvar estado
  save(path = "td3_model.json") {
    const state = {
      actor: this.actor,
      critic1: this.critic1,
      critic2: this.critic2,
      config: this.config,
      replayBufferSize: this.replayBuffer.length
    };

    this.envBus.emit("td3:save", { path, state });
    return state;
  }

  // Carregar estado
  load(state) {
    this.actor = state.actor;
    this.critic1 = state.critic1;
    this.critic2 = state.critic2;
    this.config = state.config;

    this.envBus.emit("td3:load", { state });
  }
}
module.exports = SayureTwinDelayedDeepDeterministicPolicyGradient;