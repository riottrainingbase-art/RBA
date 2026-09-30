import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { deflateSync } from "node:zlib";

const WIDTH = 1200;
const HEIGHT = 810;
const CELL_W = 400;
const CELL_H = 405;

const FONT = {
  "A":["01110","10001","10001","11111","10001","10001","10001"],
  "B":["11110","10001","10001","11110","10001","10001","11110"],
  "C":["01111","10000","10000","10000","10000","10000","01111"],
  "E":["11111","10000","10000","11110","10000","10000","11111"],
  "F":["11111","10000","10000","11110","10000","10000","10000"],
  "H":["10001","10001","10001","11111","10001","10001","10001"],
  "I":["11111","00100","00100","00100","00100","00100","11111"],
  "L":["10000","10000","10000","10000","10000","10000","11111"],
  "M":["10001","11011","10101","10101","10001","10001","10001"],
  "O":["01110","10001","10001","10001","10001","10001","01110"],
  "P":["11110","10001","10001","11110","10000","10000","10000"],
  "R":["11110","10001","10001","11110","10100","10010","10001"],
  "S":["01111","10000","10000","01110","00001","00001","11110"],
  "T":["11111","00100","00100","00100","00100","00100","00100"],
  "U":["10001","10001","10001","10001","10001","10001","01110"],
  "W":["10001","10001","10001","10101","10101","11011","10001"],
  "Y":["10001","10001","01010","00100","00100","00100","00100"],
  " ":["00000","00000","00000","00000","00000","00000","00000"],
};

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function createCanvas() {
  const pixels = Buffer.alloc(WIDTH * HEIGHT * 3);
  return {
    pixels,
    setPixel(x, y, color) {
      if (x < 0 || y < 0 || x >= WIDTH || y >= HEIGHT) return;
      const index = (y * WIDTH + x) * 3;
      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
    },
  };
}

function fillRect(canvas, x, y, width, height, color) {
  for (let yy = y; yy < y + height; yy++) {
    for (let xx = x; xx < x + width; xx++) {
      canvas.setPixel(xx, yy, color);
    }
  }
}

function drawLine(canvas, x0, y0, x1, y1, color, thickness = 1) {
  if (x0 === x1) {
    fillRect(canvas, x0, y0, thickness, y1 - y0 + 1, color);
    return;
  }
  if (y0 === y1) {
    fillRect(canvas, x0, y0, x1 - x0 + 1, thickness, color);
  }
}

function textWidth(text, scale) {
  return [...text].reduce((sum, char, index) => {
    const isLast = index === text.length - 1;
    return sum + 5 * scale + (isLast ? 0 : scale);
  }, 0);
}

function drawText(canvas, text, centerX, topY, scale, color) {
  const upper = text.toUpperCase();
  let x = Math.round(centerX - textWidth(upper, scale) / 2);
  for (const char of upper) {
    const glyph = FONT[char] ?? FONT[" "];
    for (let row = 0; row < glyph.length; row++) {
      for (let col = 0; col < glyph[row].length; col++) {
        if (glyph[row][col] === "1") {
          fillRect(canvas, x + col * scale, topY + row * scale, scale, scale, color);
        }
      }
    }
    x += 6 * scale;
  }
}

