// Article detail page
const site = require('../site');
const { articles } = require('../content');
const { articleCard, page, crumbs, icon, btn, catLabel } = require('../ui');
const { img, thDate, attr, esc, strip } = require('../lib');

const tones = { info: 'info', tip: 'sparkle', warning: 'flame', sample: 'chart' };

function renderBlock(b, base, ctx) {
  switch (b.type) {
    case 'p': return `<p>${b.text}</p>`;
    case 'h2': ctx.n++; return `<h2 id="${b.id}"><span class="prose__num" aria-hidden="true">${String(ctx.n).padStart(2, '0')}</span>${b.text}</h2>`;
    case 'h3': return `<h3>${b.text}</h3>`;
    case 'ul': return `<ul>${b.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    case 'ol': return `<ol>${b.items.map(i => `<li>${i}</li>`).join('')}</ol>`;
    case 'table': return `
<figure class="table-wrap">
  ${b.caption ? `<figcaption class="table-wrap__cap">${icon('grid')}${b.caption}</figcaption>` : ''}
  <div class="table-scroll" tabindex="0" role="region" aria-label="${attr(b.caption || 'ตาราง')}">
    <table>
      <thead><tr>${b.head.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>
      <tbody>${b.rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>
  ${b.note ? `<p class="table-wrap__note">${icon('info')}${b.note}</p>` : ''}
</figure>`;
    case 'figure': return `
<figure class="prose__figure">
  ${img(b.img, { alt: b.alt || '', base, sizes: '(min-width: 1024px) 760px, 100vw' })}
  ${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}
</figure>`;
    case 'callout': return `
<aside class="callout callout--${b.tone || 'info'}">
  <span class="callout__icon">${icon(tones[b.tone] || 'info')}</span>
  <div>${b.tone === 'sample' ? '<span class="badge badge--sample">ข้อมูลตัวอย่าง</span>' : ''}${b.title ? `<p class="callout__title">${b.title}</p>` : ''}<p>${b.text}</p></div>
</aside>`;
    case 'stats': return `
<div class="stat-row">
  <div class="stat-row__grid">${b.items.map(s => `<div><strong>${s.value}</strong><span>${s.label}</span></div>`).join('')}</div>
  ${b.note ? `<p class="stat-row__note">${icon('info')}${b.note}</p>` : ''}
</div>`;
    case 'quote': return `<blockquote class="pull">${icon('quote')}<p>${b.text}</p>${b.cite ? `<cite>— ${b.cite}</cite>` : ''}</blockquote>`;
    default: console.warn(`  ! unknown block type ${b.type}`); return '';
  }
}

module.exports = function articlePage(a) {
  const base = '../';
  const author = site.authors[a.author] || site.authors.editorial;
  const url = `${site.url}/articles/${a.slug}.html`;
  const related = articles.filter(x => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  if (related.length < 3) related.push(...articles.filter(x => x.slug !== a.slug && !related.includes(x)).sort((x, y) => y.popularity - x.popularity).slice(0, 3 - related.length));
  const idx = articles.indexOf(a);
  const prev = articles[idx + 1], next = articles[idx - 1];
  const ctx = { n: 0 };
  const body = a.body.map(b => renderBlock(b, base, ctx)).join('\n');
  const enc = encodeURIComponent;

  const share = (cls = '') => `
<div class="share ${cls}">
  <span class="share__label">แชร์บทความ</span>
  <a class="share__btn" href="https://www.facebook.com/sharer/sharer.php?u=${enc(url)}" target="_blank" rel="noopener" aria-label="แชร์ไปยัง Facebook">${icon('facebook')}</a>
  <a class="share__btn" href="https://social-plugins.line.me/lineit/share?url=${enc(url)}" target="_blank" rel="noopener" aria-label="แชร์ไปยัง LINE">${icon('line')}</a>
  <a class="share__btn" href="https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(a.title)}" target="_blank" rel="noopener" aria-label="แชร์ไปยัง X">${icon('x-brand')}</a>
  <button class="share__btn" type="button" data-copy-link aria-label="คัดลอกลิงก์">${icon('link')}</button>
</div>`;

  const hero = `
<header class="a-hero">
  <div class="a-hero__media">${img(a.cover, { alt: a.coverAlt || '', base, eager: true, sizes: '100vw' })}</div>
  <div class="a-hero__overlay" aria-hidden="true"></div>
  <div class="container a-hero__inner">
    ${crumbs([{ label: 'บทความ', href: '../articles.html' }, { label: catLabel(a.category), href: `../articles.html?cat=${a.category}` }, { label: a.title }], base)}
    <a class="badge badge--cat badge--light" href="../articles.html?cat=${a.category}">${catLabel(a.category)}</a>
    <h1 class="a-hero__title">${a.title}</h1>
    <p class="a-hero__meta">
      <span>${icon('user')}${author.name}</span>
      <span>${icon('calendar')}<time datetime="${a.date}">${thDate(a.date, true)}</time></span>
      <span>${icon('clock')}อ่าน ${a.readMin} นาที</span>
    </p>
  </div>
</header>`;

  const main = `
<div class="reading-progress" aria-hidden="true"><span></span></div>
<article class="article" itemscope itemtype="https://schema.org/Article">
  ${hero}
  <div class="container article__layout">
    <aside class="toc" aria-label="สารบัญ">
      <div class="toc__inner">
        <p class="toc__title">${icon('list')}สารบัญ</p>
        <ol class="toc__list">${a.toc.map((t, i) => `<li><a href="#${t.id}" data-toc><span>${String(i + 1).padStart(2, '0')}</span>${t.text}</a></li>`).join('')}</ol>
        ${share('share--toc')}
      </div>
    </aside>
    <div class="article__main">
      <details class="toc-mobile">
        <summary>${icon('list')}สารบัญบทความ<span>${a.toc.length} หัวข้อ</span>${icon('chevron-down')}</summary>
        <ol>${a.toc.map(t => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')}</ol>
      </details>
      <div class="prose">
        <p class="prose__lead">${a.lead}</p>
        ${body}
      </div>
      ${a.sources && a.sources.length ? `
      <section class="sources" aria-labelledby="sources-title">
        <h2 id="sources-title">${icon('book')}แหล่งข้อมูลและการอ้างอิง</h2>
        <ul>${a.sources.map(s => `<li>${s}</li>`).join('')}</ul>
      </section>` : ''}
      <p class="disclaimer">${icon('info')}บทความนี้มีวัตถุประสงค์เพื่อให้ความรู้ทั่วไป ข้อมูลที่ระบุว่าเป็น “ข้อมูลตัวอย่าง” ใช้เพื่ออธิบายแนวคิดเท่านั้น ไม่ใช่สถิติจริง หากต้องการข้อมูลเพื่อการตัดสินใจทางธุรกิจหรือสุขภาพ ควรปรึกษาผู้เชี่ยวชาญหรือหน่วยงานที่เกี่ยวข้อง</p>
      ${a.tags && a.tags.length ? `<div class="article__tags">${a.tags.map(t => `<a class="tag" href="../articles.html?q=${enc(t)}">#${t}</a>`).join('')}</div>` : ''}
      ${share('share--end')}
      <div class="author-box">
        <span class="author-box__avatar">${icon('swift')}</span>
        <div><p class="author-box__label">เขียนและเรียบเรียงโดย</p><p class="author-box__name">${author.name}</p><p class="author-box__role">${author.role}</p><p class="author-box__bio">${author.bio}</p></div>
      </div>
      <nav class="post-nav" aria-label="บทความก่อนหน้าและถัดไป">
        ${prev ? `<a class="post-nav__link" href="${prev.slug}.html"><span>${icon('arrow-left')}บทความก่อนหน้า</span><strong>${prev.title}</strong></a>` : '<span></span>'}
        ${next ? `<a class="post-nav__link post-nav__link--next" href="${next.slug}.html"><span>บทความถัดไป${icon('arrow')}</span><strong>${next.title}</strong></a>` : '<span></span>'}
      </nav>
    </div>
  </div>
</article>
<section class="section section--paper" aria-labelledby="related-title">
  <div class="container">
    <header class="section-head section-head--left">
      <div class="section-head__text"><p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span>อ่านต่อ</p><h2 class="section-title" id="related-title">บทความที่เกี่ยวข้อง</h2></div>
      <a class="link-arrow" href="../articles.html">ดูบทความทั้งหมด${icon('arrow')}</a>
    </header>
    <div class="a-grid a-grid--3">${related.map(r => articleCard(r, 'card', base)).join('')}</div>
  </div>
</section>`;

  return page({
    key: 'articles', title: a.title, description: a.excerpt, base, path: `articles/${a.slug}.html`, image: a.cover, ogType: 'article',
    headerMode: 'overlay', body: main, bodyClass: 'page-article',
    jsonld: [
      {
        '@context': 'https://schema.org', '@type': 'Article', headline: strip(a.title), description: strip(a.excerpt), inLanguage: 'th',
        image: `${site.url}/assets/img/${a.cover}.jpg`, datePublished: a.date, dateModified: a.date,
        author: { '@type': 'Organization', name: author.name }, publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/assets/img/favicon.svg` } },
        mainEntityOfPage: url, articleSection: catLabel(a.category), keywords: (a.tags || []).join(', ')
      },
      {
        '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: `${site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'บทความ', item: `${site.url}/articles.html` },
          { '@type': 'ListItem', position: 3, name: strip(a.title), item: url }
        ]
      }
    ]
  });
};
