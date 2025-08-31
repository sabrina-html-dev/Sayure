export class JPEGHuffmanTable {
  constructor(codes = [], lengths = []) {
    this.codes = codes;
    this.lengths = lengths;
  }

  static getStdLuminanceDCTable() {
    return new JPEGHuffmanTable(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      [2, 3, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9]
    );
  }
}
