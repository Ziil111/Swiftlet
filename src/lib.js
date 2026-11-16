// Shared helpers: escaping, Thai dates, responsive images.
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '..', 'assets', 'img');

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const strip = (s = '') => String(s).replace(/<[^>]+>/g, '');
const attr = (s) => esc(strip(s));

const TH_MONTHS = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const TH_MONTHS_LONG = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
function thDate(iso, long = false) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${(long ? TH_MONTHS_LONG : TH_MONTHS)[m - 1]} ${y + 543}`;
}

/* ---------- JPEG dimensions (read SOF marker) ---------- */
const dimCache = new Map();
function jpegSize(file) {
  if (dimCache.has(file)) return dimCache.get(file);
  let out = null;
  try {
    const b = fs.readFileSync(file);
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xFF) { i++; continue; }
      const marker = b[i + 1];
      const len = b.readUInt16BE(i + 2);
      if ((marker >= 0xC0 && marker <= 0xCF) && ![0xC4, 0xC8, 0xCC].includes(marker)) {
        out = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
        break;
      }
      i += 2 + len;
    }
  } catch (e) { /* missing file */ }
  dimCache.set(file, out);
  return out;
}

/**
 * Responsive <img>. Looks for assets/img/<key>.jpg and optional <key>-sm.jpg (800w).
 * opts: alt, sizes, cls, eager (LCP), base (relative prefix), priority
 */
function img(key, opts = {}) {
  const { alt = '', sizes = '100vw', cls = '', eager = false, base = '' } = opts;
  const large = path.join(IMG_DIR, `${key}.jpg`);
  const small = path.join(IMG_DIR, `${key}-sm.jpg`);
  const dl = jpegSize(large);
  if (!dl) console.warn(`  ! missing image: ${key}.jpg`);
  const ds = jpegSize(small);
  const w = dl ? dl.w : 1600, h = dl ? dl.h : 900;
  const src = `${base}assets/img/${key}.jpg`;
  const srcset = ds ? ` srcset="${base}assets/img/${key}-sm.jpg ${ds.w}w, ${src} ${w}w" sizes="${sizes}"` : '';
  const loading = eager ? ' fetchpriority="high"' : ' loading="lazy"';
  return `<img${cls ? ` class="${cls}"` : ''} src="${src}"${srcset} width="${w}" height="${h}" alt="${attr(alt)}" decoding="async"${loading}>`;
}

const imgUrl = (key, base = '') => `${base}assets/img/${key}.jpg`;

module.exports = { esc, strip, attr, thDate, img, imgUrl, jpegSize };
