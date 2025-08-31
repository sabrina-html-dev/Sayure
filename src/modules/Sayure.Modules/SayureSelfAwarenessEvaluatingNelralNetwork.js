// Sayure.Modules/SayureSelfAwarenessEvaluatingNelralNetwork.js

/**
 * SayureSelfAwarenessEvaluatingNelralNetwork
 * - Observa eventos emitidos no envBus (EventEmitter)
 * - Mantém métricas (EWMA), memória de eventos, detecção de anomalias
 * - Permite criar métodos de análise dinamicamente (string ou função)
 * - Pode propor reescritas e emitir comandos (pasa por "gate" de política)
 * - Exporta snapshot save/load e pode restaurar hook emit no destroy()
 *
 * Uso: const Self = require('./SayureSelfAwarenessEvaluatingNelralNetwork');
 *       const self = new Self(envBus, {...});
 * ```
 * const EventEmitter = require("events");
const Self = require("./Sayure.Modules/SayureSelfAwarenessEvaluatingNelralNetwork");

const bus = new EventEmitter();
const self = new Self(bus, { anomalyThreshold: 2.5, enableGlobalHook: true });

// criar método de análise dinâmico (string)
self.createAnalysisMethod("checkLatency", `
  if (!payload || typeof payload.latencyMs !== 'number') return null;
  if (payload.latencyMs > 200) {
    ctx.note('Latência alta detectada: ' + payload.latencyMs);
    ctx.emit('self:diagnosis', { code: 'HIGH_LATENCY', value: payload.latencyMs });
    return { high: true, latency: payload.latencyMs };
  }
  return { high: false, latency: payload.latencyMs };
`, { purpose: "latency-check" });

// escutar anomalias e outros eventos
bus.on("self:anomaly", (v) => console.log("[SELF] anomaly:", v));
bus.on("self:observed", (v) => {}); // opt-in
bus.on("self:method:created", (v) => console.log("[SELF] method created:", v.name));

// emitir eventos para testar
bus.emit("network:latency", { latencyMs: 120 });
bus.emit("network:latency", { latencyMs: 450 }); // este deve disparar anomalia

// executar análise manual
self.runAnalysis("checkLatency", { latencyMs: 320 });

// propor reescrita
const id = self.proposeRefactor("SayureConvolutiveNeuralNetwork", ["overfitting", "latency"], { hint: "reduce kernel size" });
console.log("proposal id:", id);

// tentar emitir canal bloqueado (policy)
self.blockChannel("gan:train");
bus.emit("gan:train", { dataset: "dreams" }); // será bloqueado

// salvar estado
const snap = self.save();
console.log("snapshot keys:", Object.keys(snap));

// cleanup
// self.destroy(); // restaura emit e para heartbeat

 * ```
 */

class SayureSelfAwarenessEvaluatingNelralNetwork {
  constructor(envBus, config = {}) {
    if (!envBus || typeof envBus.emit !== "function") {
      throw new Error("É necessário um EventEmitter válido como envBus.");
    }
    this.envBus = envBus;

    // Configurações padrão
    this.config = Object.assign(
      {
        maxEventMemory: 5000,      // eventos guardados
        anomalyEWMAAlpha: 0.2,     // suavização EWMA
        anomalyThreshold: 3.0,     // z-score threshold para anomalia
        policy: {
          gatedChannels: [
            "rewrite:apply",
            "gan:train",
            "dreamer:train",
            "class:reload",
            "protocol:network:danger"
          ],
        },
        heartbeatMs: 2000,
        enableGlobalHook: true
      },
      config
    );

    // Estado interno
    this.state = {
      startedAt: Date.now(),
      events: [],
      counters: {},
      lastByType: {},
      ewma: {},
      variance: {},
      methods: {},       // analysis methods
      policies: [],
      proposals: [],
      blocked: new Set(),
      notes: []
    };

    // Save original emit to restore later
    this._originalEmit = null;
    this._emitHookInstalled = false;

    if (this.config.enableGlobalHook) {
      this._installGlobalEmitHook();
    }

    this._startHeartbeat();

    this.envBus.emit("self:init", {
      module: "SayureSelfAwarenessEvaluatingNelralNetwork",
      config: this.config,
      message: "Self-awareness supervisor inicializado."
    });
  }

