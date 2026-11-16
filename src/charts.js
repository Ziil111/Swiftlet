// Infographic charts rendered at build time (SVG / CSS). All values passed in are labelled as sample data by callers.
const { esc } = require('./lib');

// Horizontal bar list: [{label, value}] — value in %
function barList(items, { unit = '%', max } = {}) {
  const m = max || Math.max(...items.map(i => i.value));
  return `<ul class="bars">${items.map((it, i) => `
    <li class="bars__row" style="--v:${(it.value / m * 100).toFixed(1)}%;--d:${i * 90}ms">
      <span class="bars__label">${esc(it.label)}</span>
      <span class="bars__track"><span class="bars__fill"></span></span>
      <span class="bars__value">${it.value}${unit}</span>
    </li>`).join('')}</ul>`;
}

// Line + area chart. points: [{label, value}]
function lineChart(points, { w = 560, h = 240, pad = 34, unit = '' } = {}) {
  const vals = points.map(p => p.value);
  const min = Math.floor(Math.min(...vals) * 0.85 / 10) * 10;
  const max = Math.ceil(Math.max(...vals) * 1.05 / 10) * 10;
  const x = (i) => pad + i * ((w - pad * 2) / (points.length - 1));
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(points.length - 1).toFixed(1)} ${h - pad} L${x(0).toFixed(1)} ${h - pad} Z`;
  const grid = [0, 1, 2, 3].map(k => {
    const v = min + (max - min) * k / 3;
    return `<line x1="${pad}" x2="${w - pad}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/><text x="${pad - 8}" y="${(y(v) + 4).toFixed(1)}" text-anchor="end">${Math.round(v)}</text>`;
  }).join('');
  return `
<svg class="line-chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="กราฟเส้น: ${points.map(p => `${p.label} ${p.value}${unit}`).join(', ')}">
  <defs><linearGradient id="lc-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#D4AF37" stop-opacity=".35"/><stop offset="1" stop-color="#D4AF37" stop-opacity="0"/></linearGradient></defs>
  <g class="line-chart__grid">${grid}</g>
  <path class="line-chart__area" d="${area}" fill="url(#lc-fill)"/>
  <path class="line-chart__line" d="${line}" pathLength="1"/>
  ${points.map((p, i) => `<g class="line-chart__pt" style="--d:${400 + i * 120}ms"><circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5"/><text x="${x(i).toFixed(1)}" y="${(y(p.value) - 12).toFixed(1)}" text-anchor="middle">${p.value}</text></g>`).join('')}
  <g class="line-chart__x">${points.map((p, i) => `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle">${esc(p.label)}</text>`).join('')}</g>
</svg>`;
}

// Donut: segments [{label, value, color}] summing to 100
function donut(segments, { center = '', sub = '' } = {}) {
  const r = 52, c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = segments.map((s, i) => {
    const len = c * s.value / 100;
    const el = `<circle class="donut__seg" r="${r}" cx="70" cy="70" stroke="${s.color}" stroke-dasharray="${len.toFixed(2)} ${(c - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" style="--d:${i * 200}ms"/>`;
    offset += len;
    return el;
  }).join('');
  return `
<div class="donut">
  <svg viewBox="0 0 140 140" role="img" aria-label="${segments.map(s => `${s.label} ${s.value}%`).join(', ')}">
    <circle r="${r}" cx="70" cy="70" class="donut__track"/>
    <g transform="rotate(-90 70 70)">${arcs}</g>
  </svg>
  <div class="donut__center"><strong>${center}</strong><span>${sub}</span></div>
</div>
<ul class="legend">${segments.map(s => `<li><span style="background:${s.color}"></span>${esc(s.label)} <strong>${s.value}%</strong></li>`).join('')}</ul>`;
}

module.exports = { barList, lineChart, donut };
