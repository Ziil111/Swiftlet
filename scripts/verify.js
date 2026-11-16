const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = [
  'index.html', 'articles.html', 'products.html', 'about.html', 'contact.html', 'trade.html', '404.html'
];
const artFiles = fs.readdirSync(path.join(root, 'articles')).filter(f => f.endsWith('.html')).map(f => 'articles/' + f);
const allFiles = [...htmlFiles, ...artFiles];

let assetErrors = 0;
let checkedAssets = 0;
let deadLinks = 0;
let checkedLinks = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  const base = file.startsWith('articles/') ? path.join(root, 'articles') : root;
  
  // check img src
  const imgMatches = content.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
  for (const m of imgMatches) {
    const src = m[1].split('?')[0];
    const resolved = path.resolve(base, src);
    checkedAssets++;
    if (!fs.existsSync(resolved)) {
      console.error('Missing image:', file, '->', src);
      assetErrors++;
    }
  }

  // check css/js
  const linkMatches = content.matchAll(/<(?:link[^>]+href|script[^>]+src)=["']([^"']+)["']/g);
  for (const m of linkMatches) {
    const src = m[1];
    if (src.startsWith('http') || src.startsWith('//')) continue;
    const resolved = path.resolve(base, src);
    checkedAssets++;
    if (!fs.existsSync(resolved)) {
      console.error('Missing asset:', file, '->', src);
      assetErrors++;
    }
  }

  // check internal a href
  const aMatches = content.matchAll(/<a[^>]+href=["']([^"']+)["']/g);
  for (const m of aMatches) {
    let href = m[1];
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http:') || href.startsWith('https:')) {
      continue;
    }
    href = href.split('#')[0].split('?')[0];
    if (!href) continue;

    checkedLinks++;
    const resolved = path.resolve(base, href);
    if (!fs.existsSync(resolved)) {
      console.error('Dead link:', file, '->', m[1], '(resolved to', resolved, ')');
      deadLinks++;
    }
  }
}

console.log(`Assets: checked ${checkedAssets}, errors: ${assetErrors}`);
console.log(`Internal Links: checked ${checkedLinks}, dead links: ${deadLinks}`);
if (assetErrors === 0 && deadLinks === 0) {
  console.log('✓ All assets and links verified successfully!');
} else {
  process.exit(1);
}