  /* --------------------------- Global Emit Hook ------------------------ */
  _installGlobalEmitHook() {
    if (this._emitHookInstalled) return;
    // keep reference to original
    this._originalEmit = this.envBus.emit.bind(this.envBus);
    const self = this;

    this.envBus.emit = function (...args) {
      // args[0] = type, rest = payloads
      try {
        // Observe first arg as type, second as payload (if present)
        const type = args[0];
        const payload = args[1];
        try {
          self._observeEvent(type, payload);
        } catch (observeErr) {
          // If observing raises, still emit an observer error
          self._safeOriginalEmit("self:observer:error", { error: observeErr.message, type, payload });
        }

        // Policy gate
        if (self._isGated(type) && !self._policyAllows(type, payload)) {
          // notify blocked
          self._safeOriginalEmit("self:policy:blocked", {
            type,
            payload,
            message: "Emissão bloqueada pela política de autoconsciência."
          });
          return false;
        }
      } catch (hookErr) {
        // best-effort to not break original emitter
        try {
          self._safeOriginalEmit("self:hook:error", { error: hookErr.message });
        } catch (e) {
          // ignore
        }
      }

      // finally forward to original emit with all args
      return self._safeOriginalEmit.apply(self, args);
    };

    this._emitHookInstalled = true;
    this.envBus.emit("self:hook:installed", { message: "Global emit hook instalado." });
  }

  // wrapper to call original emit safely (if restored)
  _safeOriginalEmit(...args) {
    if (this._originalEmit) {
      return this._originalEmit(...args);
    }
    // fallback: no original (shouldn't happen) -> try envBus.__proto__.emit
    try {
      return this.envBus.constructor.prototype.emit.apply(this.envBus, args);
    } catch {
      return false;
    }
  }

  _isGated(type) {
    const gated = (this.config.policy.gatedChannels || []);
    return gated.some(prefix => type.startsWith(prefix));
  }

  _policyAllows(type, payload) {
    // default allow unless blocked set or a failing rule
    if (this.state.blocked.has(type)) return false;
    if (type.startsWith("rewrite:apply") && (!payload || !payload.justification)) {
      return false;
    }
    // extended dynamic policies could be consulted here
    for (const rule of this.state.policies) {
      try {
        if (typeof rule === "function" && rule(type, payload, this.state) === false) {
          return false;
        }
      } catch (e) {
        // ignore broken policy function
      }
    }
    return true;
  }

  /* --------------------------- Observation & Metrics ------------------- */
  _observeEvent(type, payload) {
    const ts = Date.now();

    // push circular buffer
    this.state.events.push({ ts, type, payload });
    if (this.state.events.length > this.config.maxEventMemory) {
      this.state.events.shift();
    }

    // counters and last-by-type
    this.state.counters[type] = (this.state.counters[type] || 0) + 1;
    this.state.lastByType[type] = { ts, payload };

    // collect numerics from payload and update EWMA/variance
    const numericFields = this._collectNumeric(payload);
    for (const [k, v] of Object.entries(numericFields)) {
      this._updateEWMA(k, v);
      const score = this._anomalyScore(k, v);
      if (score >= this.config.anomalyThreshold) {
        this.envBus.emit("self:anomaly", { type, key: k, value: v, score, threshold: this.config.anomalyThreshold });
        this._note(`Anomalia detectada em ${k} (evento ${type}): z≈${score.toFixed(2)}`);
      }
    }

    // broadcast observed summary
    this.envBus.emit("self:observed", { ts, type });
  }

