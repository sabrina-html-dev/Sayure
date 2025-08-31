class SayureRewardComplexToAllNeuralNetworks {
  constructor(rewardWeights) {
    // Pesos para ponderar a importância de cada componente da recompensa
    this.rewardWeights = rewardWeights || {
      taskCompletion: 0.5,
      systemHealth: 0.2,
      emotionalState: 0.2,
      predictionConfidence: 0.1
    };
    console.log('Reward: Módulo de Recompensa Complexa inicializado.');
    Sayure.eventBus.emit('reward-initialized', {
      timestamp: Date.now()
    });
  }

  /**
   * Calcula a recompensa complexa com base em vários fatores do estado da Sayure.
   * @param {Object} context - Dados do ambiente e de módulos internos.
   * @returns {number} O valor da recompensa unificada.
   */
  calculateReward(context) {
    console.log('Reward: Calculando recompensa complexa...');
    
    // 1. Recompensa de Conclusão de Tarefa
    const taskReward = context.isTaskCompleted ? 1.0 : -0.1;

    // 2. Recompensa de Saúde do Sistema (usando métricas do CSP)
    // Uma recompensa negativa para alta carga de CPU ou erros
    const systemHealthReward = -context.metrics.performance.cpuLoad - context.metrics.errors;

    // 3. Recompensa de Estado Emocional (do EPR)
    // Por exemplo, recompensa negativa para "estresse" e positiva para "curiosidade"
    const emotionalReward = (context.emotionalState.stress > 0.5) ? -0.5 : 0.2;

    // 4. Recompensa de Confiança de Previsão (do BNN)
    // Recompensa positiva se a incerteza for baixa
    const confidenceReward = 1.0 - context.uncertainty;

    // Calcula a recompensa total com base nos pesos
    const totalReward = (
      (taskReward * this.rewardWeights.taskCompletion) +
      (systemHealthReward * this.rewardWeights.systemHealth) +
      (emotionalReward * this.rewardWeights.emotionalState) +
      (confidenceReward * this.rewardWeights.predictionConfidence)
    );

    console.log(`Reward: Recompensa calculada: ${totalReward.toFixed(2)}`);
    Sayure.eventBus.emit('reward-calculated', {
      timestamp: Date.now(),
      value: totalReward,
      context: context
    });

    return totalReward;
  }
}
module.exports = SayureRewardComplexToAllNeuralNetworks;