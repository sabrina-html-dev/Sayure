// Sayure.Modules/SayureDreamerSpikeTimingDependentPlasticity.js
const Sayure = require("./SayureCore");

class SayureDreamerSpikeTimingDependentPlasticity {
  /**
   * @param {Object} network - Rede neural alvo (geralmente o Gerador do DreamerGAN)
   * @param {Object} config - Hiperparâmetros de plasticidade
   */
  constructor(network, config = {}) {
    this.network = network;
    this.config = {
      learningRate: config.learningRate || 0.01,
      tauPlus: config.tauPlus || 20,      // ms
      tauMinus: config.tauMinus || 20,    // ms
      aPlus: config.aPlus || 0.02,
      aMinus: config.aMinus || 0.02,
      maxWeight: config.maxWeight || 1.0,
      minWeight: config.minWeight || 0.0,
      ...config
    };

    this.lastSpikes = new Map(); // neuronId -> timestamp

    Sayure.envBus.emit("sdstdp:initialized", {
      timestamp: Date.now(),
      config: this.config
    });
  }

  /**
   * Registra um spike de um neurônio
   * @param {string} neuronId - Identificador do neurônio
   * @param {number} timestamp - Momento do spike
   */
  registerSpike(neuronId, timestamp = Date.now()) {
    const last = this.lastSpikes.get(neuronId) || timestamp;
    const dt = timestamp - last;

    // Atualiza pesos baseado no timing
    this._applySTDP(neuronId, dt);

    this.lastSpikes.set(neuronId, timestamp);

    Sayure.envBus.emit("sdstdp:spike-registered", { neuronId, timestamp, dt });
  }

  /**
   * Aplica atualização de peso de acordo com STDP
   */
  _applySTDP(neuronId, deltaT) {
    let deltaW = 0;

    if (deltaT > 0) {
      // spike pré → pós: aumenta peso
      deltaW = this.config.aPlus * Math.exp(-deltaT / this.config.tauPlus);
    } else {
      // spike pós → pré: diminui peso
      deltaW = -this.config.aMinus * Math.exp(deltaT / this.config.tauMinus);
    }

    // Atualiza peso na rede (assume que network tem método updateWeight)
    if (this.network && typeof this.network.updateWeight === "function") {
      const oldWeight = this.network.getWeight(neuronId) || 0.5;
      let newWeight = Math.min(this.config.maxWeight, Math.max(this.config.minWeight, oldWeight + deltaW));
      this.network.updateWeight(neuronId, newWeight);

      Sayure.envBus.emit("sdstdp:weight-updated", { neuronId, oldWeight, newWeight, deltaW });
    }
  }

  /**
   * Método de treino contínuo para neurônios ativos
   * @param {Array} activeNeurons - lista de neuronIds que dispararam
   */
  train(activeNeurons) {
    const timestamp = Date.now();
    activeNeurons.forEach(neuronId => this.registerSpike(neuronId, timestamp));

    Sayure.envBus.emit("sdstdp:train-step", {
      timestamp,
      activeNeurons
    });
  }

  /**
   * Ajusta hiperparâmetros dinamicamente
   */
  updateConfig(newConfig) {
    Object.assign(this.config, newConfig);
    Sayure.envBus.emit("sdstdp:config-updated", {
      timestamp: Date.now(),
      config: this.config
    });
  }
}

module.exports = SayureDreamerSpikeTimingDependentPlasticity;
