// Homepage
const site = require('../site');
const { articles, get } = require('../content');
const products = require('../content/products');
const { btn, eyebrow, sectionHead, articleCard, productCard, productDialog, page, icon } = require('../ui');
const { img } = require('../lib');
const { barList, lineChart, donut } = require('../charts');

const knowledge = [
  { id: 'physical', icon: 'feather', img: 'portrait', title: 'ลักษณะทางกายภาพของนกแอ่น', text: 'ลำตัวเพรียว ปีกยาวโค้งรูปเคียว ขาเล็กและสั้นมากจนเกาะกิ่งไม้ไม่ถนัด จึงเลือกเกาะผนังแนวดิ่งแทน' },
  { id: 'lifecycle', icon: 'egg', img: 'chicks', title: 'วงจรชีวิตและพฤติกรรม', text: 'จับคู่ วางไข่ ฟัก และเลี้ยงลูกในรังเดิม ลูกนกใช้เวลาหลายสัปดาห์ก่อนแข็งแรงพอจะบินออกจากรัง' },
  { id: 'habitat', icon: 'mountain', img: 'island', title: 'แหล่งอาศัยของนกแอ่น', text: 'ถ้ำหินปูนบนเกาะและชายฝั่งทะเล รวมถึงบ้านนกที่ควบคุมความชื้น อุณหภูมิ และแสงให้ใกล้เคียงถ้ำธรรมชาติ' },
  { id: 'nesting', icon: 'repeat', img: 'building', title: 'พฤติกรรมการสร้างรัง', text: 'ถักรังจากน้ำลายทีละเส้นจนเป็นรูปถ้วย คู่นกช่วยกันสร้าง และพร้อมสร้างรังใหม่เมื่อรังเดิมถูกเก็บ' },
  { id: 'ecosystem', icon: 'leaf', img: 'feeding', title: 'ระบบนิเวศและสิ่งแวดล้อม', text: 'นักล่าแมลงกลางอากาศที่ช่วยควบคุมประชากรแมลง และเป็นตัวชี้วัดความสมบูรณ์ของสิ่งแวดล้อม' },
  { id: 'conservation', icon: 'heart', img: 'mangrove', title: 'การอนุรักษ์นกแอ่น', text: 'เก็บรังหลังลูกนกบินได้ ปกป้องถ้ำและแหล่งหากิน เพื่อให้ประชากรนกแอ่นคงอยู่อย่างยั่งยืน' }
];

const intro = [
  { q: 'นกแอ่นคืออะไร?', a: 'นกขนาดเล็กในวงศ์นกแอ่น (Apodidae) ลำตัวยาวราว 11–12 ซม. ปีกยาวโค้ง บินเร็วและคล่องแคล่ว แม้รูปร่างคล้าย “นกนางแอ่น” แต่เป็นนกคนละวงศ์กัน' },
  { q: 'ถิ่นอาศัยตามธรรมชาติ', a: 'ถ้ำหินปูนบนเกาะและชายฝั่งทะเลของเอเชียตะวันออกเฉียงใต้ ปัจจุบันยังทำรังในอาคาร “บ้านนก” ที่มนุษย์สร้างเลียนแบบสภาพถ้ำ' },
  { q: 'พฤติกรรมการหากิน', a: 'ล่าแมลงขนาดเล็กกลางอากาศ ออกจากที่พักตั้งแต่เช้าตรู่และบินกลับเมื่อพลบค่ำ ในถ้ำมืดใช้เสียงคลิกสะท้อนกลับช่วยนำทาง' },
  { q: 'พฤติกรรมการสร้างรัง', a: 'ในฤดูผสมพันธุ์ ต่อมน้ำลายของนกจะขยายใหญ่ขึ้น นกจะค่อย ๆ ถักน้ำลายเป็นเส้นใยรูปถ้วยติดผนังแนวดิ่ง ใช้เวลาหลายสัปดาห์' },
  { q: 'ความสัมพันธ์กับรังนก', a: 'รังที่สร้างจากน้ำลายเกือบล้วนของนกแอ่นกินรัง คือ “รังนก” ที่มนุษย์นำมาบริโภค การเก็บรังอย่างยั่งยืนจึงต้องเคารพวงจรชีวิตของนก' }
];

