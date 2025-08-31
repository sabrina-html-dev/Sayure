class SayureDeepDeterministicPolicyGradient {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("DDPG precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    // Configurações padrão
    this.config = Object.assign({
      gamma: 0.99,
      tau: 0.001,
      actorLearningRate: 0.001,
      criticLearningRate: 0.002,
      replayBufferSize: 100000,
      batchSize: 64
    }, config);

    this.actor = null;    // rede neural ator
    this.critic = null;   // rede neural crítico
    this.targetActor = null;
    this.targetCritic = null;
    this.replayBuffer = [];

    this.envBus.emit("ddpg:init", { config: this.config });
  }

  // Seleciona ação determinística com ruído exploratório opcional
  selectAction(state, noise = 0.0) {
    const action = Math.random(); // stub de ação determinística
    const noisyAction = action + noise * (Math.random() - 0.5);

    this.envBus.emit("ddpg:selectAction", { state, action: noisyAction, noise });
    return noisyAction;
  }

  // Armazena experiência no replay buffer
  storeTransition(state, action, reward, nextState, done) {
    this.replayBuffer.push({ state, action, reward, nextState, done });
    if (this.replayBuffer.length > this.config.replayBufferSize) {
      this.replayBuffer.shift();
    }

    this.envBus.emit("ddpg:storeTransition", { state, action, reward, nextState, done });
  }

  // Treina redes ator e crítico
  train() {
    const batch = this.replayBuffer.slice(-this.config.batchSize);
    if (!batch.length) return;

    // stub: aqui seria a atualização real das redes
    const updated = true;

    this.envBus.emit("ddpg:train", { batchSize: batch.length, updated });
    return updated;
  }

  // Atualiza redes alvo (soft update)
  updateTargetNetworks() {
    // stub de soft update usando tau
    this.envBus.emit("ddpg:updateTargetNetworks", { tau: this.config.tau });
  }

  // Salva estado completo do modelo
  save(path = "ddpg_model.json") {
    const state = {
      actor: this.actor,
      critic: this.critic,
      targetActor: this.targetActor,
      targetCritic: this.targetCritic,
      config: this.config,
      replayBufferSize: this.replayBuffer.length
    };

    this.envBus.emit("ddpg:save", { path, state });
    return state;
  }

  // Carrega estado salvo
  load(state) {
    this.actor = state.actor;
    this.critic = state.critic;
    this.targetActor = state.targetActor;
    this.targetCritic = state.targetCritic;
    this.config = state.config;
    this.replayBuffer = [];

    this.envBus.emit("ddpg:load", { state });
  }
}
module.exports = SayureDeepDeterministicPolicyGradient;