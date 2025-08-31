const { ImageBase } = await import("./ImageBase");
const { sayure } = require("../../../Sayure");
/**
 * ```
 * import { Toolkit } from "./Toolkit.js";

// Inicializa o toolkit com o envBus do Sayure
const toolkit = Toolkit.init(Sayure.envBus);

// Listeners
Sayure.envBus.on("toolkit:getImage", (info) => {
  console.log("Imagem carregada:", info);
});

Sayure.envBus.on("toolkit:createImage", (info) => {
  console.log("Imagem criada vazia:", info);
});

Sayure.envBus.on("toolkit:beep", () => {
  console.log("Beep chamado pelo Toolkit!");
});

// Carregando imagem
(async () => {
  const img = await toolkit.getImage("foto.png");

  // Redimensionando com ImageBase
  const scaled = img.getScaledInstance(200, 200);
  console.log("Scaled image:", scaled);

  // Criando imagem vazia pelo Toolkit
  const blank = toolkit.createImage(300, 150);
  blank.draw(document.getElementById("screen").getContext("2d"), 50, 50);
})();

 * ```
*/
class Toolkit {
  constructor(envBus) {
    if (!envBus) {
      throw new Error("Toolkit precisa de uma instância de Sayure.envBus");
    }
    this.envBus = envBus;
  }

  // Singleton (como Toolkit.getDefaultToolkit())
  static init(envBus) {
    if (!Toolkit.instance) {
      Toolkit.instance = new Toolkit(envBus);
    }
    return Toolkit.instance;
  }

  // ===== Métodos =====

  // Cria uma imagem a partir de src (equivalente ao Toolkit.getImage)
  async getImage(src) {
    const img = new ImageBase();
    await img.load(src);

    this.envBus.emit("toolkit:getImage", { src, width: img.getWidth(), height: img.getHeight() });

    return img;
  }

  // Cria uma imagem a partir de um canvas vazio (equivalente a Toolkit.createImage)
  createImage(width, height) {
    const img = new ImageBase();
    img.canvas.width = width;
    img.canvas.height = height;
    img.width = width;
    img.height = height;
    img.loaded = true;

    this.envBus.emit("toolkit:createImage", { width, height });

    return img;
  }

  // Emite um beep (equivalente ao Toolkit.beep)
  beep() {
    this.envBus.emit("toolkit:beep", { timestamp: Date.now() });

    // Beep sonoro real (simples)
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }

  // Retorna resolução da tela
  getScreenResolution() {
    const res = { width: window.screen.width, height: window.screen.height };

    this.envBus.emit("toolkit:getScreenResolution", res);

    return res;
  }

  // Lê texto da área de transferência
  async getClipboardText() {
    try {
      const text = await navigator.clipboard.readText();
      this.envBus.emit("toolkit:getClipboardText", { text });
      return text;
    } catch (err) {
      this.envBus.emit("toolkit:clipboardError", { error: err.message });
      return null;
    }
  }

  // Define texto na área de transferência
  async setClipboardText(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.envBus.emit("toolkit:setClipboardText", { text });
    } catch (err) {
      this.envBus.emit("toolkit:clipboardError", { error: err.message });
    }
  }
}