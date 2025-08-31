export class JPEGImageReadParam {
  constructor() {
    this.sourceRegion = null; // {x,y,w,h}
    this.subsampling = 1;     // fator de amostragem
  }

  setSourceRegion(x, y, w, h) {
    this.sourceRegion = { x, y, w, h };
  }

  setSubsampling(factor) {
    this.subsampling = factor;
  }
}
