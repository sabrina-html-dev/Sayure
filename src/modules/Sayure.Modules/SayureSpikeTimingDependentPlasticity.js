class SayureSpikeTimingDependentPlasticity {
    /**
     * @description Inicializa a rede neural com plasticidade sinaptica (STDP).
     */
    constructor(n_entrada, n_oculta, n_saida, learRate = 0.1, a_plus = 0.1, a_minus = -0.1, tau_plus = 20.0, tau_minus = 20.0) {
      this.n_entrada = n_entrada;
      this.n_oculta = n_oculta;
      this.n_saida = n_saida;
      this.learRate = learRate;
      this.a_plus = a_plus;
      this.a_minus = a_minus;
      this.tau_plus = tau_plus;
      this.tau_minus = tau_minus;
      
      this.w_entrada_oculta = this.criarMatriz(n_entrada, n_oculta, () => Math.random() * 0.2 - 0.1);
      this.w_oculta_saida = this.criarMatriz(n_oculta, n_saida, () => Math.random() * 0.2 - 0.1);
      
      this.atividade_entrada = new Array(n_entrada).fill(0);
      this.atividade_oculta = new Array(n_oculta).fill(0);
      this.atividade_saida = new Array(n_saida).fill(0);
      
      this.tempos_entrada = new Array(n_entrada).fill(0);
      this.tempos_oculta = new Array(n_oculta).fill(0);
      
      // Notifica o sistema que o módulo foi inicializado
      Sayure.eventBus.emit('stdp-initialized', { timestamp: Date.now() });
    }
  
    // Função auxiliar para criar matrizes com inicialização
    criarMatriz(linhas, colunas, inicializador) {
      return Array.from({ length: linhas }, () => Array.from({ length: colunas }, inicializador));
    }

    // Função auxiliar para multiplicar matriz por vetor
    multiplicarMatrizVetor(matriz, vetor) {
        return matriz.map(linha =>
            linha.reduce((soma, valor, i) => soma + valor * vetor[i], 0)
        );
    }
  
    // Função de ativação sigmoide
    ativacao(x) {
      return 1 / (1 + Math.exp(-x));
    }
  
    /**
     * @description Propaga a entrada pela rede e atualiza atividades.
     * @param {number[]} entrada - Vetor de entrada.
     * @param {number} tempo - Tempo atual para rastrear disparos.
     * @returns {number[]} - Atividade da camada de saída.
    */
    propagar(entrada, tempo) {
      this.atividade_entrada = entrada.slice();
      // Atualiza o tempo de disparo dos neurônios de entrada
      this.tempos_entrada = entrada.map((valor, i) => (valor > 0) ? tempo : this.tempos_entrada[i]);
      
      // Calcula a atividade da camada oculta
      const entrada_oculta = this.multiplicarMatrizVetor(this.w_entrada_oculta, this.atividade_entrada);
      this.atividade_oculta = entrada_oculta.map(x => this.ativacao(x));
      // Atualiza o tempo de disparo dos neurônios ocultos
      this.tempos_oculta = this.atividade_oculta.map((valor, i) => (valor > 0.5) ? tempo : this.tempos_oculta[i]);
      
      // Calcula a atividade da camada de saída
      const oculta_saida = this.multiplicarMatrizVetor(this.w_oculta_saida, this.atividade_oculta);
      this.atividade_saida = oculta_saida.map(x => this.ativacao(x));

      // Notifica o sistema sobre a propagação
      Sayure.eventBus.emit('stdp-propagation-completed', { timestamp: tempo, output: this.atividade_saida });
      
      return this.atividade_saida;
    }

    /**
     * @description Atualiza os pesos usando o algoritmo de plasticidade dependente de tempo de disparo (STDP).
     * @param {number} tempo - Tempo atual.
     */
    atualizarPesosComSTDP(tempo) {
      // Atualiza os pesos da camada de entrada para a oculta
      for (let i = 0; i < this.n_entrada; i++) {
        for (let j = 0; j < this.n_oculta; j++) {
          const delta_t = this.tempos_oculta[j] - this.tempos_entrada[i];
          let delta_w = 0;
          
          if (delta_t > 0) {
            // Potenciação sináptica (STDP)
            delta_w = this.a_plus * Math.exp(-delta_t / this.tau_plus);
          } else {
            // Depressão sináptica (STDP)
            delta_w = this.a_minus * Math.exp(delta_t / this.tau_minus);
          }
          this.w_entrada_oculta[i][j] += this.learRate * delta_w;
        }
      }
  
      // Atualiza os pesos da camada oculta para a de saída
      for (let i = 0; i < this.n_oculta; i++) {
        for (let j = 0; j < this.n_saida; j++) {
            const delta_t = this.tempos_saida[j] - this.tempos_oculta[i];
            let delta_w = 0;
            
            if (delta_t > 0) {
                delta_w = this.a_plus * Math.exp(-delta_t / this.tau_plus);
            } else {
                delta_w = this.a_minus * Math.exp(delta_t / this.tau_minus);
            }
            this.w_oculta_saida[i][j] += this.learRate * delta_w;
        }
    }
  
    // Notifica o sistema que os pesos foram atualizados
    Sayure.eventBus.emit('stdp-weights-updated', { timestamp: tempo });
  }
}
module.exports = SayureSpikeTimingDependentPlasticity;