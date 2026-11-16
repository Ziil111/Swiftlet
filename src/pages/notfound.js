// 404 page
const { page, icon, btn } = require('../ui');
const { img } = require('../lib');

module.exports = function notFound() {
  const body = `
<section class="nf">
  <div class="nf__media">${img('karst-dawn', { alt: '', eager: true, sizes: '100vw' })}</div>
  <div class="nf__overlay" aria-hidden="true"></div>
  <div class="container nf__inner">
    <p class="nf__code">404</p>
    <h1>นกแอ่นบินหลงทางเสียแล้ว</h1>
    <p>ไม่พบหน้าที่คุณกำลังค้นหา หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว</p>
    <div class="nf__actions">${btn('กลับหน้าแรก', 'index.html', 'primary', { iconName: 'home', iconLeft: true })} ${btn('ไปที่คลังบทความ', 'articles.html', 'ghost-light')}</div>
  </div>
</section>`;
  return page({ key: '404', title: 'ไม่พบหน้า', base: '', path: '404.html', body, headerMode: 'overlay', image: 'karst-dawn' })
    .replace('<head>', '<head>\n<meta name="robots" content="noindex">');
};
