// Product recommendations page (secondary, educational)
const products = require('../content/products');
const { sectionHead, productCard, productDialog, page, pageHero, icon, btn } = require('../ui');
const { img } = require('../lib');

module.exports = function productsPage() {
  const base = '';
  const hero = pageHero({
    eyebrow: 'ผลิตภัณฑ์แนะนำ', title: 'ผลิตภัณฑ์รังนกที่น่าสนใจ', image: 'resting', imageAlt: 'นกแอ่นสองตัวเกาะพักอยู่บนรังน้ำลายสีขาว',
    lead: 'ตัวอย่างผลิตภัณฑ์ที่คัดสรรเพื่อช่วยให้คุณเข้าใจความแตกต่างของประเภท รูปทรง และคุณภาพรังนก ก่อนตัดสินใจเลือกซื้ออย่างมีข้อมูล',
    crumbItems: [{ label: 'ผลิตภัณฑ์แนะนำ' }]
  });

  const guide = `
<section class="section section--tight" aria-labelledby="guide-title">
  <div class="container">
    <div class="note-band" data-reveal>
      <span class="note-band__icon">${icon('book')}</span>
      <div>
        <h2 id="guide-title">เราไม่ใช่ร้านค้า แต่เป็นคลังความรู้</h2>
        <p>ผลิตภัณฑ์ในหน้านี้เป็นตัวอย่างเพื่อการเรียนรู้ ใช้ประกอบการอธิบายเรื่องรูปทรง สี เกรด และการอ่านฉลาก SWIFTLETHUB ไม่ได้รับค่าตอบแทนจากการแนะนำ และแนะนำให้ตรวจสอบข้อมูลผู้ผลิตทุกครั้งก่อนซื้อ</p>
      </div>
      ${btn('อ่านข้อควรระวังในการเลือกซื้อ', 'articles/buying-tips.html', 'outline', { iconName: 'arrow', cls: 'btn--sm' })}
    </div>
  </div>
</section>`;

  const list = `
<section class="section section--paper" aria-labelledby="list-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'คัดสรรโดยกองบรรณาธิการ', title: 'ผลิตภัณฑ์แนะนำ', id: 'list-title', lead: 'เลือกดูตามหมวดหมู่เพื่อศึกษาคุณลักษณะและข้อมูลคุณภาพที่ควรสังเกต กด “ดูรายละเอียด” เพื่ออ่านข้อมูลเชิงลึก' })}
    <div class="filter-row filter-row--products" role="group" aria-label="กรองหมวดหมู่ผลิตภัณฑ์">
      <button class="chip-btn" type="button" data-product-filter="all" aria-pressed="true">ทั้งหมด (${products.length})</button>
      <button class="chip-btn" type="button" data-product-filter="supplement" aria-pressed="false">อาหารเสริมบำรุงสุขภาพ (${products.filter(p => p.category === 'supplement').length})</button>
      <button class="chip-btn" type="button" data-product-filter="natural" aria-pressed="false">รังนกธรรมชาติพร้อมปรุง (${products.filter(p => p.category === 'natural').length})</button>
      <button class="chip-btn" type="button" data-product-filter="gift" aria-pressed="false">ชุดของขวัญและพรีเมียม (${products.filter(p => p.category === 'gift').length})</button>
    </div>
    <div class="p-grid">${products.map(p => productCard(p, base)).join('')}</div>
  </div>
  ${products.map(p => productDialog(p, base)).join('')}
</section>`;

  const quality = `
<section class="section" aria-labelledby="quality-title">
  <div class="container split">
    <div class="split__media" data-reveal>
      <figure class="frame">${img('nest-grades', { alt: 'รังนกสี่รูปแบบ: รังเต็ม รังแตก รังเส้น และรังนกสีทอง', sizes: '(min-width: 1024px) 45vw, 100vw' })}<figcaption>รังนกรูปแบบต่าง ๆ: รังเต็ม รังแตก รังเส้น และรังนกสีทอง</figcaption></figure>
    </div>
    <div class="split__text">
      ${sectionHead({ eyebrow: 'ข้อมูลคุณภาพ', title: 'อ่านข้อมูลผลิตภัณฑ์อย่างไรให้เข้าใจ', id: 'quality-title' })}
      <dl class="q-list">
        ${[
      ['ruler', 'รูปทรง', 'รังเต็ม รังแตก และรังเส้น ต่างกันที่ “รูปทรง” เป็นหลัก ซึ่งมีผลต่อราคามากกว่าคุณค่าทางโภชนาการ'],
      ['sun', 'สี', 'สีขาว เหลืองทอง หรือส้ม เกิดจากสภาพแวดล้อมของแหล่งทำรัง ควรระวังรังนกที่ขาวผิดธรรมชาติหรือถูกแต่งสี'],
      ['droplet', 'ความสะอาด', 'รังนกดิบยังมีขนและสิ่งเจือปน รังนกพร้อมปรุงผ่านการแช่และคัดขนแล้ว ควรดูวิธีทำความสะอาดที่ไม่ใช้สารฟอกขาว'],
      ['shield', 'การรับรอง', 'มองหาเลขสารบบอาหาร (อย.) ข้อมูลผู้ผลิต และการตรวจสอบย้อนกลับถึงแหล่งที่มา']
    ].map(([ic, t, d]) => `<div data-reveal><dt>${icon(ic)}${t}</dt><dd>${d}</dd></div>`).join('')}
      </dl>
      ${btn('อ่านเรื่องประเภทและเกรดของรังนก', 'articles/nest-types-grades.html', 'primary', { iconName: 'arrow' })}
    </div>
  </div>
</section>`;

  return page({
    key: 'products', title: 'ผลิตภัณฑ์แนะนำ', base, path: 'products.html', image: 'resting',
    description: 'ผลิตภัณฑ์รังนกแนะนำเพื่อการเรียนรู้ พร้อมคุณลักษณะ ข้อมูลคุณภาพ และวิธีอ่านฉลากรังนกก่อนเลือกซื้อ',
    body: hero + guide + list + quality
  });
};
