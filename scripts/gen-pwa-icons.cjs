// Generates solid-navy square PWA icons with a simple "SA" monogram.
// Dependency-free: writes valid PNGs using Node's built-in zlib.
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// 5x7 pixel font for "S" and "A" (1 = glyph pixel)
const GLYPHS = {
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
};

function makePng(size) {
  // Background navy #05080f, glyph color accent #5b8dd6
  const BG = [0x05, 0x08, 0x0f];
  const FG = [0x5b, 0x8d, 0xd6];

  // Layout the "SA" monogram centered.
  // Each glyph is 5 wide x 7 tall. Two glyphs + 1 col gap = 11 cols wide.
  const glyphCols = 5;
  const glyphRows = 7;
  const gap = 1;
  const totalCols = glyphCols * 2 + gap;
  const totalRows = glyphRows;

  // Scale glyph pixels to fill ~55% of the image.
  const scale = Math.max(1, Math.floor((size * 0.55) / totalCols));
  const glyphW = totalCols * scale;
  const glyphH = totalRows * scale;
  const offsetX = Math.floor((size - glyphW) / 2);
  const offsetY = Math.floor((size - glyphH) / 2);

  // Build pixel buffer: size * size * 3 bytes, row-major.
  const rowBytes = 1 + size * 3; // +1 filter byte per row
  const raw = Buffer.alloc(size * rowBytes);
  for (let y = 0; y < size; y++) {
    raw[y * rowBytes] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      let fg = false;
      const gx = x - offsetX;
      const gy = y - offsetY;
      if (gx >= 0 && gy >= 0 && gx < glyphW && gy < glyphH) {
        const col = Math.floor(gx / scale);
        const row = Math.floor(gy / scale);
        let letter, lcol;
        if (col < glyphCols) {
          letter = 'S';
          lcol = col;
        } else if (col >= glyphCols + gap) {
          letter = 'A';
          lcol = col - glyphCols - gap;
        }
        if (letter && GLYPHS[letter][row] && GLYPHS[letter][row][lcol]) {
          fg = true;
        }
      }
      const [r, g, b] = fg ? FG : BG;
      const off = y * rowBytes + 1 + x * 3;
      raw[off] = r;
      raw[off + 1] = g;
      raw[off + 2] = b;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const idat = zlib.deflateSync(raw);

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = path.resolve(__dirname, '..', 'public');
fs.writeFileSync(path.join(outDir, 'icon-192.png'), makePng(192));
fs.writeFileSync(path.join(outDir, 'icon-512.png'), makePng(512));
console.log('Wrote icon-192.png and icon-512.png to', outDir);
