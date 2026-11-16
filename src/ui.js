// Reusable UI components + page layout (header, footer, head).
const site = require('./site');
const { icon, sprite, requireIcons } = require('./icons');
const { esc, attr, thDate, img, imgUrl } = require('./lib');

/* ---------- Primitives ---------- */
const btn = (label, href, variant = 'primary', opts = {}) => {
  const { iconName, iconLeft, cls = '', attrs = '' } = opts;
  const i = iconName ? icon(iconName) : '';
  return `<a class="btn btn--${variant}${cls ? ' ' + cls : ''}" href="${href}"${attrs}>${iconLeft ? i : ''}<span>${label}</span>${iconLeft ? '' : i}</a>`;
};

const logo = (base = '', light = false) => `
<a class="brand${light ? ' brand--light' : ''}" href="${base}index.html" aria-label="SWIFTLETHUB — กลับหน้าแรก">
  <span class="brand__mark"><img class="brand__logo" src="${base}assets/img/logo.png" width="44" height="44" alt="SWIFTLETHUB Logo"></span>
  <span class="brand__word"><span class="brand__name">SWIFTLETHUB</span><span class="brand__sub">คลังความรู้นกแอ่น</span></span>
</a>`;

const eyebrow = (text, light = false) => `<p class="eyebrow${light ? ' eyebrow--light' : ''}"><span class="eyebrow__line" aria-hidden="true"></span>${text}</p>`;

const sectionHead = ({ eyebrow: eb, title, lead, align = 'left', light = false, link, id }) => `
<header class="section-head section-head--${align}${light ? ' section-head--light' : ''}" data-reveal>
  <div class="section-head__text">
    ${eb ? eyebrow(eb, light) : ''}
    <h2 class="section-title"${id ? ` id="${id}"` : ''}>${title}</h2>
    ${lead ? `<p class="section-lead">${lead}</p>` : ''}
  </div>
  ${link ? `<a class="link-arrow${light ? ' link-arrow--light' : ''}" href="${link.href}">${link.label}${icon('arrow')}</a>` : ''}
</header>`;

const crumbs = (items, base = '', light = true) => `
<nav class="crumbs${light ? ' crumbs--light' : ''}" aria-label="เส้นทางนำทาง">
  <ol>
    <li><a href="${base}index.html">หน้าแรก</a></li>
    ${items.map((c, i) => i === items.length - 1 ? `<li><span aria-current="page">${c.label}</span></li>` : `<li><a href="${c.href}">${c.label}</a></li>`).join('')}
  </ol>
</nav>`;

const pageHero = ({ title, lead, image, imageAlt = '', eyebrow: eb, crumbItems = [], base = '', extra = '', size = 'md', position = 'center' }) => `
<section class="page-hero page-hero--${size}">
  <div class="page-hero__media" style="--pos:${position}">${img(image, { alt: imageAlt, eager: true, base, sizes: '100vw' })}</div>
  <div class="page-hero__overlay" aria-hidden="true"></div>
  <div class="container page-hero__inner">
    ${crumbItems.length ? crumbs(crumbItems, base) : ''}
    ${eb ? eyebrow(eb, true) : ''}
    <h1 class="page-hero__title">${title}</h1>
    ${lead ? `<p class="page-hero__lead">${lead}</p>` : ''}
    ${extra}
  </div>
</section>`;

const catLabel = (key) => site.categories[key]?.label || key;
const catShort = (key) => site.categories[key]?.short || key;

/* ---------- Article card ----------
   variants: 'card' (vertical), 'feature' (large overlay), 'row' (horizontal), 'mini' (sidebar)  */
