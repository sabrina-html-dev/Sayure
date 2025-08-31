// Sayure.Modules/SayureDreamerGenerativeAdversarialNetworks.js
const Sayure = require("./SayureCore");

class SayureDreamerGenerativeAdversarialNetworks {
  /**
   * @param {Object} generator - A rede neural Geradora. Pode ser um SayureCNN.
   * @param {Object} discriminator - A rede neural Discriminadora. Pode ser outro SayureCNN.
   * @param {Object} config - Configurações de treinamento e hiperparâmetros.
   */
  constructor(generator, discriminator, config = {}) {
    this.generator = generator;
    this.discriminator = discriminator;
    this.config = {
      sensitivity: config.sensitivity || 0.7, // quanto menor, mais liberdade
      ...config
    };

    console.log('DreamerGAN: Módulo inicializado.');
    Sayure.envBus.emit("dreamer-gan-initialized", {
      timestamp: Date.now(),
      config: this.config
    });
  }

  /**
   * Treina o Discriminador com um fator de sensibilidade (tolerância ao erro).
   * @param {Array} real_data - Dados de treinamento reais.
   * @param {Array} fake_data - Dados gerados pelo Gerador.
   */
  trainDiscriminator(real_data, fake_data) {
    console.log("DreamerGAN: Treinando o Discriminador...");

    // O discriminador aprende, mas ajustado pela "sensibilidade"
    const effectiveReal = real_data.map(d => d * this.config.sensitivity);
    const effectiveFake = fake_data.map(d => d * (1 - this.config.sensitivity));

    this.discriminator.train(effectiveReal, effectiveFake);

    Sayure.envBus.emit("dreamer-gan-discriminator-trained", {
      timestamp: Date.now(),
      sensitivity: this.config.sensitivity
    });
  }

  /**
   * Treina o Gerador para enganar o Discriminador.
   * @param {Array} z_vector - Vetor de ruído aleatório.
   */
  trainGenerator(z_vector) {
    console.log("DreamerGAN: Treinando o Gerador...");
    this.generator.train(z_vector);

    Sayure.envBus.emit("dreamer-gan-generator-trained", {
      timestamp: Date.now()
    });
  }

  /**
   * Orquestra o treinamento de ambos os modelos em um ciclo.
   * @param {Array} real_data - Conjunto de dados reais para treinamento.
   * @param {number} epochs - Número de ciclos de treinamento.
   */
  train(real_data, epochs) {
    console.log(`DreamerGAN: Iniciando treinamento por ${epochs} épocas.`);
    for (let i = 0; i < epochs; i++) {
      const z_vector = this.generateRandomVector();
      const fake_data = this.generator.predict(z_vector);

      this.trainDiscriminator(real_data, fake_data);
      this.trainGenerator(z_vector);

      console.log(`DreamerGAN: Época ${i + 1}/${epochs} concluída.`);
      Sayure.envBus.emit("dreamer-gan-epoch-completed", {
        timestamp: Date.now(),
        epoch: i + 1,
        totalEpochs: epochs
      });
    }
  }

  /**
   * Usa o Gerador treinado para criar uma nova amostra.
   * @param {Array} z_vector - Vetor de ruído aleatório.
   */
  generate(z_vector) {
    const output = this.generator.predict(z_vector);
    Sayure.envBus.emit("dreamer-gan-output-generated", {
      timestamp: Date.now(),
      output
    });
    return output;
  }

  /**
   * Método de "sonhar" - mistura dados reais e falsos para gerar visões mais coerentes.
   */
  dream(real_data) {
    const z = this.generateRandomVector();
    const fake = this.generator.predict(z);
    const dreamed = real_data.map((d, i) => (d * this.config.sensitivity) + (fake[i] * (1 - this.config.sensitivity)));

    Sayure.envBus.emit("dreamer-gan-dreamed", {
      timestamp: Date.now(),
      dreamed
    });

    return dreamed;
  }

  /**
   * Método de "imaginar" - gera dados livres com mínima interferência do discriminador.
   */
  imagine() {
    const oldSensitivity = this.config.sensitivity;
    this.config.sensitivity = Math.max(0.1, oldSensitivity * 0.5); // diminui influência

    const z = this.generateRandomVector();
    const imagined = this.generator.predict(z);

    this.config.sensitivity = oldSensitivity; // restaura após imaginar

    Sayure.envBus.emit("dreamer-gan-imagined", {
      timestamp: Date.now(),
      imagined
    });

    return imagined;
  }

  // Método auxiliar
  generateRandomVector(size = 10) {
    return Array.from({ length: size }, () => Math.random());
  }
}

module.exports = SayureDreamerGenerativeAdversarialNetworks;