module.exports = function home() {
  const base = '';
  const featured = ['natural-vs-house-nest', 'industry-stats-trends', 'real-vs-fake'].map(get).filter(Boolean);
  const homeProducts = products.slice(0, 3);
  const latestCount = articles.length;

  const hero = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero__media">${img('hero-swiftlets', { alt: 'ฝูงนกแอ่นบินเหนือหน้าผาหินปูนริมทะเลยามเย็น', eager: true, sizes: '100vw' })}</div>
  <div class="hero__overlay" aria-hidden="true"></div>
  <div class="hero__frame" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
  <div class="container hero__inner">
    <div class="hero__content">
      <p class="hero__issue"><span>SWIFTLETHUB</span> นิตยสารความรู้ออนไลน์ · ฉบับพฤศจิกายน 2569</p>
      <h1 class="hero__title" id="hero-title"><span class="hero__line">เปิดโลกแห่งนกแอ่น</span><span class="hero__line hero__line--accent">เรียนรู้ทุกเรื่องราวของรังนก</span></h1>
      <p class="hero__lead">แหล่งรวมความรู้เกี่ยวกับนกแอ่น ตั้งแต่ธรรมชาติ พฤติกรรมการสร้างรัง ไปจนถึงความรู้เกี่ยวกับคุณภาพและอุตสาหกรรมรังนก</p>
      <div class="hero__actions">
        ${btn('สำรวจบทความ', 'articles.html', 'primary', { iconName: 'arrow', cls: 'btn--lg' })}
        ${btn('รู้จักนกแอ่น', '#about-swiftlet', 'ghost-light', { cls: 'btn--lg' })}
      </div>
    </div>
    <figure class="hero__caption" aria-hidden="true"><span class="hero__caption-line"></span><figcaption><em>Aerodramus fuciphagus</em><br>นกแอ่นกินรัง ณ หมู่เกาะทะเลอันดามัน</figcaption></figure>
  </div>
  <nav class="hero__topics" aria-label="หมวดความรู้">
    <div class="container hero__topics-inner">
      ${Object.entries(site.categories).map(([k, c], i) => `
      <a class="hero__topic" href="articles.html?cat=${k}">
        <span class="hero__topic-num">0${i + 1}</span>
        <span class="hero__topic-text"><strong>${c.short}</strong><small>${articles.filter(a => a.category === k).length} บทความ</small></span>
        ${icon('arrow-up-right')}
      </a>`).join('')}
    </div>
  </nav>
</section>`;

  const introSection = `
<section class="section intro" id="about-swiftlet" aria-labelledby="intro-title">
  <div class="container intro__grid">
    <div class="intro__visual" data-reveal>
      <figure class="intro__main">${img('portrait', { alt: 'ภาพระยะใกล้ของนกแอ่นเกาะผนังหิน', sizes: '(min-width: 1024px) 34vw, 90vw' })}</figure>
      <figure class="intro__float">${img('inflight', { alt: 'นกแอ่นกางปีกโค้งขณะบิน', sizes: '(min-width: 1024px) 18vw, 45vw' })}</figure>
      <div class="intro__stamp" aria-hidden="true">${icon('swift')}<span>Apodidae</span></div>
    </div>
    <div class="intro__text">
      ${sectionHead({ eyebrow: 'บทที่ 01 · ความรู้พื้นฐาน', title: 'รู้จักนกแอ่น', id: 'intro-title', lead: 'นกแอ่นกินรัง (<em>Aerodramus fuciphagus</em>) คือนักบินตัวจิ๋วที่ใช้ชีวิตเกือบทั้งวันอยู่บนท้องฟ้า และเป็นผู้สร้าง “รังนก” อันเลื่องชื่อด้วยน้ำลายของตัวเอง' })}
      <ol class="intro__list">
        ${intro.map((it, i) => `
        <li data-reveal style="--d:${i * 70}ms">
          <span class="intro__num">0${i + 1}</span>
          <div><h3>${it.q}</h3><p>${it.a}</p></div>
        </li>`).join('')}
      </ol>
      ${btn('อ่านคู่มือรู้จักนกแอ่นฉบับเต็ม', 'articles/what-is-swiftlet.html', 'outline', { iconName: 'arrow' })}
    </div>
  </div>
  <div class="container">
    <dl class="facts" data-reveal>
      <div><dt>ความยาวลำตัว</dt><dd>11–12 <small>ซม.</small></dd></div>
      <div><dt>ไข่ต่อรอบโดยทั่วไป</dt><dd>2 <small>ฟอง</small></dd></div>
      <div><dt>การนำทางในถ้ำมืด</dt><dd>เสียงสะท้อน</dd></div>
      <div><dt>ระยะเวลาสร้างรังหนึ่งรัง</dt><dd>หลาย <small>สัปดาห์</small></dd></div>
    </dl>
  </div>
</section>`;

  const interlude = `
<section class="interlude" aria-label="คำคมจากธรรมชาติ">
  <div class="interlude__media">${img('flock', { alt: 'ฝูงนกแอ่นบินวนเป็นเกลียวบนท้องฟ้ายามพระอาทิตย์ตก', sizes: '100vw' })}</div>
  <div class="interlude__overlay" aria-hidden="true"></div>
  <div class="container interlude__inner" data-reveal>
    ${icon('quote', 'interlude__q')}
    <blockquote>รังนกทุกรังเริ่มต้นจากนกแอ่นตัวเล็ก ๆ ที่บินหลายร้อยกิโลเมตรในแต่ละวัน<br class="br-lg"> การเข้าใจนกจึงเป็นก้าวแรกของการเข้าใจรังนก</blockquote>
    <p>— หลักคิดของกองบรรณาธิการ SWIFTLETHUB</p>
  </div>
</section>`;

  const [f1, ...fRest] = featured;
  const featuredSection = `
<section class="section section--paper" id="featured" aria-labelledby="featured-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'บทที่ 02 · บทความแนะนำ', title: 'คลังความรู้เกี่ยวกับรังนก', id: 'featured-title', lead: 'บทความเชิงลึกที่คัดสรรโดยกองบรรณาธิการ ครอบคลุมเรื่องเกรด คุณภาพ ความแท้ และข้อมูลอุตสาหกรรมรังนก', link: { href: 'articles.html', label: `ดูบทความทั้งหมด (${latestCount})` } })}
    <div class="featured">
      ${f1 ? articleCard(f1, 'feature', base) : ''}
      <div class="featured__side">${fRest.map(a => articleCard(a, 'row', base)).join('')}</div>
    </div>
    <div class="cat-strip" data-reveal>
      <span class="cat-strip__label">เลือกอ่านตามหมวด</span>
      ${Object.entries(site.categories).map(([k, c]) => `<a class="chip-link" href="articles.html?cat=${k}">${icon(c.icon)}${c.label}</a>`).join('')}
    </div>
  </div>
</section>`;

  const knowledgeSection = `
<section class="section" id="knowledge" aria-labelledby="knowledge-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'บทที่ 03 · ธรรมชาติวิทยา', title: 'เรื่องน่ารู้เกี่ยวกับนกแอ่น', id: 'knowledge-title', align: 'center', lead: 'หกหัวข้อสำคัญที่จะทำให้คุณเข้าใจชีวิตของนกแอ่น ตั้งแต่รูปร่าง พฤติกรรม ไปจนถึงบทบาทในระบบนิเวศ' })}
    <div class="k-grid">
      ${knowledge.map((k, i) => `
      <a class="k-card" href="articles/what-is-swiftlet.html#${k.id}" data-reveal style="--d:${(i % 3) * 80}ms">
        <div class="k-card__media">${img(k.img, { alt: '', sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' })}<span class="k-card__num">0${i + 1}</span></div>
        <div class="k-card__body">
          <span class="k-card__icon">${icon(k.icon)}</span>
          <h3 class="k-card__title">${k.title}</h3>
          <p>${k.text}</p>
          <span class="k-card__more">เรียนรู้เพิ่มเติม${icon('arrow')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>`;

  const statsSection = `
<section class="section section--dark stats" id="statistics" aria-labelledby="stats-title">
  <div class="stats__bg" aria-hidden="true"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'บทที่ 04 · ข้อมูลอุตสาหกรรม', title: 'สถิติและข้อมูลอุตสาหกรรมรังนก', id: 'stats-title', light: true, lead: 'ภาพรวมห่วงโซ่อุตสาหกรรมรังนกในรูปแบบอินโฟกราฟิก เพื่อให้เห็นโครงสร้างตลาด การผลิต และทิศทางการส่งออก', link: { href: 'articles/industry-stats-trends.html', label: 'อ่านบทวิเคราะห์ฉบับเต็ม' } })}
    <div class="sample-note" role="note" data-reveal>
      <span class="badge badge--sample">${icon('info')}ข้อมูลตัวอย่าง</span>
      <p>ตัวเลขทั้งหมดในส่วนนี้เป็น <strong>ข้อมูลตัวอย่าง (Sample Data)</strong> เพื่อแสดงรูปแบบการนำเสนอ ไม่ใช่สถิติจริง และไม่ควรนำไปอ้างอิง เราจะปรับปรุงเมื่อได้รับข้อมูลที่ตรวจสอบแล้วจากหน่วยงานที่เกี่ยวข้อง</p>
    </div>
    <div class="kpis">
      ${[
        { v: '2,800', u: 'ตัน', l: 'ปริมาณผลผลิตรังนกโลกต่อปี' },
        { v: '6.5', u: '%', l: 'อัตราการเติบโตเฉลี่ยต่อปีของตลาด' },
        { v: '85', u: '%', l: 'สัดส่วนผลผลิตจากรังนกบ้าน' },
        { v: '60', u: '%', l: 'สัดส่วนผลผลิตไทยที่ส่งออก' }
      ].map((k, i) => `
      <div class="kpi" data-reveal style="--d:${i * 80}ms">
        <span class="kpi__tag">ตัวอย่าง</span>
        <p class="kpi__value"><span data-count="${k.v.replace(/,/g, '')}">${k.v}</span><small>${k.u}</small></p>
        <p class="kpi__label">${k.l}</p>
      </div>`).join('')}
    </div>
    <div class="charts">
      <figure class="chart-card chart-card--bars" data-reveal>
        <figcaption><h3>สัดส่วนการผลิตตามประเทศ</h3><p>ข้อมูลตัวอย่าง · หน่วย: % ของผลผลิตโลก</p></figcaption>
        ${barList([{ label: 'อินโดนีเซีย', value: 68 }, { label: 'มาเลเซีย', value: 14 }, { label: 'เวียดนาม', value: 7 }, { label: 'ไทย', value: 6 }, { label: 'อื่น ๆ', value: 5 }])}
      </figure>
      <figure class="chart-card chart-card--line" data-reveal style="--d:80ms">
        <figcaption><h3>แนวโน้มปริมาณการส่งออก</h3><p>ข้อมูลตัวอย่าง · ดัชนี (ปี 2563 = 100)</p></figcaption>
        ${lineChart([{ label: '2563', value: 100 }, { label: '2564', value: 92 }, { label: '2565', value: 108 }, { label: '2566', value: 121 }, { label: '2567', value: 134 }, { label: '2568', value: 146 }])}
      </figure>
      <figure class="chart-card chart-card--donut" data-reveal style="--d:160ms">
        <figcaption><h3>แหล่งที่มาของผลผลิต</h3><p>ข้อมูลตัวอย่าง · รังนกบ้านเทียบรังนกถ้ำ</p></figcaption>
        ${donut([{ label: 'รังนกบ้าน', value: 85, color: '#D4AF37' }, { label: 'รังนกถ้ำ', value: 15, color: '#C8102E' }], { center: '85%', sub: 'รังนกบ้าน' })}
      </figure>
    </div>
    <div class="chain" data-reveal>
      <h3 class="chain__title">ห่วงโซ่อุตสาหกรรมรังนก</h3>
      <ol class="chain__steps">
        ${[['home', 'บ้านนก / ถ้ำ', 'แหล่งทำรังของนกแอ่น'], ['package', 'เก็บรัง', 'หลังลูกนกบินออกจากรัง'], ['sliders', 'คัดแยกและทำความสะอาด', 'คัดขนและสิ่งเจือปน'], ['layers', 'แปรรูป', 'รังนกแห้ง พร้อมดื่ม ตุ๋น'], ['globe', 'ตลาดและส่งออก', 'ในประเทศและต่างประเทศ']].map(([ic, t, d], i) => `
        <li><span class="chain__icon">${icon(ic)}</span><strong>${t}</strong><small>${d}</small>${i < 4 ? `<span class="chain__arrow" aria-hidden="true">${icon('chevron-right')}</span>` : ''}</li>`).join('')}
      </ol>
    </div>
    <ul class="facts-real" data-reveal>
      <li>${icon('check-circle')}<span><strong>ข้อเท็จจริงเชิงภาพรวม:</strong> อินโดนีเซียเป็นที่รู้จักในฐานะผู้ผลิตรังนกรายใหญ่ที่สุดของโลก</span></li>
      <li>${icon('check-circle')}<span><strong>ข้อเท็จจริงเชิงภาพรวม:</strong> จีน (รวมฮ่องกง) เป็นตลาดผู้บริโภครังนกหลัก</span></li>
      <li>${icon('check-circle')}<span><strong>ข้อเท็จจริงเชิงภาพรวม:</strong> รังนกบ้านเป็นแหล่งผลผลิตหลักของอุตสาหกรรมในปัจจุบัน</span></li>
    </ul>
  </div>
</section>`;

  const productsSection = `
<section class="section section--compact" id="products" aria-labelledby="products-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'คัดสรรเพื่อการเรียนรู้', title: 'ผลิตภัณฑ์รังนกที่น่าสนใจ', id: 'products-title', link: { href: 'products.html', label: 'ดูผลิตภัณฑ์แนะนำทั้งหมด' } })}
    <div class="p-grid p-grid--compact">${homeProducts.map(p => productCard(p, base, 'compact')).join('')}</div>
  </div>
  ${homeProducts.map(p => productDialog(p, base)).join('')}
</section>`;

  const cta = `
<section class="cta" aria-labelledby="cta-title">
  <div class="cta__media">${img('cta-cave', { alt: 'ฝูงนกแอ่นบินกลับเข้าถ้ำทะเลยามพลบค่ำ', sizes: '100vw' })}</div>
  <div class="cta__overlay" aria-hidden="true"></div>
  <div class="container cta__inner" data-reveal>
    ${eyebrow('บริการเชื่อมโยงผู้ซื้อและผู้ขาย', true)}
    <h2 class="cta__title" id="cta-title">สนใจซื้อหรือฝากขายรังนก?</h2>
    <p class="cta__lead">พื้นที่สำหรับผู้ที่สนใจซื้อและฝากขายรังนก พร้อมเชื่อมโยงผู้ซื้อและผู้ขาย</p>
    <div class="cta__actions">
      ${btn('ซื้อรังนก', 'trade.html#buy', 'primary', { iconName: 'search', iconLeft: true, cls: 'btn--lg' })}
      ${btn('ฝากขายรังนก', 'trade.html#consign', 'ghost-light', { iconName: 'upload', iconLeft: true, cls: 'btn--lg' })}
    </div>
  </div>
</section>`;

  return page({
    key: 'home', title: site.tagline, base, path: '', headerMode: 'overlay', preload: 'hero-swiftlets', bodyClass: 'page-home',
    body: hero + introSection + featuredSection + interlude + knowledgeSection + statsSection + productsSection + cta,
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'th', potentialAction: { '@type': 'SearchAction', target: `${site.url}/articles.html?q={search_term_string}`, 'query-input': 'required name=search_term_string' } }]
  });
};
