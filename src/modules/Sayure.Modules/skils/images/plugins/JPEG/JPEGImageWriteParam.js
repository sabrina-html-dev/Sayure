export class JPEGImageWriteParam {
  constructor() {
    this.quality = 0.92;       // entre 0 e 1
    this.progressive = false;  // JPEG progressivo?
    this.subsampling = "4:2:0";
  }

  setQuality(q) {
    if (q < 0 || q > 1) throw new Error("Qualidade deve estar entre 0 e 1");
    this.quality = q;
  }

  setProgressive(enable) {
    this.progressive = !!enable;
  }

  setSubsampling(mode) {
    this.subsampling = mode;
  }
}
