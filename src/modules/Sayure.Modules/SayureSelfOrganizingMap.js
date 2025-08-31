// Sayure.Modules/SayureSelfOrganizingMap.js

class SayureSelfOrganizingMap {
  constructor(envBus, { width = 10, height = 10, inputDim = 3, learningRate = 0.1, radius = 3 } = {}) {
    this.envBus = envBus;
    this.width = width;
    this.height = height;
    this.inputDim = inputDim;
    this.learningRate = learningRate;
    this.radius = radius;

    // Inicializa os pesos dos neurônios
    this.map = Array.from({ length: width }, () =>
      Array.from({ length: height }, () =>
        Array.from({ length: inputDim }, () => Math.random())
      )
    );

    this.envBus.emit("som:init", {
      width,
      height,
      inputDim,
      message: "Self-Organizing Map inicializado com sucesso."
    });
  }

  // Distância euclidiana entre vetores
  euclideanDistance(v1, v2) {
    return Math.sqrt(v1.reduce((acc, val, i) => acc + (val - v2[i]) ** 2, 0));
  }

  // Encontra o neurônio mais próximo (Best Matching Unit - BMU)
  findBMU(input) {
    let bmu = { x: 0, y: 0 };
    let minDist = Infinity;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const dist = this.euclideanDistance(input, this.map[x][y]);
        if (dist < minDist) {
          minDist = dist;
          bmu = { x, y };
        }
      }
    }

    this.envBus.emit("som:findBMU", { input, bmu, distance: minDist });
    return bmu;
  }

  // Atualiza os pesos dos neurônios vizinhos ao BMU
  updateWeights(input, bmu, iteration, maxIterations) {
    const radiusDecay = this.radius * Math.exp(-iteration / maxIterations);
    const lrDecay = this.learningRate * Math.exp(-iteration / maxIterations);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const distToBMU = (x - bmu.x) ** 2 + (y - bmu.y) ** 2;

        if (distToBMU <= radiusDecay ** 2) {
          const influence = Math.exp(-(distToBMU) / (2 * radiusDecay ** 2));

          for (let i = 0; i < this.inputDim; i++) {
            this.map[x][y][i] += influence * lrDecay * (input[i] - this.map[x][y][i]);
          }
        }
      }
    }

    this.envBus.emit("som:updateWeights", {
      iteration,
      bmu,
      radiusDecay,
      lrDecay,
      message: "Pesos atualizados."
    });
  }

  // Treinamento
  train(data, maxIterations = 1000) {
    for (let iter = 0; iter < maxIterations; iter++) {
      const input = data[Math.floor(Math.random() * data.length)];
      const bmu = this.findBMU(input);
      this.updateWeights(input, bmu, iter, maxIterations);

      if (iter % 100 === 0) {
        this.envBus.emit("som:trainStep", {
          iteration: iter,
          progress: `${((iter / maxIterations) * 100).toFixed(2)}%`,
          message: "Iteração de treinamento concluída."
        });
      }
    }

    this.envBus.emit("som:trainComplete", {
      iterations: maxIterations,
      message: "Treinamento da SOM concluído com sucesso."
    });
  }

  // Retorna o mapa treinado
  getMap() {
    this.envBus.emit("som:getMap", { map: this.map });
    return this.map;
  }
}

module.exports = SayureSelfOrganizingMap;
