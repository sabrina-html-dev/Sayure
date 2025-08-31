class ImageBase {
  constructor(src = null) {
    this.src = src;
    this.width = 0;
    this.height = 0;
    this.loaded = false;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    if (src) {
      this.load(src);
    }
  }

  // Carrega uma imagem a partir de URL/base64
  load(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        this.loaded = true;
        resolve(this);
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Retorna largura
  getWidth() {
    return this.width;
  }

  // Retorna altura
  getHeight() {
    return this.height;
  }

  // Retorna se já foi carregada
  isLoaded() {
    return this.loaded;
  }

  // Retorna o "source" (CanvasImageSource)
  getSource() {
    return this.canvas;
  }

  // Escala imagem mantendo proporção ou não
  getScaledInstance(newW, newH, smooth = true) {
    const scaled = new ImageBase();
    scaled.canvas.width = newW;
    scaled.canvas.height = newH;
    scaled.ctx.imageSmoothingEnabled = smooth;
    scaled.ctx.drawImage(this.canvas, 0, 0, newW, newH);
    scaled.width = newW;
    scaled.height = newH;
    scaled.loaded = true;
    return scaled;
  }

  // Obtém os dados de pixel (equivalente a Raster em Java)
  getPixelData() {
    return this.ctx.getImageData(0, 0, this.width, this.height);
  }

  // Aplica filtro simples em todos os pixels
  applyFilter(filterFn) {
    const imgData = this.getPixelData();
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b, a] = [data[i], data[i+1], data[i+2], data[i+3]];
      const [nr, ng, nb, na] = filterFn(r, g, b, a);
      data[i] = nr;
      data[i+1] = ng;
      data[i+2] = nb;
      data[i+3] = na;
    }
    this.ctx.putImageData(imgData, 0, 0);
  }

  // Desenha no outro canvas/contexto
  draw(ctx, x = 0, y = 0) {
    ctx.drawImage(this.canvas, x, y);
  }
}
module.exports = { ImageBase };