// Buy / Consign bird's nest page
const { page, pageHero, icon, field, btn, sectionHead } = require('../ui');
const { img } = require('../lib');

const listings = [
  { id: 'L-1024', img: 'nest-pile', title: 'รังนกบ้านเต็มรัง ทำความสะอาดแล้ว', type: 'รังนกบ้าน', grade: 'เกรด AA', origin: 'นครศรีธรรมราช', qty: '2 กก.', shape: 'รังเต็มรูปถ้วย', seller: 'ผู้ขายยืนยันตัวตนแล้ว', updated: '2 วันที่แล้ว' },
  { id: 'L-1019', img: 'nest-tray', title: 'รังนกขาวคัดขนาด ชุดละ 100 กรัม', type: 'รังนกบ้าน', grade: 'เกรด AAA', origin: 'สุราษฎร์ธานี', qty: '1.5 กก.', shape: 'รังเต็มรูปถ้วย', seller: 'ผู้ขายยืนยันตัวตนแล้ว', updated: '3 วันที่แล้ว' },
  { id: 'L-1013', img: 'nest-grades', title: 'รังนกแตกและรังนกเส้นคละ', type: 'รังนกบ้าน', grade: 'เกรด A', origin: 'ชุมพร', qty: '5 กก.', shape: 'รังแตก / เส้น', seller: 'ผู้ขายยืนยันตัวตนแล้ว', updated: '5 วันที่แล้ว' },
  { id: 'L-1008', img: 'product-3', title: 'รังนกสีทองธรรมชาติ พร้อมผลตรวจไนไตรท์', type: 'รังนกบ้าน', grade: 'เกรดพิเศษ', origin: 'พัทลุง', qty: '500 กรัม', shape: 'รังเต็มรูปถ้วย', seller: 'รอตรวจสอบเอกสาร', updated: '1 สัปดาห์ที่แล้ว' },
  { id: 'L-1002', img: 'cave-light', title: 'รังนกถ้ำ จากผู้รับสัมปทานที่ได้รับอนุญาต', type: 'รังนกถ้ำ', grade: 'เกรด AAA', origin: 'จังหวัดชายฝั่งอันดามัน', qty: '1 กก.', shape: 'รังเต็ม (ดิบ)', seller: 'ผู้ขายยืนยันตัวตนแล้ว', updated: '1 สัปดาห์ที่แล้ว' },
  { id: 'L-0997', img: 'product-4', title: 'รังนกเส้นทำความสะอาดแล้ว สำหรับร้านอาหาร', type: 'รังนกบ้าน', grade: 'เกรด A', origin: 'ตรัง', qty: '10 กก.', shape: 'รังเส้น', seller: 'ผู้ขายยืนยันตัวตนแล้ว', updated: '2 สัปดาห์ที่แล้ว' }
];