  _collectNumeric(obj, prefix = "") {
    const out = {};
    if (obj == null) return out;
    if (typeof obj === "number" && Number.isFinite(obj)) {
      out[prefix || "value"] = obj;
      return out;
    }
    if (typeof obj !== "object") return out;
    for (const [k, v] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (typeof v === "number" && Number.isFinite(v)) {
        out[path] = v;
      } else if (v && typeof v === "object") {
        Object.assign(out, this._collectNumeric(v, path));
      }
    }
    return out;
  }

  _updateEWMA(key, x) {
    const a = this.config.anomalyEWMAAlpha;
    const mean = (this.state.ewma[key] !== undefined) ? this.state.ewma[key] : x;
    const newMean = mean + a * (x - mean);
    this.state.ewma[key] = newMean;

    const v = this.state.variance[key] ?? 0;
    const newVar = (1 - a) * (v + a * (x - mean) ** 2);
    this.state.variance[key] = newVar;

    this.envBus.emit("self:metric:update", { metric: key, ewma: newMean, variance: newVar });
  }

  _anomalyScore(key, x) {
    if (!(key in this.state.ewma)) return 0;
    const mean = this.state.ewma[key];
    const variance = Math.max(this.state.variance[key] ?? 0, 1e-12);
    const sd = Math.sqrt(variance);
    if (!isFinite(sd) || sd === 0) return 0;
    return Math.abs((x - mean) / sd);
  }

  /* --------------------------- Dynamic Analysis Methods --------------- */
  /**
   * createAnalysisMethod(name, fnOrSource, meta)
   *  - fnOrSource: function(payload, ctx) or string with function body
   *  - ctx: { state, config, emit, note }
   */
  createAnalysisMethod(name, fnOrSource, meta = {}) {
    if (!name) throw new Error("Nome do método é obrigatório.");
    let fn = fnOrSource;

    if (typeof fnOrSource === "string") {
      // user provides JS body; we wrap into function(payload, ctx) { ... }
      // NOTE: using new Function is powerful; keep behavior limited by design.
      fn = new Function("payload", "ctx", `"use strict"; ${fnOrSource}`);
    }

    if (typeof fn !== "function") {
      throw new Error("fnOrSource precisa ser função ou string contendo código.");
    }

    const self = this;
    const wrapped = function (payload) {
      const ctx = {
        state: self.state,
        config: self.config,
        emit: (type, data) => self.envBus.emit(type, data),
        note: (m) => self._note(m)
      };
      try {
        const res = fn(payload, ctx);
        self.envBus.emit("self:analysis:run", { name, payload });
        return res;
      } catch (err) {
        self.envBus.emit("self:analysis:error", { name, error: err.message });
        throw err;
      }
    };

    this.state.methods[name] = wrapped;
    this.envBus.emit("self:method:created", { name, meta, message: "Método de análise registrado." });
    return true;
  }

  removeAnalysisMethod(name) {
    if (this.state.methods[name]) {
      delete this.state.methods[name];
      this.envBus.emit("self:method:removed", { name });
      return true;
    }
    return false;
  }

  listAnalysisMethods() {
    return Object.keys(this.state.methods);
  }

  runAnalysis(name, payload) {
    const fn = this.state.methods[name];
    if (!fn) {
      this.envBus.emit("self:analysis:error", { name, message: "Método não encontrado." });
      return undefined;
    }
    try {
      const result = fn(payload);
      // if result is Promise, handle async and emit done on resolution
      if (result && typeof result.then === "function") {
        result.then((out) => this.envBus.emit("self:analysis:done", { name, output: out }))
              .catch((err) => this.envBus.emit("self:analysis:error", { name, error: err.message }));
      } else {
        this.envBus.emit("self:analysis:done", { name, output: result });
      }
      return result;
    } catch (err) {
      this.envBus.emit("self:analysis:error", { name, error: err.message });
      return undefined;
    }
  }