function articleCard(a, variant = 'card', base = '', opts = {}) {
  const href = `${base}articles/${a.slug}.html`;
  const meta = `<span class="meta">${icon('clock')}อ่าน ${a.readMin} นาที</span>`;
  const cat = `<a class="badge badge--cat" href="${base}articles.html?cat=${a.category}">${catShort(a.category)}</a>`;
  const data = opts.data ? ` data-article data-cat="${a.category}" data-date="${a.date}" data-pop="${a.popularity}" data-search="${attr((a.title + ' ' + a.excerpt + ' ' + (a.topic || '') + ' ' + (a.tags || []).join(' ') + ' ' + catLabel(a.category)).toLowerCase())}"` : '';
  const headingTag = opts.h || 'h3';
  if (variant === 'mini') {
    return `
<article class="mini-card">
  <a class="mini-card__media" href="${href}" tabindex="-1" aria-hidden="true">${img(a.cover, { alt: '', base, sizes: '96px' })}</a>
  <div>
    <${headingTag} class="mini-card__title"><a href="${href}">${a.title}</a></${headingTag}>
    <p class="mini-card__meta">${thDate(a.date)} · ${a.readMin} นาที</p>
  </div>
</article>`;
  }
  const sizes = variant === 'feature' ? '(min-width: 1024px) 60vw, 100vw' : variant === 'row' ? '(min-width: 1024px) 22vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw';
  return `
<article class="a-card a-card--${variant}"${data}${opts.reveal === false ? '' : ' data-reveal'}>
  <a class="a-card__media" href="${href}" tabindex="-1" aria-hidden="true">${img(a.cover, { alt: a.coverAlt || '', base, sizes })}</a>
  <div class="a-card__body">
    <div class="a-card__top">${cat}${a.topic ? `<span class="a-card__topic">${a.topic}</span>` : ''}</div>
    <${headingTag} class="a-card__title"><a href="${href}">${a.title}</a></${headingTag}>
    <p class="a-card__excerpt">${a.excerpt}</p>
    <div class="a-card__foot">
      <div class="a-card__meta">${meta}<span class="meta">${icon('calendar')}${thDate(a.date)}</span></div>
      <a class="a-card__more" href="${href}" aria-label="อ่านต่อ: ${attr(a.title)}">อ่านต่อ${icon('arrow')}</a>
    </div>
  </div>
</article>`;
}

/* ---------- Product card ---------- */
function productCard(p, base = '', variant = 'card') {
  return `
<article class="p-card p-card--${variant}" data-cat="${p.category || 'all'}" data-reveal>
  <div class="p-card__media">${img(p.image, { alt: p.imageAlt, base, sizes: variant === 'compact' ? '(min-width: 1024px) 18vw, 40vw' : '(min-width: 1024px) 30vw, 100vw' })}
    ${p.badge ? `<span class="p-card__badge">${p.badge}</span>` : ''}
  </div>
  <div class="p-card__body">
    <p class="p-card__type">${p.categoryName ? `<span class="p-card__cat">${p.categoryName}</span>` : ''}${p.type}</p>
    <h3 class="p-card__title">${p.name}</h3>
    <p class="p-card__desc">${p.short}</p>
    <ul class="chips" aria-label="คุณลักษณะ">${p.traits.map(t => `<li>${t}</li>`).join('')}</ul>
    <button class="btn btn--outline btn--sm p-card__btn" type="button" data-dialog="product-${p.id}">ดูรายละเอียด${icon('arrow')}</button>
  </div>
</article>`;
}

function productDialog(p, base = '') {
  return `
<dialog class="modal" id="product-${p.id}" aria-labelledby="product-${p.id}-title">
  <div class="modal__panel modal__panel--wide">
    <button class="modal__close" type="button" data-close aria-label="ปิด">${icon('x')}</button>
    <div class="pd">
      <div class="pd__media">${img(p.image, { alt: p.imageAlt, base, sizes: '(min-width: 900px) 420px, 100vw' })}</div>
      <div class="pd__body">
        <p class="p-card__type">${p.categoryName ? `<span class="p-card__cat">${p.categoryName}</span>` : ''}${p.type}</p>
        <h2 class="pd__title" id="product-${p.id}-title">${p.name}</h2>
        <p class="pd__desc">${p.description}</p>
        <dl class="spec">
          ${p.specs.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
        </dl>
        <h3 class="pd__sub">${icon('shield')}ข้อมูลคุณภาพ</h3>
        <ul class="checklist">${p.quality.map(q => `<li>${icon('check')}${q}</li>`).join('')}</ul>
        <p class="pd__note">${icon('info')}ข้อมูลผลิตภัณฑ์เป็นตัวอย่างเพื่อการเรียนรู้ ควรตรวจสอบฉลาก เลขทะเบียน อย. และแหล่งที่มาทุกครั้งก่อนเลือกซื้อ</p>
        <div class="pd__actions">
          ${btn('อ่านวิธีเลือกซื้อรังนก', `${base}articles/buying-tips.html`, 'primary', { iconName: 'book', iconLeft: true })}
          ${btn('สอบถามข้อมูล', `${base}contact.html`, 'ghost')}
        </div>
      </div>
    </div>
  </div>
</dialog>`;
}

