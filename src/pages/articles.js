// Articles library page
const site = require('../site');
const { articles } = require('../content');
const { sectionHead, articleCard, page, pageHero, icon, btn, catShort } = require('../ui');
const { img, thDate, attr } = require('../lib');

module.exports = function articlesPage() {
  const base = '';
  const spotlight = articles[0];
  const popular = [...articles].sort((a, b) => b.popularity - a.popularity).slice(0, 5);
  const latest = articles.slice(0, 4);
  const tagCount = {};
  articles.forEach(a => (a.tags || []).forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; }));
  const tags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 14).map(([t]) => t);
  const count = (k) => articles.filter(a => a.category === k).length;
  const topicLink = (topic) => {
    const a = articles.find(x => x.topic === topic);
    return a ? `<a href="articles/${a.slug}.html">${topic}</a>` : `<span>${topic}</span>`;
  };

  const search = `
<form class="search" role="search" action="articles.html" data-search-form>
  <label class="sr-only" for="article-search">ค้นหาบทความ</label>
  ${icon('search')}
  <input id="article-search" type="search" name="q" placeholder="ค้นหาบทความ เช่น รังนกบ้าน, เกรด, รังนกปลอม" autocomplete="off" data-search-input>
  <button class="btn btn--primary btn--sm" type="submit">ค้นหา</button>
</form>
<p class="search__hint">คำค้นยอดนิยม: ${['รังนกบ้าน', 'รังนกปลอม', 'เกรดรังนก', 'การส่งออก'].map(t => `<button type="button" class="link-tag" data-tag="${t}">${t}</button>`).join('')}</p>`;

  const hero = pageHero({
    eyebrow: 'คลังความรู้ SWIFTLETHUB', title: 'บทความและความรู้เรื่องนกแอ่น', image: 'cave-nests', imageAlt: 'ภายในถ้ำหินปูนที่มีรังนกแอ่นเรียงรายและนกแอ่นบินอยู่',
    lead: `รวม ${articles.length} บทความเชิงลึกจากกองบรรณาธิการ ตั้งแต่ชีววิทยาของนกแอ่น เกรดและคุณภาพรังนก สถิติอุตสาหกรรม ไปจนถึงวิธีแยกแยะรังนกแท้`,
    crumbItems: [{ label: 'บทความ' }], extra: search, size: 'lg'
  });

  const spot = `
<section class="section section--tight" aria-labelledby="spotlight-title">
  <div class="container">
    <article class="spotlight" data-reveal>
      <a class="spotlight__media" href="articles/${spotlight.slug}.html" tabindex="-1" aria-hidden="true">${img(spotlight.cover, { alt: spotlight.coverAlt || '', sizes: '(min-width: 1024px) 58vw, 100vw' })}</a>
      <div class="spotlight__body">
        <p class="spotlight__label">${icon('star')}บทความเด่นประจำสัปดาห์</p>
        <a class="badge badge--cat" href="articles.html?cat=${spotlight.category}">${site.categories[spotlight.category].label}</a>
        <h2 class="spotlight__title" id="spotlight-title"><a href="articles/${spotlight.slug}.html">${spotlight.title}</a></h2>
        <p class="spotlight__excerpt">${spotlight.excerpt}</p>
        <p class="spotlight__meta"><span>${icon('user')}${site.authors[spotlight.author]?.name || ''}</span><span>${icon('calendar')}${thDate(spotlight.date)}</span><span>${icon('clock')}อ่าน ${spotlight.readMin} นาที</span></p>
        ${btn('อ่านบทความ', `articles/${spotlight.slug}.html`, 'primary', { iconName: 'arrow' })}
      </div>
    </article>
  </div>
</section>`;

  const cats = `
<section class="section section--paper section--tight" aria-labelledby="cats-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'หมวดหมู่ความรู้', title: 'เลือกเรียนรู้ตามหัวข้อที่สนใจ', id: 'cats-title' })}
    <div class="cat-grid">
      ${Object.entries(site.categories).map(([k, c], i) => `
      <article class="cat-card" data-reveal style="--d:${i * 70}ms">
        <div class="cat-card__head"><span class="cat-card__icon">${icon(c.icon)}</span><span class="cat-card__count">${count(k)} บทความ</span></div>
        <h3 class="cat-card__title">${c.label}</h3>
        <p class="cat-card__desc">${c.desc}</p>
        <ul class="cat-card__topics">${c.topics.map(t => `<li>${icon('chevron-right')}${topicLink(t)}</li>`).join('')}</ul>
        <button class="cat-card__btn" type="button" data-filter-jump="${k}">ดูบทความในหมวดนี้${icon('arrow')}</button>
      </article>`).join('')}
    </div>
  </div>
</section>`;

  const tabs = [['all', 'ทั้งหมด', articles.length], ...Object.entries(site.categories).map(([k, c]) => [k, c.short, count(k)])];
  const library = `
<section class="section" id="library" aria-labelledby="library-title">
  <div class="container library">
    <div class="library__main">
      <div class="library__head">
        <div>
          <p class="eyebrow"><span class="eyebrow__line" aria-hidden="true"></span>บทความทั้งหมด</p>
          <h2 class="section-title" id="library-title">ห้องสมุดบทความ</h2>
        </div>
        <div class="library__sort">
          <label for="sort">เรียงตาม</label>
          <div class="select select--sm"><select id="sort" data-sort><option value="latest">ล่าสุด</option><option value="popular">ยอดนิยม</option><option value="short">อ่านสั้นที่สุด</option></select>${icon('chevron-down')}</div>
        </div>
      </div>
      <div class="tabs" role="tablist" aria-label="กรองตามหมวดหมู่">
        ${tabs.map(([k, l, n], i) => `<button class="tab" type="button" role="tab" aria-selected="${i === 0}" data-filter="${k}">${l}<span>${n}</span></button>`).join('')}
      </div>
      <p class="library__status" aria-live="polite" data-status>แสดง ${articles.length} บทความ</p>
      <div class="a-grid" data-grid>
        ${articles.map(a => articleCard(a, 'card', base, { data: true, reveal: false })).join('')}
      </div>
      <div class="empty" data-empty hidden>
        ${icon('search')}
        <h3>ไม่พบบทความที่ตรงกับการค้นหา</h3>
        <p>ลองใช้คำค้นอื่น หรือเลือกดูบทความทุกหมวดหมู่</p>
        <button class="btn btn--outline btn--sm" type="button" data-reset>ล้างการค้นหา</button>
      </div>
      <nav class="pagination" aria-label="เลขหน้า" data-pagination></nav>
    </div>
    <aside class="library__aside" aria-label="แถบข้าง">
      <section class="aside-box">
        <h2 class="aside-box__title">${icon('flame')}บทความยอดนิยม</h2>
        <ol class="popular">
          ${popular.map((a, i) => `<li><span class="popular__num">${String(i + 1).padStart(2, '0')}</span><div><a href="articles/${a.slug}.html">${a.title}</a><small>${catShort(a.category)} · อ่าน ${a.readMin} นาที</small></div></li>`).join('')}
        </ol>
      </section>
      <section class="aside-box">
        <h2 class="aside-box__title">${icon('clock')}บทความล่าสุด</h2>
        <div class="mini-list">${latest.map(a => articleCard(a, 'mini', base)).join('')}</div>
      </section>
      <section class="aside-box">
        <h2 class="aside-box__title">${icon('tag')}แท็กยอดนิยม</h2>
        <div class="tag-cloud">${tags.map(t => `<button type="button" class="tag" data-tag="${attr(t)}">#${t}</button>`).join('')}</div>
      </section>
      <section class="aside-box aside-box--dark">
        <span class="aside-box__mark" aria-hidden="true">${icon('swift')}</span>
        <h2 class="aside-box__title">มีคำถามเรื่องนกแอ่นหรือรังนก?</h2>
        <p>ส่งคำถามถึงกองบรรณาธิการ เราอาจนำไปเขียนเป็นบทความถัดไป</p>
        ${btn('ส่งคำถามถึงเรา', 'contact.html', 'primary', { cls: 'btn--sm', iconName: 'send' })}
      </section>
    </aside>
  </div>
</section>`;

  return page({
    key: 'articles', title: 'บทความ', base, path: 'articles.html', image: 'cave-nests',
    description: 'คลังบทความความรู้เรื่องนกแอ่นและรังนก: เกรดรังนกธรรมชาติและรังนกเลี้ยง สถิติอุตสาหกรรมรังนก และวิธีสังเกตรังนกแท้และรังนกปลอม',
    body: hero + spot + cats + library,
    jsonld: [{
      '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'บทความ SWIFTLETHUB', url: `${site.url}/articles.html`,
      mainEntity: { '@type': 'ItemList', itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.url}/articles/${a.slug}.html`, name: a.title })) }
    }]
  });
};
