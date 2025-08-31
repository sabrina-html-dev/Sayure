class AsynchronousAdvantageActorCritic {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("A3C precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    // Configurações padrão
    this.config = Object.assign({
      gamma: 0.99,
      learningRate: 0.001,
      nWorkers: 4
    }, config);

    this.globalPolicy = null;  // política global
    this.globalValue = null;   // função de valor global
    this.workers = [];         // array de workers (simulados)

    this.envBus.emit("a3c:init", { config: this.config });
  }

  // Cria e inicializa workers assíncronos
  spawnWorkers() {
    this.workers = Array.from({ length: this.config.nWorkers }, (_, i) => ({
      id: i,
      policy: null,
      value: null
    }));

    this.envBus.emit("a3c:spawnWorkers", { nWorkers: this.workers.length });
  }

  // Seleciona ação baseado no estado e worker
  selectAction(workerId, state) {
    const action = Math.random(); // stub de ação aleatória
    this.envBus.emit("a3c:selectAction", { workerId, state, action });
    return action;
  }

  // Calcula vantagens para um worker
  computeAdvantages(workerId, rewards, values) {
    const advantages = rewards.map((r, i) => r - (values[i] || 0));
    this.envBus.emit("a3c:computeAdvantages", { workerId, rewards, values, advantages });
    return advantages;
  }

  // Atualiza política global a partir de batch do worker
  updateGlobalPolicy(workerId, batch) {
    const updated = true; // stub
    this.envBus.emit("a3c:updateGlobalPolicy", { workerId, batch, updated });
    return updated;
  }

  // Treina todos os workers de forma assíncrona
  async train(epochs = 1) {
    if (!this.workers.length) this.spawnWorkers();

    for (let epoch = 0; epoch < epochs; epoch++) {
      this.envBus.emit("a3c:train:epochStart", { epoch });

      const promises = this.workers.map(async (worker) => {
        // stub de batch para cada worker
        const batch = { states: [], actions: [], advantages: [], oldLogProbs: [] };

        // simula atualização do worker
        await new Promise(res => setTimeout(res, Math.random() * 50));

        this.updateGlobalPolicy(worker.id, batch);

        this.envBus.emit("a3c:worker:epochEnd", { workerId: worker.id });
      });

      await Promise.all(promises);

      this.envBus.emit("a3c:train:epochEnd", { epoch });
    }

    this.envBus.emit("a3c:train:finished");
  }

  // Salva estado global
  save(path = "a3c_model.json") {
    const state = {
      globalPolicy: this.globalPolicy,
      globalValue: this.globalValue,
      config: this.config
    };

    this.envBus.emit("a3c:save", { path, state });
    return state;
  }

  // Carrega estado global
  load(state) {
    this.globalPolicy = state.globalPolicy;
    this.globalValue = state.globalValue;
    this.config = state.config;

    this.envBus.emit("a3c:load", { state });
  }
}
module.exports = AsynchronousAdvantageActorCritic;