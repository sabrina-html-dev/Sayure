class SayureHierarchicalTemporalMemory1 {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("HTM precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    // Configurações padrão
    this.config = Object.assign({
      inputSize: 100,   // tamanho da entrada binária (SDR)
      columnSize: 2048, // número de colunas (regiões corticais simuladas)
      cellsPerColumn: 32, // células por coluna
      sparsity: 0.02,   // porcentagem de ativação
      learningRate: 0.01
    }, config);

    // Estruturas internas (simplificadas)
    this.columns = new Array(this.config.columnSize).fill(0);
    this.memory = []; // histórico de SDRs
    this.predictions = [];

    this.envBus.emit("htm:init", { config: this.config });
  }

  // Codificação (transforma entrada em SDR binário)
  encode(input) {
    const sdr = new Array(this.config.inputSize).fill(0);
    for (let i = 0; i < Math.floor(this.config.inputSize * this.config.sparsity); i++) {
      const idx = Math.floor(Math.random() * this.config.inputSize);
      sdr[idx] = 1;
    }

    this.envBus.emit("htm:encode", { input, sdr });
    return sdr;
  }

  // Aprendizado (armazena SDRs e ajusta pesos)
  learn(sdr) {
    this.memory.push(sdr);
    if (this.memory.length > 1000) {
      this.memory.shift();
    }

    this.envBus.emit("htm:learn", { sdr, memorySize: this.memory.length });
  }

  // Predição temporal (usa últimos padrões para prever o próximo)
  predict() {
    let prediction = new Array(this.config.inputSize).fill(0);
    if (this.memory.length > 0) {
      const last = this.memory[this.memory.length - 1];
      prediction = [...last]; // stub: só repete última entrada
    }

    this.predictions.push(prediction);
    this.envBus.emit("htm:predict", { prediction });
    return prediction;
  }

  // Cálculo de anomalia (compara entrada com predição)
  anomalyScore(inputSDR) {
    const lastPrediction = this.predictions[this.predictions.length - 1] || [];
    let diff = 0;
    for (let i = 0; i < inputSDR.length; i++) {
      if (inputSDR[i] !== lastPrediction[i]) diff++;
    }
    const score = diff / inputSDR.length;

    this.envBus.emit("htm:anomalyScore", { inputSDR, score });
    return score;
  }

  // Salvar estado
  save(path = "htm_model.json") {
    const state = {
      config: this.config,
      memory: this.memory.slice(-100) // salva só últimas 100 entradas
    };

    this.envBus.emit("htm:save", { path, state });
    return state;
  }

  // Carregar estado
  load(state) {
    this.config = state.config;
    this.memory = state.memory;

    this.envBus.emit("htm:load", { state });
  }
}
class SayureHierarchicalTemporalMemory2 {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("HTM precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    this.config = Object.assign({
      inputSize: 100,    // tamanho da entrada
      columnCount: 2048, // número de colunas
      cellsPerColumn: 32,
      permanenceInc: 0.03,
      permanenceDec: 0.02,
      activationThreshold: 15,
      learning: true
    }, config);

    // Estruturas internas (simplificadas)
    this.columns = new Array(this.config.columnCount).fill(null).map(() => ({
      cells: new Array(this.config.cellsPerColumn).fill(0),
      permanence: Math.random()
    }));

    this.history = []; // armazena sequências recentes

    this.envBus.emit("htm:init", { config: this.config });
  }

  // Codificação de entrada (stub SDR)
  encode(input) {
    const sdr = new Array(this.config.inputSize).fill(0);
    for (let i = 0; i < input.length && i < this.config.inputSize; i++) {
      sdr[i] = input[i] > 0.5 ? 1 : 0;
    }
    this.envBus.emit("htm:encode", { input, sdr });
    return sdr;
  }

  // Ativação de colunas
  activateColumns(sdr) {
    const activeColumns = [];
    for (let i = 0; i < this.columns.length; i++) {
      if (Math.random() < 0.01) { // stub de ativação
        activeColumns.push(i);
      }
    }
    this.envBus.emit("htm:activateColumns", { sdr, activeColumns });
    return activeColumns;
  }

  // Predição baseada no histórico
  predict(nextInput) {
    let prediction = Math.random() > 0.5 ? 1 : 0; // stub
    this.envBus.emit("htm:predict", { nextInput, prediction });
    return prediction;
  }

  // Aprendizado online
  learn(sdr, activeColumns) {
    if (!this.config.learning) return;

    // Stub simples de aprendizado Hebbiano
    activeColumns.forEach(idx => {
      this.columns[idx].permanence += this.config.permanenceInc;
      if (this.columns[idx].permanence > 1) this.columns[idx].permanence = 1;
    });

    this.envBus.emit("htm:learn", { sdr, activeColumns });
  }

  // Processa uma nova entrada
  process(input) {
    const sdr = this.encode(input);
    const activeColumns = this.activateColumns(sdr);
    const prediction = this.predict(input);

    this.learn(sdr, activeColumns);

    this.history.push({ input, prediction });
    if (this.history.length > 1000) this.history.shift();

    this.envBus.emit("htm:process", { input, sdr, activeColumns, prediction });

    return { sdr, activeColumns, prediction };
  }

  // Salvar estado
  save(path = "htm_model.json") {
    const state = {
      config: this.config,
      columns: this.columns,
      history: this.history
    };

    this.envBus.emit("htm:save", { path, state });
    return state;
  }

  // Carregar estado
  load(state) {
    this.config = state.config;
    this.columns = state.columns;
    this.history = state.history;
    this.envBus.emit("htm:load", { state });
  }
}
module.exports = { SayureHierarchicalTemporalMemory1, SayureHierarchicalTemporalMemory2 }