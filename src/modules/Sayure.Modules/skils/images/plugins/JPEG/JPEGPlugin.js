import { JPEGImageReadParam } from "./JPEGImageReadParam.js";
import { JPEGImageWriteParam } from "./JPEGImageWriteParam.js";
import { JPEGQTable } from "./JPEGQTable.js";
import { JPEGHuffmanTable } from "./JPEGHuffmanTable.js";
/**
 * ```
 * import { JPEGPlugin } from "./Sayure.module/skils/javax/imageio/plugins/jpeg/JPEGPlugin.js";

const jpeg = new JPEGPlugin();

const img = jpeg.read("foto.jpg", { subsampling: 2 });
console.log("Imagem carregada:", img);

const buffer = jpeg.write(img, { quality: 0.8, progressive: true });
console.log("JPEG gerado:", buffer);

console.log("Tabelas padrão:", jpeg.getDefaultTables());

 * ```
*/
export class JPEGPlugin {
  constructor() {
    this.name = "JPEGPlugin";
    this.supportedFormats = ["jpg", "jpeg"];
  }

  read(input, options = {}) {
    const params = new JPEGImageReadParam();
    Object.assign(params, options);

    Sayure.envBus.emit("JPEGPlugin:read:start", { input, params });

    // Aqui futuramente você pode implementar parsing real do JPEG
    const fakeImage = {
      width: 256,
      height: 256,
      data: new Uint8ClampedArray(256 * 256 * 4) // RGBA fake buffer
    };

    Sayure.envBus.emit("JPEGPlugin:read:end", { image: fakeImage });
    return fakeImage;
  }

  write(image, options = {}) {
    const params = new JPEGImageWriteParam();
    Object.assign(params, options);

    Sayure.envBus.emit("JPEGPlugin:write:start", { image, params });

    // Aqui futuramente você pode implementar codificação real em JPEG
    const jpegBuffer = new Uint8Array([0xFF, 0xD8, 0xFF]); // só SOI marker fake

    Sayure.envBus.emit("JPEGPlugin:write:end", { buffer: jpegBuffer });
    return jpegBuffer;
  }

  getDefaultTables() {
    return {
      qTables: {
        luminance: JPEGQTable.getStandardLuminanceTable(),
        chrominance: JPEGQTable.getStandardChrominanceTable()
      },
      hTables: {
        luminanceDC: JPEGHuffmanTable.getStdLuminanceDCTable(),
        // aqui você pode adicionar as tabelas AC também
      }
    };
  }
}
