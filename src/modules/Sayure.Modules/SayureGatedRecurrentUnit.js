class SayureGatedRecurrentUnit {
  constructor(envBus, config = {}) {
    if (!envBus) throw new Error("GRU precisa de uma instância de Sayure.envBus");
    this.envBus = envBus;

    this.config = Object.assign({
      inputSize: 16,
      hiddenSize: 32,
      learningRate: 0.01
    }, config);

    // Pesos (simplificados)
    this.weights = {
      Wz: this.initMatrix(this.config.hiddenSize, this.config.inputSize),
      Wr: this.initMatrix(this.config.hiddenSize, this.config.inputSize),
      Wh: this.initMatrix(this.config.hiddenSize, this.config.inputSize),
      Uz: this.initMatrix(this.config.hiddenSize, this.config.hiddenSize),
      Ur: this.initMatrix(this.config.hiddenSize, this.config.hiddenSize),
      Uh: this.initMatrix(this.config.hiddenSize, this.config.hiddenSize)
    };

    this.hiddenState = new Array(this.config.hiddenSize).fill(0);

    this.envBus.emit("gru:init", { config: this.config });
  }

  // Inicialização dos pesos
  initMatrix(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() * 0.2 - 0.1))
    );
  }

  // Funções auxiliares
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  tanh(x) {
    return Math.tanh(x);
  }

  dot(a, b) {
    return a.map(row =>
      row.reduce((acc, _, i) => acc + row[i] * b[i], 0)
    );
  }

  // Passo forward
  forward(input) {
    const hPrev = this.hiddenState;

    // Update gate
    const zt = this.sigmoid(
      this.dot(this.weights.Wz, input) +
      this.dot(this.weights.Uz, hPrev)
    );

    // Reset gate
    const rt = this.sigmoid(
      this.dot(this.weights.Wr, input) +
      this.dot(this.weights.Ur, hPrev)
    );

    // Candidate hidden state
    const hTilde = this.tanh(
      this.dot(this.weights.Wh, input) +
      this.dot(this.weights.Uh, rt.map((r, i) => r * hPrev[i]))
    );

    // New hidden state
    this.hiddenState = hPrev.map((h, i) => (1 - zt[i]) * h + zt[i] * hTilde[i]);

    this.envBus.emit("gru:forward", { input, output: this.hiddenState });
    return this.hiddenState;
  }

  // Backward (stub simplificado)
  backward(gradOutput) {
    // (Implementação real teria retropropagação através do tempo - BPTT)
    this.envBus.emit("gru:backward", { gradOutput });
  }

  // Treino (placeholder)
  train(inputs, targets, epochs = 1) {
    for (let e = 0; e < epochs; e++) {
      inputs.forEach((inp, idx) => {
        const out = this.forward(inp);
        const loss = out.reduce((acc, v, i) => acc + (v - targets[idx][i]) ** 2, 0);
        this.envBus.emit("gru:trainStep", { epoch: e, input: inp, loss });
      });
    }
  }

  // Resetar estado oculto
  resetState() {
    this.hiddenState = new Array(this.config.hiddenSize).fill(0);
    this.envBus.emit("gru:resetState", { hiddenState: this.hiddenState });
  }

  // Salvar estado
  save(path = "gru_model.json") {
    const state = { config: this.config, weights: this.weights };
    this.envBus.emit("gru:save", { path, state });
    return state;
  }

  // Carregar estado
  load(state) {
    this.config = state.config;
    this.weights = state.weights;
    this.envBus.emit("gru:load", { state });
  }
}
module.exports = SayureGatedRecurrentUnit;