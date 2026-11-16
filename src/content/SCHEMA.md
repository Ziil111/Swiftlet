# Article content schema (Thai only)

Each content file is a CommonJS module that exports an array of article objects:

```js
// src/content/articles-<group>.js
module.exports = [
  {
    slug: 'natural-vs-house-nest',          // kebab-case, ASCII, unique -> /articles/<slug>.html
    category: 'grades',                     // one of: 'swiftlet' | 'grades' | 'stats' | 'authentic'
    topic: 'ความแตกต่างระหว่างรังนกธรรมชาติและรังนกบ้าน', // sub-topic label (shown as small tag)
    title: 'เกรดรังนกธรรมชาติและรังนกเลี้ยงแตกต่างกันอย่างไร?',
    excerpt: 'สรุป 1–2 ประโยค (ประมาณ 90–160 ตัวอักษร) ใช้บนการ์ดและ meta description',
    cover: 'cave-nests',                    // image key (see list below)
    coverAlt: 'คำอธิบายภาพภาษาไทย',
    author: 'editorial',                    // 'editorial' | 'nature' | 'data' | 'quality'
    date: '2026-10-28',                     // ISO date, between 2026-06-01 and 2026-11-10
    readMin: 8,                             // estimated reading time in minutes
    tags: ['รังนกบ้าน', 'เกรดรังนก'],
    lead: 'ย่อหน้าเปิดเรื่อง 2–4 ประโยค แสดงตัวใหญ่ใต้หัวข้อ',
    body: [ /* blocks, see below */ ],
    sources: [ 'ชื่อแหล่งอ้างอิงทั่วไป เช่น กรมอุทยานแห่งชาติ สัตว์ป่า และพันธุ์พืช (ข้อมูลทั่วไป)' ] // optional
  }
];
```

## Body blocks

Inline HTML allowed inside `text`/`items`/table cells: `<strong>`, `<em>`, `<br>` only.

| block | shape | notes |
|---|---|---|
| paragraph | `{ type: 'p', text }` | |
| section heading | `{ type: 'h2', id: 'ascii-id', text }` | builds the table of contents; 4–7 per article; `id` unique in the article |
| sub heading | `{ type: 'h3', text }` | |
| bullet list | `{ type: 'ul', items: ['...'] }` | |
| numbered list | `{ type: 'ol', items: ['...'] }` | |
| comparison table | `{ type: 'table', caption, head: ['หัวข้อ','A','B'], rows: [['...','...','...']], note }` | `note` optional; at least one table per article |
| figure | `{ type: 'figure', img: 'key', alt, caption }` | 1–2 per article, use image keys below |
| callout | `{ type: 'callout', tone: 'info' \| 'tip' \| 'warning' \| 'sample', title, text }` | use `tone: 'sample'` whenever numbers are illustrative sample data |
| key figures | `{ type: 'stats', items: [{ value: '70%', label: '...' }], note }` | 3–4 items; `note` REQUIRED and must state whether figures are sample data |
| pull quote | `{ type: 'quote', text, cite }` | optional; never attribute quotes to real named people |

## Image keys (assets/img/<key>.jpg)

Swiftlet birds & habitats (prefer these — the bird is the brand's visual identity):
- `hero-swiftlets` swiftlets flying above limestone sea cliffs, golden hour
- `flock` huge swirling flock at sunset
- `cta-cave` swiftlets streaming into a sea cave at dusk (dark)
- `karst-dawn` single swiftlet gliding over misty karst mountains
- `building` swiftlet building a half-finished saliva nest on a cave wall
- `resting` two swiftlets resting on their nest
- `chicks` parent feeding chicks in the nest
- `portrait` close portrait of a swiftlet clinging to stone
- `inflight` single swiftlet in flight, cream background
- `feeding` swiftlets hunting insects over rice paddies
- `mangrove` swiftlets over mangrove forest / estuary
- `cave-nests` cave interior with rows of nests and flying birds
- `cave-light` sunlit sea cave with birds and nests on wall
- `swiftlet-house` swiftlet house building in a town with birds circling
- `house-interior` inside a swiftlet house: wooden planks with nests
- `island` aerial limestone island with sea caves

Bird's nest (use only inside grading/authenticity/statistics articles):
- `nest-grades` four nest forms side by side (whole cup, broken pieces, strips, golden nest) on linen
- `nest-cleaning` hands cleaning a raw nest with tweezers over a water bowl
- `nest-tray` cleaned nest cups on a wooden tray beside a brass weighing scale
- `nest-soaking` a nest soaking/expanding in a glass bowl of water
- `nest-pile` pile of cleaned white nest cups on dark wood

## Editorial rules
- Thai language only, natural editorial tone, educational, neutral (not salesy).
- Do NOT invent precise statistics and present them as fact. Any specific market/production/export/price numbers must be labelled
  as sample/illustrative (`callout` tone `sample`, `stats.note`, `table.note`: "ข้อมูลตัวอย่างเพื่อการอธิบาย ไม่ใช่สถิติจริง").
  Widely-known qualitative facts are fine (e.g. Indonesia is the largest producer; China incl. Hong Kong is the largest consumer market).
- No medical/health claims beyond "มีการศึกษา/เชื่อกันว่า"; recommend consulting experts.
- Never name real companies or real people.
