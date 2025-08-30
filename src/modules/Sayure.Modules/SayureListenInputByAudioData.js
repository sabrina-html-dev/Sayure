const Sayure = require('../Sayure.js');
/**
 * ```
 * const sayureListener = new SayureListenInputByAudioData();
 * // Exemplo com input file:
 * document.querySelector('#audioFile').addEventListener('change', e => {
 *   sayureListener.handleFileInputChange(e);
 * });
 * // Exemplo com microfone:
 * document.querySelector('#recordBtn').addEventListener('click', () => {
 *   sayureListener.startMicrophoneCapture();
 * });
 * ```
*/
class SayureListenInputByAudioData {
  constructor(options = {}) {
    this.options = options;
    this.mediaStream = null;
    this.audioChunks = [];
    this.recorder = null;

    this.setupEventListeners();
    this.logDiagnostic('constructor', 'initialized', options);
  }

  // 🎧 Configuração de listeners globais ou do DOM
  setupEventListeners() {
    // Exemplo: document.querySelector('#fileInput').addEventListener('change', this.handleFileInputChange.bind(this));
    this.logDiagnostic('setupEventListeners', 'ready');
  }

  // 🗃️ Entrada via arquivo (input file)
  handleFileInputChange(event) {
    const file = event.target.files[0];
    if (this.validateAudioFile(file)) {
      this.processFile(file);
    } else {
      this.logDiagnostic('handleFileInputChange', 'error', { reason: 'invalid file' });
    }
  }

  // 🗂️ Processamento inicial do arquivo
  async processFile(file) {
    this.logDiagnostic('processFile', 'start');
    const arrayBuffer = await file.arrayBuffer();
    const audioBuffer = await this.arrayBufferToAudioBuffer(arrayBuffer);
    const converted = await this.convertToStandardFormat(audioBuffer);
    const features = await this.extractFeatures(converted);
    const prepared = this.prepareDataForInference(features);
    this.sendToNeuralNetwork(prepared);
    this.logDiagnostic('processFile', 'end');
  }

  // 🎙️ Entrada via microfone (Web Audio API)
  async startMicrophoneCapture() {
    this.logDiagnostic('startMicrophoneCapture', 'start');
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.handleAudioStream(this.mediaStream);
      this.logDiagnostic('startMicrophoneCapture', 'success');
    } catch (err) {
      this.logDiagnostic('startMicrophoneCapture', 'error', { error: err.message });
    }
  }

  stopMicrophoneCapture() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
      this.logDiagnostic('stopMicrophoneCapture', 'success');
    }
  }

  handleAudioStream(stream) {
    this.audioChunks = [];
    this.recorder = new MediaRecorder(stream);

    this.recorder.ondataavailable = (e) => {
      this.audioChunks.push(e.data);
    };

    this.recorder.onstop = async () => {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
      const converted = await this.convertToStandardFormat(blob);
      const features = await this.extractFeatures(converted);
      const prepared = this.prepareDataForInference(features);
      this.sendToNeuralNetwork(prepared);
      this.logDiagnostic('handleAudioStream', 'recordingComplete');
    };

    this.recorder.start();
    this.logDiagnostic('handleAudioStream', 'recordingStarted');
  }

  collectAudioChunks() {
    // Este método pode ser usado em fluxos personalizados
    this.logDiagnostic('collectAudioChunks', 'called');
  }

  // 🎛️ Processamento de áudio
  async convertToStandardFormat(audioInput) {
    this.logDiagnostic('convertToStandardFormat', 'start');
    // TODO: Implementar conversão para WAV 16kHz mono, por exemplo
    return audioInput;
  }

  async extractFeatures(audioData) {
    this.logDiagnostic('extractFeatures', 'start');
    // TODO: Extrair MFCCs, espectrograma, etc.
    return audioData;
  }

  prepareDataForInference(features) {
    this.logDiagnostic('prepareDataForInference', 'start');
    // TODO: Converter para tensor ou outro formato aceito pela rede
    return features;
  }

  // 🧠 Comunicação com a rede neural
  sendToNeuralNetwork(data) {
    Sayure.envBus.emit('audioDataReady', data);
    this.logDiagnostic('sendToNeuralNetwork', 'dataSent', { size: data?.length });
  }

  handleNeuralNetworkResponse(response) {
    this.logDiagnostic('handleNeuralNetworkResponse', 'received', response);
    // TODO: Tratar resposta da inferência
  }

  // ✅ Utilitários
  validateAudioFile(file) {
    const validTypes = ['audio/wav', 'audio/webm', 'audio/mp3'];
    const isValid = file && validTypes.includes(file.type);
    this.logDiagnostic('validateAudioFile', isValid ? 'valid' : 'invalid', { fileType: file?.type });
    return isValid;
  }

  async arrayBufferToAudioBuffer(arrayBuffer) {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    return await context.decodeAudioData(arrayBuffer);
  }

  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  resetState() {
    this.audioChunks = [];
    this.mediaStream = null;
    this.recorder = null;
    this.logDiagnostic('resetState', 'done');
  }

  // 📢 Diagnóstico centralizado
  logDiagnostic(method, status, extra = {}) {
    Sayure.envBus.emit('diagnostic', {
      source: 'SayureListenInputByAudioData',
      method,
      status,
      timestamp: Date.now(),
      ...extra
    });
  }
}
module.exports = SayureListenInputByAudioData;