module.exports = function tradePage() {
  const base = '';
  const hero = pageHero({
    eyebrow: 'พื้นที่เชื่อมโยงผู้ซื้อและผู้ขาย', title: 'ซื้อ - ฝากขายรังนก', image: 'swiftlet-house', imageAlt: 'บ้านนกแอ่นในเมืองภาคใต้ยามพลบค่ำ มีฝูงนกบินวนรอบอาคาร',
    lead: 'ค้นหารังนกจากผู้ขายที่ยืนยันตัวตน หรือฝากขายรังนกของคุณ พร้อมข้อมูลเกรดและแหล่งที่มาที่โปร่งใส',
    crumbItems: [{ label: 'ซื้อ - ฝากขายรังนก' }],
    extra: `<div class="hero-tabs" role="tablist" aria-label="เลือกบริการ">
      <a class="hero-tab" href="#buy" role="tab" data-tab="buy" aria-selected="true">${icon('search')}<span><strong>ซื้อรังนก</strong><small>เลือกดูรายการและติดต่อผู้ขาย</small></span></a>
      <a class="hero-tab" href="#consign" role="tab" data-tab="consign" aria-selected="false">${icon('upload')}<span><strong>ฝากขายรังนก</strong><small>ส่งข้อมูลรังนกเพื่อลงประกาศ</small></span></a>
    </div>`
  });

  const trust = `
<section class="section section--tight" aria-label="หลักการของบริการ">
  <div class="container">
    <ul class="trust">
      <li data-reveal>${icon('shield')}<div><strong>ยืนยันตัวตนผู้ขาย</strong><span>ตรวจสอบเอกสารก่อนเผยแพร่ประกาศ</span></div></li>
      <li data-reveal style="--d:80ms">${icon('file-text')}<div><strong>ข้อมูลเกรดโปร่งใส</strong><span>ระบุรูปทรง เกรด และแหล่งที่มาชัดเจน</span></div></li>
      <li data-reveal style="--d:160ms">${icon('handshake')}<div><strong>ติดต่อกันโดยตรง</strong><span>SWIFTLETHUB ไม่เก็บค่าธรรมเนียมจากผู้ซื้อ</span></div></li>
      <li data-reveal style="--d:240ms">${icon('book')}<div><strong>ความรู้ก่อนซื้อ</strong><span>อ่านวิธีสังเกตรังนกแท้ก่อนตัดสินใจ</span></div></li>
    </ul>
  </div>
</section>`;

  const buy = `
<section class="section section--paper trade-panel" id="buy" data-panel="buy" aria-labelledby="buy-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'บริการที่ 01', title: 'ซื้อรังนก', id: 'buy-title', lead: 'รายการรังนกจากผู้ขายในเครือข่าย กด “ติดต่อผู้ขาย” เพื่อสอบถามราคา ตัวอย่างสินค้า และเอกสารประกอบ' })}
    <div class="sample-note sample-note--light" role="note">
      <span class="badge badge--sample">${icon('info')}ตัวอย่างรายการ</span>
      <p>ประกาศในหน้านี้เป็นตัวอย่างเพื่อแสดงรูปแบบการใช้งาน ราคาจะแจ้งโดยผู้ขายเมื่อมีการติดต่อ และควรขอดูสินค้าหรือผลตรวจคุณภาพก่อนซื้อทุกครั้ง</p>
    </div>
    <div class="filter-row" role="group" aria-label="กรองประเภทรังนก">
      ${['ทั้งหมด', 'รังนกบ้าน', 'รังนกถ้ำ'].map((f, i) => `<button class="chip-btn" type="button" data-listing-filter="${i ? f : 'all'}" aria-pressed="${i === 0}">${f}</button>`).join('')}
    </div>
    <div class="l-grid">
      ${listings.map(l => `
      <article class="listing" data-type="${l.type}" data-reveal>
        <div class="listing__media">${img(l.img, { alt: l.title, sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' })}<span class="listing__type">${l.type}</span></div>
        <div class="listing__body">
          <p class="listing__id">รหัสประกาศ ${l.id} · อัปเดต ${l.updated}</p>
          <h3 class="listing__title">${l.title}</h3>
          <dl class="listing__spec">
            <div><dt>เกรด</dt><dd>${l.grade}</dd></div>
            <div><dt>รูปทรง</dt><dd>${l.shape}</dd></div>
            <div><dt>แหล่งที่มา</dt><dd>${l.origin}</dd></div>
            <div><dt>ปริมาณ</dt><dd>${l.qty}</dd></div>
          </dl>
          <p class="listing__seller${l.seller.includes('รอ') ? ' is-pending' : ''}">${icon(l.seller.includes('รอ') ? 'clock' : 'check-circle')}${l.seller}</p>
          <button class="btn btn--primary btn--sm btn--block" type="button" data-dialog="contact-seller" data-listing="${l.id} · ${l.title}">${icon('message')}<span>ติดต่อผู้ขาย</span></button>
        </div>
      </article>`).join('')}
    </div>
    <p class="trade-tip">${icon('shield')}ก่อนซื้อ แนะนำให้อ่าน <a href="articles/real-vs-fake.html">วิธีสังเกตรังนกแท้และรังนกปลอม</a> และ <a href="articles/buying-tips.html">ข้อควรระวังในการเลือกซื้อ</a></p>
  </div>
  <dialog class="modal" id="contact-seller" aria-labelledby="cs-title">
    <div class="modal__panel modal__panel--form">
      <button class="modal__close" type="button" data-close aria-label="ปิด">${icon('x')}</button>
      <div class="modal__header">
        <h2 class="modal__title" id="cs-title">ติดต่อผู้ขาย</h2>
        <div class="modal__listing-tag">
          ${icon('package')}
          <span data-listing-label>รายการรังนก</span>
        </div>
      </div>
      <form class="form" data-form="seller" novalidate>
        <div class="form__grid">
          ${field({ label: 'ชื่อ - นามสกุล', name: 'cs-name', required: true, autocomplete: 'name', placeholder: 'กรอกชื่อ - นามสกุลของคุณ' })}
          ${field({ label: 'เบอร์โทรศัพท์', name: 'cs-phone', type: 'tel', required: true, autocomplete: 'tel', inputmode: 'tel', half: true, placeholder: '08X-XXX-XXXX' })}
          ${field({ label: 'อีเมล', name: 'cs-email', type: 'email', autocomplete: 'email', half: true, placeholder: 'name@example.com' })}
          ${field({ label: 'ข้อความถึงผู้ขาย', name: 'cs-message', type: 'textarea', required: true, rows: 4, placeholder: 'เช่น ปริมาณที่ต้องการ ขอดูผลตรวจคุณภาพ หรือนัดดูสินค้า' })}
        </div>
        <div class="modal__actions">
          <button class="btn btn--primary btn--lg btn--block" type="submit">${icon('send')}<span>ส่งข้อความถึงผู้ขาย</span></button>
          <p class="modal__note">${icon('lock')}ข้อมูลการติดต่อของคุณจะถูกส่งต่อไปยังผู้ขายโดยตรงอย่างปลอดภัย</p>
        </div>
      </form>
    </div>
  </dialog>
</section>`;

  const consign = `
<section class="section trade-panel" id="consign" data-panel="consign" aria-labelledby="consign-title">
  <div class="container consign">
    <div class="consign__intro">
      ${sectionHead({ eyebrow: 'บริการที่ 02', title: 'ฝากขายรังนก', id: 'consign-title', lead: 'ส่งข้อมูลรังนกของคุณ ทีมงานจะตรวจสอบรายละเอียดและติดต่อกลับเพื่อเผยแพร่ประกาศให้ผู้ซื้อในเครือข่าย' })}
      <ol class="steps">
        ${[['file-text', 'ส่งข้อมูลและรูปภาพ', 'กรอกแบบฟอร์มพร้อมแนบรูปรังนก'], ['microscope', 'ตรวจสอบข้อมูล', 'ทีมงานตรวจสอบรายละเอียดและเอกสาร'], ['scales', 'ยืนยันราคาและเกรด', 'สรุปข้อมูลเกรดและราคาที่คาดหวังร่วมกัน'], ['handshake', 'เผยแพร่และจับคู่', 'ประกาศถึงผู้ซื้อและเชื่อมต่อให้โดยตรง']].map(([ic, t, d], i) => `
        <li data-reveal style="--d:${i * 80}ms"><span class="steps__icon">${icon(ic)}</span><div><small>ขั้นตอนที่ ${i + 1}</small><strong>${t}</strong><p>${d}</p></div></li>`).join('')}
      </ol>
      <figure class="consign__figure">${img('house-interior', { alt: 'รังนกแอ่นเรียงรายบนแผ่นไม้ในบ้านนก', sizes: '(min-width: 1024px) 36vw, 100vw' })}</figure>
    </div>
    <div class="card consign__form" data-reveal>
      <h3 class="card__title">แบบฟอร์มฝากขายรังนก</h3>
      <p class="card__lead">ช่องที่มีเครื่องหมาย <span class="req">*</span> จำเป็นต้องกรอก</p>
      <form class="form" id="consign-form" data-form="consign" novalidate>
        <fieldset>
          <legend>${icon('user')}ข้อมูลผู้ฝากขาย</legend>
          <div class="form__grid">
            ${field({ label: 'ชื่อ - นามสกุล', name: 'c-name', required: true, autocomplete: 'name' })}
            ${field({ label: 'เบอร์โทรศัพท์', name: 'c-phone', type: 'tel', required: true, autocomplete: 'tel', inputmode: 'tel', half: true })}
            ${field({ label: 'อีเมล', name: 'c-email', type: 'email', autocomplete: 'email', half: true })}
            ${field({ label: 'LINE ID', name: 'c-line', half: true })}
            ${field({ label: 'จังหวัด', name: 'c-province', half: true, placeholder: 'เช่น นครศรีธรรมราช' })}
          </div>
        </fieldset>
        <fieldset>
          <legend>${icon('package')}ข้อมูลรังนก</legend>
          <div class="form__grid">
            ${field({ label: 'ประเภทรังนก', name: 'c-type', required: true, half: true, options: ['รังนกบ้าน', 'รังนกถ้ำ', 'รังนกแปรรูป / พร้อมทาน', 'อื่น ๆ'] })}
            ${field({ label: 'เกรดรังนก', name: 'c-grade', required: true, half: true, options: ['เกรดพิเศษ / AAA', 'เกรด AA', 'เกรด A', 'รังแตก / รังเส้น', 'รังนกดิบ (ยังไม่คัดเกรด)', 'ไม่แน่ใจ ต้องการให้ช่วยประเมิน'] })}
            ${field({ label: 'ปริมาณ (กิโลกรัม)', name: 'c-qty', type: 'number', required: true, half: true, min: 0, step: '0.1', inputmode: 'decimal', placeholder: 'เช่น 1.5' })}
            ${field({ label: 'ราคาที่คาดหวัง (บาท/กิโลกรัม)', name: 'c-price', type: 'number', half: true, min: 0, step: '100', inputmode: 'numeric', placeholder: 'เช่น 30000' })}
          </div>
          <div class="field">
            <div class="upload__header">
              <span class="field__label" id="c-images-label">รูปภาพรังนก <span class="opt">(สูงสุด 6 รูป)</span></span>
              <button class="upload__clear-all" type="button" data-clear-upload hidden>ลบรูปทั้งหมด</button>
            </div>
            <label class="upload" for="f-c-images">
              ${icon('image')}
              <strong>คลิกเพื่อเลือกรูปภาพ หรือลากไฟล์มาวางที่นี่</strong>
              <small>รองรับ JPG, PNG ขนาดไม่เกิน 5 MB ต่อรูป · แนะนำถ่ายด้านบน ด้านข้าง และระยะใกล้</small>
              <input id="f-c-images" name="c-images" type="file" accept="image/*" multiple aria-labelledby="c-images-label" data-upload>
            </label>
            <ul class="upload__preview" data-preview aria-live="polite"></ul>
            <p class="field__error" role="alert"></p>
          </div>
          ${field({ label: 'ข้อมูลเพิ่มเติม', name: 'c-note', type: 'textarea', rows: 4, placeholder: 'เช่น แหล่งที่มา วันที่เก็บรัง วิธีทำความสะอาด เอกสารหรือผลตรวจที่มี' })}
        </fieldset>
        <label class="check"><input type="checkbox" name="c-consent" required><span>ยืนยันว่าข้อมูลเป็นความจริง และยินยอมให้ทีมงานติดต่อกลับเพื่อตรวจสอบข้อมูล</span></label>
        <button class="btn btn--primary btn--lg btn--block" type="submit">${icon('send')}<span>ส่งข้อมูลฝากขาย</span></button>
        <div class="form-success" role="status" hidden>${icon('check-circle')}<div><strong>ได้รับข้อมูลฝากขายแล้ว</strong><p>ทีมงานจะตรวจสอบและติดต่อกลับภายใน 2–3 วันทำการ</p></div></div>
      </form>
    </div>
  </div>
</section>`;

  return page({
    key: 'trade', title: 'ซื้อ - ฝากขายรังนก', base, path: 'trade.html', image: 'swiftlet-house',
    description: 'พื้นที่ซื้อและฝากขายรังนก เชื่อมโยงผู้ซื้อและผู้ขาย พร้อมข้อมูลเกรด แหล่งที่มา และแบบฟอร์มฝากขายรังนก',
    body: hero + trust + buy + consign
  });
};
