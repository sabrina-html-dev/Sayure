const Sayure = require('../Sayure.js');

/**
 * @description Módulo para capturar e processar dados de imagem via arquivo ou câmera
 * - Suporta entrada via upload de arquivo ou captura direta da webcam
 * - Pré-processa imagens para envio a redes neurais ou outros módulos de análise
 * - Emite eventos de diagnóstico para monitoramento e depuração
 * ```html
 * <input type="file" id="imgInput" accept="image/*" />
 * <video id="camView" width="320" height="240" autoplay></video>
 * <canvas id="snapshot" width="320" height="240" style="display:none;"></canvas>
 * <button id="snap">Capturar Frame</button>
 * <script>
 * const listener = new SayureListenInputByImageData();

document.querySelector('#imgInput').addEventListener('change', (e) => {
  listener.handleFileInputChange(e);
});

const video = document.getElementById('camView');
const canvas = document.getElementById('snapshot');

listener.startCameraCapture(video, canvas);

document.querySelector('#snap').addEventListener('click', () => {
  listener.captureAndSendFrame();
});
 * </script>
*/
class SayureListenInputByImageData {
  constructor(options = {}) {
    this.options = options;
    this.videoStream = null;
    this.videoElement = null;
    this.canvasElement = null;

    this.setupEventListeners();
    this.logDiagnostic('constructor', 'initialized', options);
  }

  // 🧩 Setup de event listeners (DOM, eventos globais, etc.)
  setupEventListeners() {
    this.logDiagnostic('setupEventListeners', 'ready');
  }

  // 🖼️ Entrada via arquivo de imagem
  handleFileInputChange(event) {
    const file = event.target.files[0];
    if (this.validateImageFile(file)) {
      this.processFile(file);
    } else {
      this.logDiagnostic('handleFileInputChange', 'error', { reason: 'invalid file' });
    }
  }

  async processFile(file) {
    this.logDiagnostic('processFile', 'start');
    const imageBitmap = await createImageBitmap(file);
    const processedImage = await this.prepareImageForInference(imageBitmap);
    this.sendToNeuralNetwork(processedImage);
    this.logDiagnostic('processFile', 'end');
  }

  // 📷 Entrada via câmera (getUserMedia)
  async startCameraCapture(videoElement, canvasElement) {
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;

    this.logDiagnostic('startCameraCapture', 'start');
    try {
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.srcObject = this.videoStream;
      await this.videoElement.play();
      this.logDiagnostic('startCameraCapture', 'success');
    } catch (err) {
      this.logDiagnostic('startCameraCapture', 'error', { error: err.message });
    }
  }

  stopCameraCapture() {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach(track => track.stop());
      this.videoStream = null;
      this.logDiagnostic('stopCameraCapture', 'stopped');
    }
  }

  captureFrameFromCamera() {
    if (!this.videoElement || !this.canvasElement) return;

    const ctx = this.canvasElement.getContext('2d');
    ctx.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasElement.toDataURL('image/png');

    this.logDiagnostic('captureFrameFromCamera', 'captured');
    return this.dataURLToImageBitmap(imageData);
  }

  async captureAndSendFrame() {
    const imageBitmap = await this.captureFrameFromCamera();
    const processed = await this.prepareImageForInference(imageBitmap);
    this.sendToNeuralNetwork(processed);
    this.logDiagnostic('captureAndSendFrame', 'sent');
  }

  // 🧠 Comunicação com rede neural
  sendToNeuralNetwork(data) {
    Sayure.envBus.emit('imageDataReady', data);
    this.logDiagnostic('sendToNeuralNetwork', 'dataSent', { size: data?.length || 'unknown' });
  }

  handleNeuralNetworkResponse(response) {
    this.logDiagnostic('handleNeuralNetworkResponse', 'received', response);
    // TODO: Tratar resposta
  }

  // 🧹 Pré-processamento da imagem
  async prepareImageForInference(imageBitmap) {
    this.logDiagnostic('prepareImageForInference', 'start');
    // TODO: Redimensionar, normalizar, converter para tensor, etc.
    return imageBitmap;
  }

  // 🧪 Validação
  validateImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const isValid = file && validTypes.includes(file.type);
    this.logDiagnostic('validateImageFile', isValid ? 'valid' : 'invalid', { fileType: file?.type });
    return isValid;
  }

  async dataURLToImageBitmap(dataURL) {
    const res = await fetch(dataURL);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  }

  resetState() {
    this.videoStream = null;
    this.videoElement = null;
    this.canvasElement = null;
    this.logDiagnostic('resetState', 'done');
  }

  // 📢 Diagnóstico centralizado
  logDiagnostic(method, status, extra = {}) {
    Sayure.envBus.emit('diagnostic', {
      source: 'SayureListenInputByImageData',
      method,
      status,
      timestamp: Date.now(),
      ...extra
    });
  }
}
module.exports = SayureListenInputByImageData;