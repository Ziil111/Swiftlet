// Contact page
const site = require('../site');
const { page, pageHero, icon, field } = require('../ui');

module.exports = function contactPage() {
  const base = '';
  const hero = pageHero({
    eyebrow: 'ติดต่อเรา', title: 'พูดคุยกับทีม SWIFTLETHUB', image: 'island', imageAlt: 'เกาะหินปูนกลางทะเลอันดามันที่มีถ้ำนกแอ่น', size: 'sm',
    lead: 'มีคำถามเรื่องนกแอ่น รังนก ต้องการเสนอหัวข้อบทความ หรือสนใจร่วมงานกับเรา ส่งข้อความถึงเราได้เลย',
    crumbItems: [{ label: 'ติดต่อเรา' }]
  });

  const body = `
<section class="section section--tight">
  <div class="container contact">
    <div class="contact__form card" data-reveal>
      <h2 class="card__title">ส่งข้อความถึงเรา</h2>
      <p class="card__lead">กรอกข้อมูลด้านล่าง ทีมงานจะติดต่อกลับภายใน 1–2 วันทำการ</p>
      <form class="form" id="contact-form" data-form="contact" novalidate>
        <div class="form__grid">
          ${field({ label: 'ชื่อ - นามสกุล', name: 'name', required: true, placeholder: 'ชื่อของคุณ', autocomplete: 'name' })}
          ${field({ label: 'อีเมล', name: 'email', type: 'email', required: true, placeholder: 'name@example.com', autocomplete: 'email', half: true })}
          ${field({ label: 'เบอร์โทรศัพท์', name: 'phone', type: 'tel', placeholder: '08X-XXX-XXXX', autocomplete: 'tel', inputmode: 'tel', half: true })}
          ${field({ label: 'หัวข้อ', name: 'subject', required: true, options: ['สอบถามความรู้เรื่องนกแอ่น / รังนก', 'เสนอหัวข้อบทความ', 'แจ้งแก้ไขข้อมูลในบทความ', 'สอบถามบริการซื้อ - ฝากขาย', 'ความร่วมมือ / โฆษณา', 'อื่น ๆ'], placeholder: 'เลือกหัวข้อที่ต้องการติดต่อ' })}
          ${field({ label: 'ข้อความ', name: 'message', type: 'textarea', required: true, placeholder: 'พิมพ์ข้อความของคุณ', rows: 6 })}
        </div>
        <label class="check"><input type="checkbox" name="consent" required><span>ยินยอมให้ SWIFTLETHUB ใช้ข้อมูลนี้เพื่อติดต่อกลับตามนโยบายความเป็นส่วนตัว</span></label>
        <button class="btn btn--primary btn--lg btn--block-sm" type="submit">${icon('send')}<span>ส่งข้อความ</span></button>
        <div class="form-success" role="status" hidden>${icon('check-circle')}<div><strong>ส่งข้อความเรียบร้อยแล้ว</strong><p>ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับโดยเร็วที่สุด</p></div></div>
      </form>
    </div>
    <aside class="contact__info" data-reveal style="--d:100ms">
      <div class="info-card info-card--dark">
        <span class="info-card__mark" aria-hidden="true">${icon('swift')}</span>
        <h2>ข้อมูลการติดต่อ</h2>
        <ul class="info-list">
          <li>${icon('mail')}<div><small>อีเมล</small><a href="mailto:${site.contact.email}">${site.contact.email}</a></div></li>
          <li>${icon('phone')}<div><small>โทรศัพท์</small><a href="tel:${site.contact.phone.replace(/-/g, '')}">${site.contact.phone}</a></div></li>
          <li>${icon('line')}<div><small>LINE Official</small><span>${site.contact.line}</span></div></li>
          <li>${icon('pin')}<div><small>ที่อยู่</small><span>${site.contact.address}</span></div></li>
          <li>${icon('clock')}<div><small>เวลาทำการ</small><span>${site.contact.hours}</span></div></li>
        </ul>
        <p class="info-card__social-label">ติดตามเราบนโซเชียลมีเดีย</p>
        <div class="social social--footer">${site.social.map(s => `<a href="${s.href}" aria-label="${s.label}" target="_blank" rel="noopener">${icon(s.key)}</a>`).join('')}</div>
      </div>
      <div class="info-card">
        <h3>${icon('message')}คำถามที่พบบ่อย</h3>
        <details><summary>SWIFTLETHUB ขายรังนกหรือไม่?${icon('chevron-down')}</summary><p>SWIFTLETHUB เป็นแพลตฟอร์มความรู้ เราไม่ได้ผลิตหรือจำหน่ายรังนกเอง แต่มีพื้นที่ช่วยเชื่อมโยงผู้ซื้อและผู้ขาย</p></details>
        <details><summary>ส่งรังนกให้ตรวจสอบได้หรือไม่?${icon('chevron-down')}</summary><p>เราไม่มีบริการตรวจสอบในห้องปฏิบัติการ แต่สามารถแนะนำแนวทางการเลือกห้องปฏิบัติการที่ได้มาตรฐานได้</p></details>
        <details><summary>ขอแก้ไขข้อมูลในบทความได้อย่างไร?${icon('chevron-down')}</summary><p>เลือกหัวข้อ “แจ้งแก้ไขข้อมูลในบทความ” พร้อมแนบลิงก์และแหล่งอ้างอิง ทีมบรรณาธิการจะตรวจสอบโดยเร็ว</p></details>
      </div>
    </aside>
  </div>
</section>`;

  return page({
    key: 'contact', title: 'ติดต่อเรา', base, path: 'contact.html', image: 'island',
    description: 'ติดต่อทีม SWIFTLETHUB สอบถามความรู้เรื่องนกแอ่นและรังนก เสนอหัวข้อบทความ หรือสอบถามบริการซื้อ - ฝากขายรังนก',
    body: hero + body
  });
};
