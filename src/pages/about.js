// About Us page
const site = require('../site');
const { articles } = require('../content');
const { sectionHead, page, icon, btn, eyebrow, crumbs } = require('../ui');
const { img } = require('../lib');

module.exports = function aboutPage() {
  const base = '';
  const hero = `
<section class="about-hero">
  <div class="about-hero__media">${img('karst-dawn', { alt: 'นกแอ่นตัวเดียวร่อนเหนือขุนเขาหินปูนท่ามกลางสายหมอกยามเช้า', eager: true, sizes: '100vw' })}</div>
  <div class="about-hero__overlay" aria-hidden="true"></div>
  <div class="container about-hero__inner">
    ${crumbs([{ label: 'เกี่ยวกับเรา' }], base)}
    ${eyebrow('เกี่ยวกับ SWIFTLETHUB', true)}
    <h1 class="about-hero__title">เราเชื่อว่าความเข้าใจ<br>เริ่มต้นจาก<span>นกแอ่น</span></h1>
    <p class="about-hero__lead">SWIFTLETHUB คือแพลตฟอร์มความรู้ที่ถ่ายทอดเรื่องราวของนกแอ่นและรังนก อย่างถูกต้อง โปร่งใส และเคารพธรรมชาติ</p>
  </div>
</section>`;

  const intro = `
<section class="section" aria-labelledby="story-title">
  <div class="container editorial">
    <div class="editorial__aside" data-reveal>
      <p class="editorial__kicker">บทนำ</p>
      <p class="editorial__big">${articles.length}<small>บทความเชิงลึก</small></p>
      <p class="editorial__big">4<small>หมวดความรู้</small></p>
    </div>
    <div class="editorial__body" data-reveal>
      <h2 class="section-title" id="story-title">ทำความรู้จัก SWIFTLETHUB</h2>
      <p class="dropcap">รังนกเป็นหนึ่งในอาหารที่มีมูลค่าสูงและผูกพันกับวัฒนธรรมเอเชียมาหลายร้อยปี แต่เรื่องราวของ “ผู้สร้าง” อย่างนกแอ่นกลับถูกพูดถึงน้อยมาก ขณะที่ข้อมูลเรื่องคุณภาพ ราคา และความแท้ในตลาดก็กระจัดกระจาย และหลายครั้งปะปนไปกับการโฆษณา</p>
      <p>SWIFTLETHUB จึงถูกสร้างขึ้นเพื่อเป็นพื้นที่กลางของความรู้ เราเล่าเรื่องนกแอ่นตั้งแต่ชีววิทยา พฤติกรรม และระบบนิเวศ ไปจนถึงความรู้เชิงปฏิบัติเรื่องเกรด การตรวจสอบคุณภาพ และข้อมูลอุตสาหกรรม เพื่อให้ผู้อ่านทุกกลุ่ม ทั้งผู้บริโภค ผู้ประกอบการ นักเรียน และผู้สนใจธรรมชาติ ได้รับข้อมูลที่ถูกต้องและนำไปใช้ได้จริง</p>
    </div>
  </div>
</section>`;

  const leadership = `
<section class="section leader-section" id="leadership" aria-labelledby="leader-title">
  <div class="container">
    <div class="leader-section__head" data-reveal>
      ${eyebrow('คณะผู้บริหาร & ผู้ก่อตั้ง', false)}
      <h2 class="section-title" id="leader-title">ผู้นำองค์กรและวิสัยทัศน์สู่ความเป็นเลิศ</h2>
      <p class="section-lead">ขับเคลื่อน SWIFTLETHUB ด้วยองค์ความรู้สหวิทยาการ ทั้งด้านวิศวกรรมศาสตร์ นิติศาสตร์ การบริหารจัดการระดับสากล และมาตรฐานความปลอดภัยสูงสุด</p>
    </div>

    <div class="leader-card" data-reveal>
      <div class="leader-card__hero">
        <div class="leader-card__photo-col">
          <figure class="leader-card__figure">
            ${img('sitthaphong', { alt: 'นาย สิษฐพงศ์ วามะศิริภัทร (หลุยส์)', cls: 'leader-card__img' })}
            <div class="leader-card__tag">
              <span class="badge badge--gold">${icon('award')} ผู้บริหารระดับสูง</span>
            </div>
          </figure>
          <div class="leader-card__contact">
            <h4 class="leader-card__contact-title">${icon('user')} ช่องทางการติดต่อ</h4>
            <ul class="leader-card__contact-list">
              <li>
                <a href="tel:0645891111" class="leader-contact-link">
                  <span class="leader-contact-link__icon">${icon('phone')}</span>
                  <div>
                    <span class="leader-contact-link__label">โทรศัพท์มือถือ</span>
                    <strong>064-589-1111</strong>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:025851111" class="leader-contact-link">
                  <span class="leader-contact-link__icon">${icon('phone')}</span>
                  <div>
                    <span class="leader-contact-link__label">เบอร์สำนักงาน</span>
                    <strong>02-585-1111</strong>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:CEO@KeymanRecruit.com" class="leader-contact-link">
                  <span class="leader-contact-link__icon">${icon('mail')}</span>
                  <div>
                    <span class="leader-contact-link__label">อีเมลผู้บริหาร</span>
                    <strong>CEO@KeymanRecruit.com</strong>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="leader-card__bio">
          <div class="leader-card__header">
            <span class="leader-card__pretitle">ประธานกรรมการบริหาร</span>
            <h3 class="leader-card__name">นาย สิษฐพงศ์ วามะศิริภัทร <span class="leader-card__nick">(หลุยส์)</span></h3>
            
            <div class="leader-card__positions">
              <div class="leader-pos-item">
                <span class="leader-pos-item__bullet"></span>
                <div>
                  <strong>ประธานกรรมการบริหาร</strong>
                  <span>บริษัท บั๊ก โซลูชันส์ จำกัด</span>
                </div>
              </div>
              <div class="leader-pos-item">
                <span class="leader-pos-item__bullet"></span>
                <div>
                  <strong>ประธานกรรมการบริหาร</strong>
                  <span>บริษัท จัดหางานคีย์แมน จำกัด</span>
                </div>
              </div>
            </div>
          </div>

          <div class="leader-card__desc">
            <p>ผู้บริหารระดับสูงและผู้เชี่ยวชาญที่มีวิสัยทัศน์กว้างไกล ผสานองค์ความรู้ด้านวิศวกรรมศาสตร์ นิติศาสตร์เศรษฐกิจ และการบริหารธุรกิจจากสถาบันการศึกษาชั้นนำระดับโลก มุ่งยกระดับแพลตฟอร์ม SWIFTLETHUB ให้เป็นศูนย์กลางข้อมูลรังนกและนกแอ่นที่ทรงคุณค่า มีความถูกต้องตามหลักวิชาการ โปร่งใส และสร้างมาตรฐานใหม่ให้กับวงการรังนกไทยสู่ระดับสากล</p>
          </div>

          <div class="leader-metrics">
            <div class="leader-metric">
              <span class="leader-metric__val">3 ปริญญาโท</span>
              <span class="leader-metric__lbl">จุฬาฯ · สหรัฐฯ · ธรรมศาสตร์</span>
            </div>
            <div class="leader-metric">
              <span class="leader-metric__val">มอก. เอส</span>
              <span class="leader-metric__lbl">ใบแรกของประเทศไทย</span>
            </div>
            <div class="leader-metric">
              <span class="leader-metric__val">ศาลแรงงาน</span>
              <span class="leader-metric__lbl">ผู้พิพากษาดีเด่น ปี 2566</span>
            </div>
            <div class="leader-metric">
              <span class="leader-metric__val">ILO เจนีวา</span>
              <span class="leader-metric__lbl">ผู้แทนกระทรวงแรงงานไทย</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pillars Section -->
      <div class="leader-pillars">
        <!-- 1. Education -->
        <div class="leader-pillar" data-reveal style="--d:100ms">
          <div class="leader-pillar__head">
            <div class="leader-pillar__icon leader-pillar__icon--navy">${icon('book')}</div>
            <div>
              <h4 class="leader-pillar__title">ประวัติการศึกษา & หลักสูตรระดับสูง</h4>
              <span class="leader-pillar__subtitle">ความรู้สหวิทยาการ วิศวกรรม กฎหมาย และบริหารธุรกิจ</span>
            </div>
          </div>
          <div class="leader-timeline">
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ปริญญาโท คณะนิติศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</strong>
              <p>สาขากฎหมายเศรษฐกิจและภาษีอากร <em>(ได้รับเลือกเป็นประธานรุ่น ศศม25)</em></p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ปริญญาโท คณะบริหารธุรกิจ มหาวิทยาลัยอิลลินอย (UIUC)</strong>
              <p>University of Illinois Urbana-Champaign สหรัฐอเมริกา <em>(ได้รับรางวัลเรียนดี เบต้า แกมม่า ซิกม่า : Beta Gamma Sigma)</em></p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ปริญญาโท คณะพาณิชยศาสตร์และการบัญชี มหาวิทยาลัยธรรมศาสตร์</strong>
              <p>โครงการปริญญาโทสาขาการตลาด นานาชาติ (MIM)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ปริญญาตรี คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</strong>
              <p>ภาควิชาวิศวกรรมอุตสาหการ (Industrial Engineering)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>นักเรียนทุนรัฐบาลญี่ปุ่น ทุนฝึกอบรมโพ้นทะเล (AOTS)</strong>
              <p>หลักสูตร แรงงานสัมพันธ์และการบริหารงานบุคคล ณ โตเกียวเคนชู เซ็นเตอร์ ประเทศญี่ปุ่น (พ.ศ. 2556)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ประกาศนียบัตรชั้นสูง การบริหารงานภาครัฐและกฎหมายมหาชน (ปรม22)</strong>
              <p>สถาบันพระปกเกล้า (พ.ศ. 2566)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>ประกาศนียบัตร ผู้บริหารระดับสูงด้านการพัฒนามหานคร (มหานคร11)</strong>
              <p>มหาวิทยาลัยนวมินทราธิราช (พ.ศ. 2566)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>สวปอ.มส.SML 6 หลักสูตรการบริหารความมั่นคงสำหรับผู้บริหารระดับสูง</strong>
              <p>สมาคมวิทยาลัยป้องกันราชอาณาจักร ในพระบรมราชูปถัมภ์ (พ.ศ. 2568)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>หลักสูตรการพัฒนาการเมืองและการเลือกตั้งระดับสูง รุ่นที่ 16 (พตส. 16)</strong>
              <p>สำนักงานคณะกรรมการการเลือกตั้ง (พ.ศ. 2569)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>หลักสูตรสร้างนักลงทุนไทยในต่างประเทศ (TOISC รุ่นที่ 4)</strong>
              <p>Thailand Overseas Investors to Succeed and Create สำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI)</p>
            </div>
            <div class="leader-timeline__item">
              <span class="leader-timeline__dot"></span>
              <strong>หลักสูตร IPO Road Map รุ่นที่ 2</strong>
              <p>ตลาดหลักทรัพย์แห่งประเทศไทย (Stock Exchange of Thailand - SET)</p>
            </div>
          </div>
        </div>

        <!-- 2. Public Service & Social Work -->
        <div class="leader-pillar" data-reveal style="--d:200ms">
          <div class="leader-pillar__head">
            <div class="leader-pillar__icon leader-pillar__icon--gold">${icon('shield')}</div>
            <div>
              <h4 class="leader-pillar__title">งานสังคม & บทบาทเพื่อสาธารณะ</h4>
              <span class="leader-pillar__subtitle">การอุทิศตนเพื่อสังคม แรงงาน และเวทีระดับชาติ/สากล</span>
            </div>
          </div>
          <ul class="leader-activity-list">
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('award')}</span>
              <div>
                <strong>ผู้พิพากษาในศาลแรงงานกลางดีเด่น ปี 2566</strong>
                <p>ได้รับใบประกาศเกียรติคุณยกย่องการปฏิบัติหน้าที่ด้วยความเที่ยงธรรมและเป็นแบบอย่างที่ดี</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('scales')}</span>
              <div>
                <strong>ผู้พิพากษาสมทบ ศาลแรงงานกลาง ฝ่ายนายจ้าง</strong>
                <p>ดำรงตำแหน่งวาระ พ.ศ. 2562 - 2565 ร่วมพิจารณาและไกล่เกลี่ยข้อพิพาทแรงงาน</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('handshake')}</span>
              <div>
                <strong>ประธานกรรมการ สมาคมนายจ้าง สนับสนุนธุรกิจและงานบริการ</strong>
                <p>กระทรวงแรงงาน ขับเคลื่อนนโยบายและการคุ้มครองผู้ประกอบการและแรงงาน</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('users')}</span>
              <div>
                <strong>กรรมการ สภาองค์การนายจ้างผู้ประกอบการค้าและอุตสาหกรรมไทย (ECONTHAI)</strong>
                <p>ร่วมพัฒนาศักยภาพผู้ประกอบการค้าและอุตสาหกรรมระดับประเทศ</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('globe')}</span>
              <div>
                <strong>ผู้แทนกระทรวงแรงงาน เข้าร่วมประชุมแรงงานโลก (ILO 112th)</strong>
                <p>องค์การแรงงานระหว่างประเทศ ณ สำนักงานใหญ่สหประชาชาติ นครเจนีวา ประเทศสวิตเซอร์แลนด์</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('shield')}</span>
              <div>
                <strong>นายกสมาคม ฆ่าเชื้อและเสริมสุขอนามัยไทย (TDHA)</strong>
                <p>จัดตั้งโดยการกำกับดูแลของกรมการปกครอง กระทรวงมหาดไทย ยกระดับมาตรฐานชีวอนามัย</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('file-text')}</span>
              <div>
                <strong>ลงนามบันทึกความเข้าใจ (MOU) โครงการ "ไทยมีงานทำ"</strong>
                <p>ร่วมกับกรมการจัดหางาน กระทรวงแรงงาน เพื่อส่งเสริมการจ้างงานอย่างมีประสิทธิภาพ</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('check-circle')}</span>
              <div>
                <strong>ผู้ได้รับใบอนุญาตจัดอบรมหลักสูตรความปลอดภัย</strong>
                <p>ได้รับอนุญาตอย่างเป็นทางการจากกรมสวัสดิการและคุ้มครองแรงงาน</p>
              </div>
            </li>
            <li class="leader-activity-item">
              <span class="leader-activity-item__icon">${icon('sparkle')}</span>
              <div>
                <strong>วิทยากรรับเชิญในงานประชุมระดับชาติและนานาชาติ</strong>
                <p>• วิทยากร งาน India-Thai Conclave เพื่อการลงทุนและการค้า (พ.ศ. 2569)<br>• วิทยากร งานวิศวกรรมแห่งชาติ (พ.ศ. 2560)<br>• วิทยากร งาน Export Logistics Model Award กระทรวงพาณิชย์ (พ.ศ. 2556)</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- 3. Awards & Honors (Full Width) -->
        <div class="leader-pillar leader-pillar--full" data-reveal style="--d:300ms">
          <div class="leader-pillar__head">
            <div class="leader-pillar__icon leader-pillar__icon--red">${icon('award')}</div>
            <div>
              <h4 class="leader-pillar__title">รางวัลและเกียรติประวัติแห่งความสำเร็จ</h4>
              <span class="leader-pillar__subtitle">เครื่องหมายการันตีความเป็นเลิศด้านการจัดการ คุณภาพ และคุณประโยชน์ต่อประเทศชาติ</span>
            </div>
          </div>
          
          <div class="leader-awards-grid">
            <div class="leader-award-card">
              <div class="leader-award-card__badge">พ.ศ. 2560 · ชนะเลิศอันดับ 1</div>
              <div class="leader-award-card__icon">${icon('award')}</div>
              <h5 class="leader-award-card__title">SME Excellence Award ระดับแพลทินัม (กลุ่มธุรกิจบริการ)</h5>
              <p class="leader-award-card__desc">รางวัลชนะเลิศอันดับ 1 จากสมาคมการจัดการธุรกิจแห่งประเทศไทย (TMA) ร่วมกับ สถาบันบัณฑิตบริหารธุรกิจ ศศินทร์ แห่งจุฬาลงกรณ์มหาวิทยาลัย โดยการเสนอชื่อของ ธนาคาร ทีทีบี (ttb)</p>
            </div>

            <div class="leader-award-card">
              <div class="leader-award-card__badge">พ.ศ. 2561 · ถ้วยรางวัลนายกรัฐมนตรี</div>
              <div class="leader-award-card__icon">${icon('award')}</div>
              <h5 class="leader-award-card__title">รางวัล SME ดีเด่น (ถ้วยรางวัลจากนายกรัฐมนตรี)</h5>
              <p class="leader-award-card__desc">มอบโดย สถาบันเพิ่มผลผลิตแห่งประเทศไทย เพื่อเชิดชูเกียรติองค์กรที่มีประสิทธิภาพการดำเนินงานและการเพิ่มผลผลิตยอดเยี่ยม</p>
            </div>

            <div class="leader-award-card">
              <div class="leader-award-card__badge">พ.ศ. 2561 · ใบแรกของประเทศไทย</div>
              <div class="leader-award-card__icon">${icon('shield')}</div>
              <h5 class="leader-award-card__title">ใบรับรองมาตรฐาน มอก. เอส (TIS-S) ใบแรกของประเทศไทย</h5>
              <p class="leader-award-card__desc">ได้รับการรับรองมาตรฐานอุตสาหกรรม มอก. เอส ใบแรกของประเทศไทย โดย สำนักงานมาตรฐานผลิตภัณฑ์อุตสาหกรรม (สมอ.) กระทรวงอุตสาหกรรม</p>
            </div>

            <div class="leader-award-card">
              <div class="leader-award-card__badge">พ.ศ. 2565 · เกียรติยศสูงสุด</div>
              <div class="leader-award-card__icon">${icon('star')}</div>
              <h5 class="leader-award-card__title">เข็มรักษาดินแดนยิ่งชีพ</h5>
              <p class="leader-award-card__desc">มอบโดย กองบัญชาการกองอาสารักษาดินแดน กรมการปกครอง กระทรวงมหาดไทย เพื่อเชิดชูเกียรติบุคคลผู้ประกอบคุณประโยชน์อันทรงค่ายิ่งแก่สังคมและประเทศชาติ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const mv = `
<section class="section section--dark mv" aria-label="พันธกิจและวิสัยทัศน์">
  <div class="container mv__grid">
    <article class="mv__card" data-reveal>
      <span class="mv__icon">${icon('compass')}</span>
      <p class="eyebrow eyebrow--light"><span class="eyebrow__line" aria-hidden="true"></span>พันธกิจ</p>
      <h2>ถ่ายทอดความรู้เรื่องนกแอ่นและรังนกที่ถูกต้อง เข้าใจง่าย และตรวจสอบได้</h2>
      <p>เรียบเรียงข้อมูลจากเอกสารวิชาการ หน่วยงานที่เกี่ยวข้อง และผู้มีประสบการณ์ในอุตสาหกรรม พร้อมระบุชัดเจนเมื่อใช้ข้อมูลตัวอย่าง</p>
    </article>
    <article class="mv__card" data-reveal style="--d:100ms">
      <span class="mv__icon">${icon('target')}</span>
      <p class="eyebrow eyebrow--light"><span class="eyebrow__line" aria-hidden="true"></span>วิสัยทัศน์</p>
      <h2>เป็นศูนย์กลางความรู้เรื่องนกแอ่นและรังนกภาษาไทยที่ผู้คนไว้วางใจมากที่สุด</h2>
      <p>สร้างอุตสาหกรรมที่โปร่งใสและยั่งยืน ที่ผู้บริโภคเลือกได้อย่างมั่นใจ และนกแอ่นยังคงอยู่คู่ธรรมชาติไปอีกหลายชั่วอายุคน</p>
    </article>
  </div>
</section>`;

  const why = `
<section class="section" aria-labelledby="why-title">
  <div class="container split split--reverse">
    <div class="split__media" data-reveal>
      <figure class="frame frame--tall">${img('house-interior', { alt: 'ภายในบ้านนกที่มีรังนกแอ่นเรียงรายตามแผ่นไม้', sizes: '(min-width: 1024px) 45vw, 100vw' })}<figcaption>บ้านนกที่ออกแบบให้ใกล้เคียงสภาพถ้ำธรรมชาติ</figcaption></figure>
    </div>
    <div class="split__text">
      ${sectionHead({ eyebrow: 'ที่มา', title: 'ทำไมเราจึงสร้าง SWIFTLETHUB', id: 'why-title' })}
      <div class="prose prose--compact">
        <p>เราพบว่าผู้บริโภคจำนวนมากเลือกซื้อรังนกโดยไม่รู้ว่ารังนกแต่ละเกรดต่างกันอย่างไร หลายคนไม่เคยรู้ว่านกแอ่นกับนกนางแอ่นเป็นนกคนละชนิด และยังมีความเข้าใจผิดเรื่อง “รังนกเลือด” หรือสถิติตลาดที่ไม่มีแหล่งที่มาชัดเจน</p>
        <p>ในอีกด้าน ผู้ประกอบการบ้านนกและผู้ค้ารายย่อยก็ต้องการพื้นที่ที่น่าเชื่อถือ ในการแลกเปลี่ยนความรู้และเชื่อมต่อกับผู้ซื้ออย่างเป็นธรรม</p>
        <p><strong>SWIFTLETHUB จึงเกิดขึ้นเพื่อลดช่องว่างของข้อมูลนี้</strong> โดยให้ความรู้มาก่อนการค้า และให้นกแอ่นเป็นศูนย์กลางของทุกเรื่องราว</p>
      </div>
    </div>
  </div>
</section>`;

  const objectives = [
    ['book', 'ให้ความรู้ที่ถูกต้อง', 'เผยแพร่บทความเชิงลึกเรื่องนกแอ่นและรังนก ที่ผ่านการเรียบเรียงและตรวจทาน'],
    ['shield', 'ปกป้องผู้บริโภค', 'ช่วยให้ผู้อ่านแยกแยะรังนกแท้ เข้าใจเกรด และเลือกซื้ออย่างมีข้อมูล'],
    ['chart', 'สร้างความโปร่งใส', 'นำเสนอข้อมูลอุตสาหกรรมพร้อมแหล่งที่มา และแยกข้อมูลตัวอย่างออกจากข้อเท็จจริง'],
    ['leaf', 'ส่งเสริมความยั่งยืน', 'สนับสนุนการเก็บรังอย่างรับผิดชอบและการอนุรักษ์ถิ่นอาศัยของนกแอ่น'],
    ['handshake', 'เชื่อมโยงชุมชน', 'เป็นพื้นที่กลางให้ผู้ซื้อ ผู้ขาย และผู้ประกอบการบ้านนกพบกันอย่างเป็นธรรม'],
    ['users', 'เปิดกว้างสำหรับทุกคน', 'เขียนให้เข้าใจง่าย ทั้งผู้เริ่มต้น นักเรียน และผู้เชี่ยวชาญในอุตสาหกรรม']
  ];
  const obj = `
<section class="section section--paper" aria-labelledby="obj-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'เป้าหมายของเว็บไซต์', title: 'วัตถุประสงค์ของ SWIFTLETHUB', id: 'obj-title', align: 'center' })}
    <div class="obj-grid">
      ${objectives.map(([ic, t, d], i) => `<article class="obj" data-reveal style="--d:${(i % 3) * 80}ms"><span class="obj__num">0${i + 1}</span><span class="obj__icon">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
  </div>
</section>`;

  const commitment = `
<section class="commit" aria-labelledby="commit-title">
  <div class="commit__media">${img('flock', { alt: 'ฝูงนกแอ่นบินวนบนท้องฟ้ายามเย็น', sizes: '100vw' })}</div>
  <div class="commit__overlay" aria-hidden="true"></div>
  <div class="container commit__inner">
    ${sectionHead({ eyebrow: 'คำมั่นของเรา', title: 'ความมุ่งมั่นในการแบ่งปันความรู้เรื่องรังนก', id: 'commit-title', light: true })}
    <ul class="commit__list">
      ${[
        ['ความถูกต้องมาก่อนเสมอ', 'ทุกบทความผ่านการค้นคว้าและตรวจทาน หากพบข้อผิดพลาด เราพร้อมแก้ไขและระบุวันที่ปรับปรุง'],
        ['ซื่อตรงต่อข้อมูล', 'แยก “ข้อมูลตัวอย่าง” ออกจากข้อเท็จจริงอย่างชัดเจน ไม่นำเสนอตัวเลขสมมุติเป็นสถิติจริง'],
        ['ความรู้ไม่ใช่โฆษณา', 'เนื้อหาความรู้แยกจากการแนะนำผลิตภัณฑ์ และไม่กล่าวอ้างสรรพคุณเกินจริง'],
        ['นกแอ่นเป็นศูนย์กลาง', 'สนับสนุนแนวทางที่เคารพวงจรชีวิตของนกและความยั่งยืนของถิ่นอาศัย']
      ].map(([t, d], i) => `<li data-reveal style="--d:${i * 80}ms"><span>${icon('check')}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}
    </ul>
  </div>
</section>`;

  const roadmap = `
<section class="section" aria-labelledby="road-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'ก้าวต่อไป', title: 'เป้าหมายในอนาคต', id: 'road-title', lead: 'แผนการพัฒนาแพลตฟอร์มเพื่อให้ SWIFTLETHUB เป็นแหล่งความรู้และชุมชนที่สมบูรณ์ยิ่งขึ้น' })}
    <ol class="roadmap">
      ${[
        ['ปี 2569', 'คลังบทความพื้นฐาน', 'เปิดตัวคลังความรู้ 4 หมวดหลัก และพื้นที่ซื้อ - ฝากขายรังนก'],
        ['ปี 2570', 'ฐานข้อมูลอุตสาหกรรม', 'รวบรวมข้อมูลจริงจากหน่วยงานที่เกี่ยวข้อง แทนที่ข้อมูลตัวอย่างทั้งหมด'],
        ['ปี 2570', 'คู่มือตรวจสอบคุณภาพ', 'คู่มือภาพประกอบและวิดีโอสอนการตรวจสอบรังนกด้วยตนเอง'],
        ['ปี 2571', 'เครือข่ายผู้เชี่ยวชาญ', 'ความร่วมมือกับนักวิชาการและผู้ประกอบการเพื่อยกระดับมาตรฐานและการอนุรักษ์']
      ].map(([y, t, d], i) => `<li class="roadmap__item" data-reveal style="--d:${i * 90}ms"><span class="roadmap__year">${y}</span><span class="roadmap__dot" aria-hidden="true"></span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <div class="about-cta" data-reveal>
      <h2>เริ่มต้นเรียนรู้เรื่องนกแอ่นไปกับเรา</h2>
      <div>${btn('สำรวจบทความ', 'articles.html', 'primary', { iconName: 'arrow' })} ${btn('ติดต่อทีมงาน', 'contact.html', 'outline')}</div>
    </div>
  </div>
</section>`;

  return page({
    key: 'about', title: 'เกี่ยวกับเรา', base, path: 'about.html', image: 'karst-dawn', headerMode: 'overlay',
    description: 'ทำความรู้จัก SWIFTLETHUB แพลตฟอร์มความรู้เรื่องนกแอ่นและรังนก คณะผู้บริหาร พันธกิจ วิสัยทัศน์ วัตถุประสงค์ และเป้าหมายในอนาคต',
    body: hero + intro + leadership + mv + why + obj + commitment + roadmap
  });
};