  /* --------------------------- Policies & Orchestration ---------------- */
  setDirective(ruleFn) {
    this.state.policies.push(ruleFn);
    this.envBus.emit("self:policy:added", { ruleFn: String(ruleFn) });
    return true;
  }

  blockChannel(type) {
    this.state.blocked.add(type);
    this.envBus.emit("self:policy:blocked:add", { type });
  }

  unblockChannel(type) {
    this.state.blocked.delete(type);
    this.envBus.emit("self:policy:blocked:remove", { type });
  }

  command(targetChannel, data = {}) {
    // uses envBus.emit -> will pass through hook & policy
    this.envBus.emit(targetChannel, data);
    this.envBus.emit("self:command:issued", { targetChannel, data });
  }

  /* --------------------------- Rewrite / Proposals --------------------- */
  proposeRefactor(targetClass, reasons = [], hints = {}) {
    const proposal = {
      ts: Date.now(),
      targetClass,
      reasons,
      hints,
      id: `proposal_${Math.random().toString(36).slice(2)}`
    };
    this.state.proposals.push(proposal);
    this.envBus.emit("self:rewrite:proposal", proposal);
    return proposal.id;
  }

  requestRewriteApply(targetClass, patchOrSpec, justification) {
    this.envBus.emit("rewrite:apply", {
      targetClass,
      patchOrSpec,
      justification,
      requestedBy: "SelfAwareness"
    });
  }

  /* --------------------------- Persistence ----------------------------- */
  save() {
    const snapshot = {
      ts: Date.now(),
      config: this.config,
      state: {
        counters: this.state.counters,
        ewma: this.state.ewma,
        variance: this.state.variance,
        policies: this.state.policies.map(String),
        blocked: Array.from(this.state.blocked),
        notes: this.state.notes.slice(-100),
        proposals: this.state.proposals.slice(-50)
      }
    };
    this.envBus.emit("self:save", { snapshot });
    return snapshot;
  }

  load(snapshot) {
    if (!snapshot) return;
    this.config = Object.assign({}, this.config, snapshot.config || {});
    const s = snapshot.state || {};
    this.state.counters = s.counters || {};
    this.state.ewma = s.ewma || {};
    this.state.variance = s.variance || {};
    this.state.policies = s.policies || [];
    this.state.blocked = new Set(s.blocked || []);
    this.state.notes = s.notes || [];
    this.state.proposals = s.proposals || [];
    this.envBus.emit("self:load", { ok: true });
  }

  /* --------------------------- Heartbeat & Notes ---------------------- */
  _startHeartbeat() {
    if (this._hb) clearInterval(this._hb);
    this._hb = setInterval(() => {
      const uptime = Date.now() - this.state.startedAt;
      this.envBus.emit("self:heartbeat", {
        uptimeMs: uptime,
        eventsSeen: this.state.events.length,
        counters: this.state.counters,
        blockedCount: this.state.blocked.size
      });
    }, this.config.heartbeatMs);
  }

  _note(text) {
    this.state.notes.push({ ts: Date.now(), text });
    if (this.state.notes.length > 500) this.state.notes.shift();
    this.envBus.emit("self:note", { text });
  }

  /* --------------------------- Utilities ------------------------------ */
  // Expose minimal introspection
  info() {
    return {
      startedAt: this.state.startedAt,
      eventsSeen: this.state.events.length,
      methods: this.listAnalysisMethods(),
      blocked: Array.from(this.state.blocked)
    };
  }

  destroy() {
    if (this._hb) clearInterval(this._hb);
    // restore original emit if installed
    if (this._emitHookInstalled && this._originalEmit) {
      try {
        this.envBus.emit = this._originalEmit;
      } catch {
        // ignore
      }
      this._emitHookInstalled = false;
    }
    this.envBus.emit("self:destroy", { message: "Self-awareness finalizado." });
  }
}

module.exports = SayureSelfAwarenessEvaluatingNelralNetwork;
