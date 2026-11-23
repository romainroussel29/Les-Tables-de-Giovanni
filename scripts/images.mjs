// Optimisation des images : src/img-originales/ → public/assets/img/
//
//   npm run images
//
// Chaque photo d'origine (JPEG, PNG ou WebP, à la racine de src/img-originales/) est convertie
// en WebP et déclinée en plusieurs largeurs, pour l'attribut srcset :
//   menu-table-provencale.jpg  →  menu-table-provencale-480w.webp, -960w.webp, -1100w.webp
// Donnez à l'original un nom descriptif en minuscules et tirets : il sera repris tel quel (SEO).
// Une image déjà optimisée et plus récente que son original n'est pas recalculée.
//
// Il met à jour src/js/data/images.json (dimensions lues par React) et régénère aussi les icônes du site à partir de public/assets/icons/favicon.svg :
// favicon.ico, apple-touch-icon.png et les icônes 192 / 512 px du manifeste.

import sharp from 'sharp';
import { readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINALS = join(ROOT, 'src', 'img-originales');
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, 'assets', 'img');
const ICONS = join(PUBLIC, 'assets', 'icons');

const MAX_WIDTH = { landscape: 2400, portrait: 1100 };
const MENU_MAX_WIDTH = { landscape: 1200, portrait: 1100 };
const VARIANT_WIDTHS = [480, 960];
const QUALITY = 80;
const SOURCES = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const mtime = (path) =>
  stat(path).then(
    (s) => s.mtimeMs,
    () => 0,
  );

async function optimizePhotos() {
  let count = 0;
  for (const file of await readdir(ORIGINALS)) {
    if (!SOURCES.has(extname(file).toLowerCase())) continue;
    const source = join(ORIGINALS, file);
    const name = parse(file).name;
    const { width, height } = await sharp(source).metadata();
    const limits = name.startsWith('menu-') ? MENU_MAX_WIDTH : MAX_WIDTH;
    const mainWidth = Math.min(width, width > height ? limits.landscape : limits.portrait);
    const widths = [...VARIANT_WIDTHS.filter((w) => w < mainWidth), mainWidth];

    const outputs = widths.map((w) => join(OUT, `${name}-${w}w.webp`));
    const sourceTime = await mtime(source);
    const outputTimes = await Promise.all(outputs.map(mtime));
    if (outputTimes.every((t) => t > sourceTime)) continue;

    for (const [i, w] of widths.entries()) {
      await sharp(source).resize({ width: w }).webp({ quality: QUALITY }).toFile(outputs[i]);
    }
    console.log(`✓ ${file} → ${widths.map((w) => `${w}w`).join(', ')}`);
    count++;
  }
  console.log(count ? `${count} photo(s) optimisée(s).` : 'Photos déjà à jour.');
}

/** Fichier .ico contenant des images PNG (format accepté par tous les navigateurs). */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function generateIcons() {
  const svg = join(ICONS, 'favicon.svg');
  const png = (size) =>
    sharp(svg, { density: 72 * (size / 64) * 2 })
      .resize(size, size)
      .png()
      .toBuffer();

  const ico = toIco([
    { size: 16, data: await png(16) },
    { size: 32, data: await png(32) },
    { size: 48, data: await png(48) },
  ]);
  await writeFile(join(PUBLIC, 'favicon.ico'), ico);
  await writeFile(join(PUBLIC, 'apple-touch-icon.png'), await png(180));
  await writeFile(join(ICONS, 'icon-192.png'), await png(192));
  await writeFile(join(ICONS, 'icon-512.png'), await png(512));
  console.log('✓ favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png');
}

/** Inventaire des photos (largeurs, dimensions) lu par React : src/js/data/images.json */
async function writeInventory() {
  const inventory = {};
  for (const file of (await readdir(OUT)).filter((f) => f.endsWith('.webp')).sort()) {
    const [, key, width] = file.match(/^(.+)-(\d+)w\.webp$/) ?? [];
    if (key) (inventory[key] ??= { widths: [] }).widths.push(Number(width));
  }
  for (const [key, info] of Object.entries(inventory)) {
    info.widths.sort((a, b) => a - b);
    const largest = info.widths[info.widths.length - 1];
    const { width, height } = await sharp(join(OUT, `${key}-${largest}w.webp`)).metadata();
    Object.assign(info, { width, height });
  }
  await writeFile(join(ROOT, 'src', 'js', 'data', 'images.json'), `${JSON.stringify(inventory, null, 2)}\n`);
  console.log(`✓ src/js/data/images.json (${Object.keys(inventory).length} photos)`);
}

await optimizePhotos();
await writeInventory();
await generateIcons();