/* ---------- Form fields ---------- */
function field({ label, name, type = 'text', required = false, placeholder = '', autocomplete = '', options, rows, hint, half, min, step, inputmode, accept, multiple, value }) {
  const id = `f-${name}`;
  const req = required ? ' required' : '';
  const star = required ? '<span class="req" aria-hidden="true">*</span>' : '<span class="opt">(ไม่บังคับ)</span>';
  const common = `id="${id}" name="${name}"${req}${hint ? ` aria-describedby="${id}-hint"` : ''}`;
  let control;
  if (options) {
    control = `<div class="select"><select ${common}><option value="" disabled selected>${placeholder || 'กรุณาเลือก'}</option>${options.map(o => `<option>${o}</option>`).join('')}</select>${icon('chevron-down')}</div>`;
  } else if (type === 'textarea') {
    control = `<textarea ${common} rows="${rows || 5}" placeholder="${placeholder}"></textarea>`;
  } else if (type === 'password') {
    control = `<div class="pw"><input ${common} type="password" placeholder="${placeholder}" autocomplete="${autocomplete || 'current-password'}" minlength="8"><button class="pw__toggle" type="button" data-toggle-pw aria-label="แสดงรหัสผ่าน">${icon('eye')}</button></div>`;
  } else {
    control = `<input ${common} type="${type}"${placeholder ? ` placeholder="${placeholder}"` : ''}${autocomplete ? ` autocomplete="${autocomplete}"` : ''}${min !== undefined ? ` min="${min}"` : ''}${step ? ` step="${step}"` : ''}${inputmode ? ` inputmode="${inputmode}"` : ''}${accept ? ` accept="${accept}"` : ''}${multiple ? ' multiple' : ''}${value ? ` value="${value}"` : ''}>`;
  }
  return `
<div class="field${half ? ' field--half' : ''}">
  <label class="field__label" for="${id}">${label} ${star}</label>
  ${control}
  ${hint ? `<p class="field__hint" id="${id}-hint">${hint}</p>` : ''}
  <p class="field__error" role="alert"></p>
</div>`;
}

