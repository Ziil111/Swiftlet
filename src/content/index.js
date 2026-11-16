// Loads and normalises all article content.
const fs = require('fs');
const path = require('path');
const site = require('../site');

const files = ['articles-a.js', 'articles-b.js'].map(f => path.join(__dirname, f)).filter(f => fs.existsSync(f));
const raw = files.flatMap(f => { delete require.cache[f]; return require(f); });

// Illustrative view counts used only for the "popular articles" ordering
const popularity = {
  'real-vs-fake': 9820, 'natural-vs-house-nest': 9140, 'what-is-swiftlet': 8650, 'industry-stats-trends': 7310,
  'nest-types-grades': 6900, 'fake-nest-signs': 6420, 'buying-tips': 5980, 'nesting-behavior': 5530,
  'thai-market': 4870, 'quality-factors': 4410, 'quality-testing': 3960, 'global-market': 3520,
  'export-trends': 3090, 'production-stats': 2740
};

const words = (a) => {
  const text = [a.lead, ...a.body.map(b => [b.text, b.title, ...(b.items || []).map(i => typeof i === 'string' ? i : i.label), ...(b.rows || []).flat()].join(' '))].join(' ');
  return text.replace(/<[^>]+>/g, '').length;
};

const articles = raw.map(a => {
  if (!site.categories[a.category]) throw new Error(`Unknown category "${a.category}" in ${a.slug}`);
  const chars = words(a);
  return {
    ...a,
    readMin: a.readMin || Math.max(3, Math.round(chars / 900)),
    popularity: popularity[a.slug] || 1000,
    toc: a.body.filter(b => b.type === 'h2').map(b => ({ id: b.id, text: b.text }))
  };
}).sort((x, y) => y.date.localeCompare(x.date));

const bySlug = Object.fromEntries(articles.map(a => [a.slug, a]));
const get = (slug) => bySlug[slug];

module.exports = { articles, get };
