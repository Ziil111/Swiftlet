#!/usr/bin/env node
// Static site builder for SWIFTLETHUB
const fs = require('fs');
const path = require('path');

const root = __dirname;
const home = require('./src/pages/home');
const articlesPage = require('./src/pages/articles');
const articlePage = require('./src/pages/article');
const productsPage = require('./src/pages/products');
const aboutPage = require('./src/pages/about');
const contactPage = require('./src/pages/contact');
const tradePage = require('./src/pages/trade');
const notFound = require('./src/pages/notfound');
const { articles } = require('./src/content');

console.log('Building SWIFTLETHUB static website...');

// Ensure output directories
fs.mkdirSync(path.join(root, 'articles'), { recursive: true });

const pages = [
  { file: 'index.html', render: () => home() },
  { file: 'articles.html', render: () => articlesPage() },
  { file: 'products.html', render: () => productsPage() },
  { file: 'about.html', render: () => aboutPage() },
  { file: 'contact.html', render: () => contactPage() },
  { file: 'trade.html', render: () => tradePage() },
  { file: '404.html', render: () => notFound() }
];

for (const p of pages) {
  const html = p.render();
  fs.writeFileSync(path.join(root, p.file), html, 'utf8');
  console.log(`✓ ${p.file} (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
}

for (const a of articles) {
  const html = articlePage(a);
  const outPath = path.join(root, 'articles', `${a.slug}.html`);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ articles/${a.slug}.html (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
}

console.log(`\nBuild complete! Total ${pages.length} pages + ${articles.length} article pages generated.`);