/* ---------- Header / footer ---------- */
function header(active, base, mode) {
  const navItems = site.nav.map(n => `<li><a class="nav__link" href="${base}${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('');
  return `
<a class="skip-link" href="#main">ข้ามไปยังเนื้อหาหลัก</a>
<header class="site-header" id="site-header" data-mode="${mode}">
  <div class="container header__inner">
    ${logo(base)}
    <nav class="nav" aria-label="เมนูหลัก"><ul class="nav__list">${navItems}</ul></nav>
    <div class="header__actions">
      <a class="btn btn--primary btn--sm header__cta" href="${base}${site.cta.href}"${active === 'trade' ? ' aria-current="page"' : ''}>${site.cta.label}</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="เปิดเมนู">
        <span class="nav__toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
  <div class="mobile-menu__panel">
    <nav aria-label="เมนูมือถือ">
      <ul class="mobile-menu__list">
        ${site.nav.map((n, i) => `<li><a href="${base}${n.href}"${n.key === active ? ' aria-current="page"' : ''}><span class="mobile-menu__num">0${i + 1}</span>${n.label}${icon('arrow')}</a></li>`).join('')}
      </ul>
    </nav>
    ${btn(site.cta.label, base + site.cta.href, 'primary', { cls: 'btn--block' })}
    <div class="mobile-menu__foot">
      <p>${site.tagline}</p>
      <div class="social">${site.social.slice(0, 4).map(s => `<a href="${s.href}" aria-label="${s.label}" target="_blank" rel="noopener">${icon(s.key)}</a>`).join('')}</div>
    </div>
  </div>
</div>`;
}

function footer(base) {
  const cats = Object.entries(site.categories).map(([k, c]) => `<li><a href="${base}articles.html?cat=${k}">${c.label}</a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="footer__deco" aria-hidden="true">${icon('swift')}</div>
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        ${logo(base, true)}
        <p class="footer__desc">แพลตฟอร์มความรู้เรื่องนกแอ่นและรังนก ตั้งแต่ธรรมชาติของนกแอ่น พฤติกรรมการสร้างรัง ไปจนถึงคุณภาพ ความแท้ และข้อมูลอุตสาหกรรม นำเสนออย่างถูกต้อง โปร่งใส และเข้าใจง่าย</p>
        <div class="social social--footer">${site.social.map(s => `<a href="${s.href}" aria-label="${s.label}" target="_blank" rel="noopener">${icon(s.key)}</a>`).join('')}</div>
      </div>
      <div>
        <h2 class="footer__title">เมนู</h2>
        <ul class="footer__links">
          ${site.nav.map(n => `<li><a href="${base}${n.href}">${n.label}</a></li>`).join('')}
          <li><a href="${base}${site.cta.href}">${site.cta.label}</a></li>
        </ul>
      </div>
      <div>
        <h2 class="footer__title">หมวดบทความ</h2>
        <ul class="footer__links">${cats}</ul>
      </div>
      <div>
        <h2 class="footer__title">ติดต่อเรา</h2>
        <ul class="footer__contact">
          <li>${icon('mail')}<a href="mailto:${site.contact.email}">${site.contact.email}</a></li>
          <li>${icon('phone')}<a href="tel:${site.contact.phone.replace(/-/g, '')}">${site.contact.phone}</a></li>
          <li>${icon('line')}<span>LINE: ${site.contact.line}</span></li>
          <li>${icon('pin')}<span>${site.contact.address}</span></li>
          <li>${icon('clock')}<span>${site.contact.hours}</span></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© ${site.year} SWIFTLETHUB สงวนลิขสิทธิ์ทุกประการ</p>
      <p>เนื้อหาบนเว็บไซต์มีวัตถุประสงค์เพื่อการศึกษา ข้อมูลสถิติที่ระบุว่า “ข้อมูลตัวอย่าง” ไม่ใช่สถิติจริง</p>
    </div>
  </div>
</footer>
<button class="to-top" type="button" aria-label="กลับขึ้นด้านบน">${icon('chevron-up')}</button>
<div class="toast" role="status" aria-live="polite">${icon('check-circle')}<span></span></div>`;
}

/* ---------- Full page ---------- */
function page({ key, title, description = site.description, base = '', body, headerMode = 'overlay', image = 'hero-swiftlets', jsonld = [], path: pagePath = '', bodyClass = '', ogType = 'website', preload }) {
  requireIcons(['eye', 'eye-off', 'check-circle', 'x', 'link', 'check']);
  const head = header(key, base, headerMode);
  const foot = footer(base);
  const icons = sprite(); // collects icons used by header/body/footer — must run after rendering them
  const fullTitle = key === 'home' ? `${site.name} — ${site.tagline}` : `${strip(title)} | ${site.name}`;
  const canonical = `${site.url}/${pagePath}`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url,
    logo: `${site.url}/assets/img/logo.png`, email: site.contact.email, sameAs: site.social.map(s => s.href)
  }, ...jsonld];
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0F2C59">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:type" content="${ogType}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/${imgUrl(image)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap">
${preload ? `<link rel="preload" as="image" href="${base}assets/img/${preload}.jpg" imagesrcset="${base}assets/img/${preload}-sm.jpg 800w, ${base}assets/img/${preload}.jpg 1600w" imagesizes="100vw">` : ''}
<link rel="stylesheet" href="${base}assets/css/styles.css">
<script type="application/ld+json">${JSON.stringify(ld.length === 1 ? ld[0] : ld)}</script>
</head>
<body class="${bodyClass}">
${icons}
${head}
<main id="main">
${body}
</main>
${foot}
<script src="${base}assets/js/main.js" defer></script>
</body>
</html>
`;
}

function strip(s) { return String(s).replace(/<[^>]+>/g, ''); }

module.exports = { btn, logo, eyebrow, sectionHead, crumbs, pageHero, articleCard, productCard, productDialog, field, page, catLabel, catShort, icon };
