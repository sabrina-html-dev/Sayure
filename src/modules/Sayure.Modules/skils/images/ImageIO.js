class ImageIO {
  constructor(envBus) {
    this.envBus = envBus;
  }

  // Lê imagem a partir de URL/base64
  async read(src) {
    const img = new ImageBase();
    await img.load(src);

    this.envBus.emit("imageio:read", { src, width: img.getWidth(), height: img.getHeight() });

    return img;
  }

  // Lê imagem a partir de um File (ex.: input <input type="file">)
  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const img = new ImageBase();
          await img.load(e.target.result);
          this.envBus.emit("imageio:readFile", { name: file.name, size: file.size });
          resolve(img);
        } catch (err) {
          this.envBus.emit("imageio:error", { error: err.message });
          reject(err);
        }
      };

      reader.onerror = (err) => {
        this.envBus.emit("imageio:error", { error: err.message });
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  }

  // Escreve imagem (exporta) em Base64
  writeBase64(imageBase, format = "image/png") {
    const dataURL = imageBase.canvas.toDataURL(format);

    this.envBus.emit("imageio:writeBase64", { format });

    return dataURL;
  }

  // Escreve imagem (exporta) em Blob
  async writeBlob(imageBase, format = "image/png", quality = 0.92) {
    return new Promise((resolve) => {
      imageBase.canvas.toBlob((blob) => {
        this.envBus.emit("imageio:writeBlob", { format, size: blob.size });
        resolve(blob);
      }, format, quality);
    });
  }
}