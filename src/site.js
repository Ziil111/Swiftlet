// Site-wide configuration: brand, navigation, categories, authors, contact details.
module.exports = {
  name: 'SWIFTLETHUB',
  tagline: 'ศูนย์รวมความรู้เรื่องนกแอ่นและรังนก',
  description: 'SWIFTLETHUB แหล่งเรียนรู้เรื่องนกแอ่น ธรรมชาติ พฤติกรรมการสร้างรัง เกรดและคุณภาพรังนก สถิติอุตสาหกรรม และวิธีสังเกตรังนกแท้ นำเสนอในรูปแบบนิตยสารความรู้ที่เชื่อถือได้',
  url: 'https://www.swiftlethub.co.th',
  locale: 'th_TH',
  year: 2026,

  nav: [
    { key: 'home', label: 'หน้าแรก', href: 'index.html' },
    { key: 'articles', label: 'บทความ', href: 'articles.html' },
    { key: 'products', label: 'ผลิตภัณฑ์แนะนำ', href: 'products.html' },
    { key: 'about', label: 'เกี่ยวกับเรา', href: 'about.html' },
    { key: 'contact', label: 'ติดต่อเรา', href: 'contact.html' }
  ],
  cta: { key: 'trade', label: 'ซื้อ - ฝากขายรังนก', href: 'trade.html' },

  // Article categories (order = display order)
  categories: {
    swiftlet: {
      label: 'นกแอ่นและธรรมชาติ',
      short: 'นกแอ่น',
      icon: 'feather',
      desc: 'ชีววิทยา พฤติกรรม แหล่งอาศัย และการอนุรักษ์นกแอ่นกินรัง',
      topics: ['รู้จักนกแอ่น', 'พฤติกรรมการสร้างรัง']
    },
    grades: {
      label: 'เกรดรังนกธรรมชาติและรังนกเลี้ยง',
      short: 'เกรดรังนก',
      icon: 'award',
      desc: 'ความแตกต่างของรังนกถ้ำและรังนกบ้าน ประเภท เกรด และปัจจัยด้านคุณภาพ',
      topics: ['ความแตกต่างระหว่างรังนกธรรมชาติและรังนกบ้าน', 'ประเภทและเกรดของรังนก', 'ปัจจัยที่มีผลต่อคุณภาพรังนก']
    },
    stats: {
      label: 'สถิติรังนก',
      short: 'สถิติรังนก',
      icon: 'chart',
      desc: 'ข้อมูลการผลิต ตลาดในประเทศและระดับโลก และแนวโน้มการส่งออก',
      topics: ['สถิติการผลิต', 'ตลาดรังนกในประเทศไทย', 'ตลาดรังนกระดับโลก', 'แนวโน้มการส่งออก', 'ข้อมูลอุตสาหกรรมรังนก']
    },
    authentic: {
      label: 'รังนกแท้และรังนกปลอม',
      short: 'แท้หรือปลอม',
      icon: 'shield',
      desc: 'วิธีสังเกตรังนกแท้ ลักษณะของรังนกปลอม การตรวจสอบคุณภาพ และข้อควรระวัง',
      topics: ['วิธีสังเกตรังนกแท้', 'ลักษณะของรังนกปลอม', 'การตรวจสอบคุณภาพ', 'ข้อควรระวังในการเลือกซื้อ']
    }
  },

  authors: {
    editorial: { name: 'กองบรรณาธิการ SWIFTLETHUB', role: 'ทีมเนื้อหาและบรรณาธิการ', bio: 'คัดสรร เรียบเรียง และตรวจทานเนื้อหาความรู้เรื่องนกแอ่นและรังนก เพื่อให้ผู้อ่านได้รับข้อมูลที่ถูกต้องและเข้าใจง่าย' },
    nature: { name: 'ทีมความรู้ธรรมชาติ', role: 'นักเขียนสารคดีธรรมชาติ', bio: 'ถ่ายทอดเรื่องราวชีววิทยา พฤติกรรม และระบบนิเวศของนกแอ่น จากเอกสารวิชาการและการลงพื้นที่' },
    data: { name: 'ทีมข้อมูลอุตสาหกรรม', role: 'ฝ่ายวิเคราะห์ข้อมูล', bio: 'รวบรวมและอธิบายข้อมูลการผลิต การตลาด และการส่งออกรังนก พร้อมระบุชัดเจนเมื่อใช้ข้อมูลตัวอย่าง' },
    quality: { name: 'ทีมมาตรฐานคุณภาพ', role: 'ฝ่ายความรู้ด้านคุณภาพรังนก', bio: 'อธิบายการคัดเกรด การตรวจสอบคุณภาพ และวิธีแยกแยะรังนกแท้ เพื่อให้ผู้บริโภคเลือกซื้ออย่างมั่นใจ' }
  },

  contact: {
    email: 'hello@swiftlethub.co.th',
    phone: '02-950-0000',
    line: '@swiftlethub',
    address: '3186,3188 อาคารบั๊กโซลูชันส์ ถ.ลาดพร้าว คลองจั่น กรุงเทพมหานคร 10240',
    hours: 'จันทร์ - ศุกร์ 08:30 - 17:30 น.'
  },

  social: [
    { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
    { key: 'line', label: 'LINE Official', href: 'https://line.me/' },
    { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
    { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
    { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/' }
  ]
};