function generateRichMenuPng() {
  const canvas = createCanvas();
  const backgrounds = [
    [14, 15, 17], [20, 21, 23], [26, 27, 29],
    [10, 11, 13], [16, 17, 19], [22, 23, 25],
  ];
  const labels = [
    "RTB",
    "RBA PLAYERS",
    "RBA COACHES",
    "HOME COURT",
    "RBA WEBSITE",
    "STAFF",
  ];

  for (let index = 0; index < 6; index++) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const x = col * CELL_W;
    const y = row * CELL_H;
    fillRect(canvas, x, y, CELL_W, CELL_H, backgrounds[index]);
    drawText(canvas, "RIOT", x + CELL_W / 2, y + 55, 4, [245, 245, 245]);
    drawText(canvas, labels[index], x + CELL_W / 2, y + 180, 5, [255, 255, 255]);
    drawLine(canvas, x + 45, y + CELL_H - 52, x + CELL_W - 45, y + CELL_H - 52, [220, 220, 220], 2);
  }

  drawLine(canvas, CELL_W, 0, CELL_W, HEIGHT - 1, [60, 60, 60], 2);
  drawLine(canvas, CELL_W * 2, 0, CELL_W * 2, HEIGHT - 1, [60, 60, 60], 2);
  drawLine(canvas, 0, CELL_H, WIDTH - 1, CELL_H, [60, 60, 60], 2);

  const rawRows = [];
  for (let y = 0; y < HEIGHT; y++) {
    const row = Buffer.alloc(1 + WIDTH * 3);
    row[0] = 0;
    canvas.pixels.copy(row, 1, y * WIDTH * 3, (y + 1) * WIDTH * 3);
    rawRows.push(row);
  }

  const signature = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(Buffer.concat(rawRows), { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const richMenu = {
  size: { width: WIDTH, height: HEIGHT },
  selected: true,
  name: "RIOT RTB + RBA",
  chatBarText: "RIOT MENU",
  areas: [
    {
      bounds: { x: 0, y: 0, width: CELL_W, height: CELL_H },
      action: {
        type: "message",
        label: "RTB",
        text: "RTBのパーソナルトレーニングについて相談したい",
      },
    },
    {
      bounds: { x: CELL_W, y: 0, width: CELL_W, height: CELL_H },
      action: {
        type: "message",
        label: "RBA Players",
        text: "RBAの選手・保護者向け活動について知りたい",
      },
    },
    {
      bounds: { x: CELL_W * 2, y: 0, width: CELL_W, height: CELL_H },
      action: {
        type: "message",
        label: "RBA Coaches",
        text: "RBAの指導者向け活動について知りたい",
      },
    },
    {
      bounds: { x: 0, y: CELL_H, width: CELL_W, height: CELL_H },
      action: {
        type: "uri",
        label: "MY HOME COURT",
        uri: "https://riotbasketballacademy.com/ja/my-homecourt",
      },
    },
    {
      bounds: { x: CELL_W, y: CELL_H, width: CELL_W, height: CELL_H },
      action: {
        type: "uri",
        label: "RBA Website",
        uri: "https://riotbasketballacademy.com/ja",
      },
    },
    {
      bounds: { x: CELL_W * 2, y: CELL_H, width: CELL_W, height: CELL_H },
      action: {
        type: "message",
        label: "Staff",
        text: "スタッフに確認してほしいことがあります",
      },
    },
  ],
};

async function readError(response) {
  const text = await response.text().catch(() => "");
  return text.slice(0, 1000);
}

async function lineJson(url, options = {}) {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not configured");

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${url} failed: ${response.status} ${await readError(response)}`);
  }

  if (response.status === 204) return {};
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const outputPath = resolve(process.env.LINE_RICH_MENU_IMAGE ?? "public/line-rich-menu.png");
  const png = generateRichMenuPng();
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, png);

  if (png.length > 1_000_000) {
    throw new Error(`Generated rich menu image is too large: ${png.length} bytes`);
  }

  console.log(`Generated rich menu image: ${outputPath} (${png.length} bytes)`);

  if (args.has("--image-only")) return;
  if (args.has("--dry-run")) {
    console.log(JSON.stringify(richMenu, null, 2));
    return;
  }

  await lineJson("https://api.line.me/v2/bot/richmenu/validate", {
    method: "POST",
    body: JSON.stringify(richMenu),
  });

  let richMenuId = null;
  try {
    const created = await lineJson("https://api.line.me/v2/bot/richmenu", {
      method: "POST",
      body: JSON.stringify(richMenu),
    });
    richMenuId = created.richMenuId;
    if (!richMenuId) throw new Error("LINE did not return richMenuId");

    const upload = await fetch(`https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        "Content-Type": "image/png",
      },
      body: png,
    });
    if (!upload.ok) {
      throw new Error(`Rich menu image upload failed: ${upload.status} ${await readError(upload)}`);
    }

    await lineJson(`https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`, {
      method: "POST",
    });

    console.log(JSON.stringify({
      ok: true,
      richMenuId,
      image: outputPath,
      defaultSet: true,
    }, null, 2));
  } catch (error) {
    if (richMenuId) {
      await fetch(`https://api.line.me/v2/bot/richmenu/${richMenuId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}` },
      }).catch(() => undefined);
    }
    throw error;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
