/**
 * Adam's books, as listed on his Amazon KDP bookshelf. One source for /books,
 * its JSON-LD, the chat bot's knowledge base (booksChunk() in kb-sources.ts) and
 * public/llms.txt, so they cannot drift.
 *
 * Rules (enforced by __tests__/books.test.ts): titles, subtitles and ASINs are
 * copied from the bookshelf; no price, rating, review count or description is
 * stated, because the site shows none of them and prices change. A format with
 * no ASIN is simply absent. Add a format here when it goes live.
 */

export type BookFormat = 'Kindle' | 'Paperback' | 'Hardcover';

export interface BookEdition {
  format: BookFormat;
  asin: string;
}

export interface Book {
  title: string;
  subtitle: string;
  /** Present only for books in a series; the series name is shared verbatim. */
  series?: string;
  editions: BookEdition[];
}

export const BOOK_AUTHOR = 'Adam Steinberger';
export const LIVING_WATERS_SERIES = 'The Living Waters Space Trilogy';

export function amazonUrl(asin: string): string {
  return `https://www.amazon.com/dp/${asin}`;
}

export const books: Book[] = [
  {
    title: 'Murky Water',
    subtitle: 'The Living Waters Space Trilogy [Book One]',
    series: LIVING_WATERS_SERIES,
    editions: [
      { format: 'Kindle', asin: 'B0HQY1G496' },
      { format: 'Paperback', asin: 'B0HRX4PSJ9' },
      { format: 'Hardcover', asin: 'B0HRWTLB7C' },
    ],
  },
  {
    title: 'Deep Water',
    subtitle: 'The Living Waters Space Trilogy [Book Two]',
    series: LIVING_WATERS_SERIES,
    editions: [{ format: 'Kindle', asin: 'B0HQY4NQVR' }],
  },
  {
    title: 'Living Water',
    subtitle: 'The Living Waters Space Trilogy [Book Three]',
    series: LIVING_WATERS_SERIES,
    editions: [
      { format: 'Kindle', asin: 'B0HRX4TMT3' },
      { format: 'Paperback', asin: 'B0HQXX2Y16' },
      { format: 'Hardcover', asin: 'B0HRX7YS8N' },
    ],
  },
  {
    title: 'The Case for Catholicism',
    subtitle: 'Tradition, Formation, and the Recovery of Christian Culture',
    editions: [
      { format: 'Kindle', asin: 'B0HQ1GN463' },
      { format: 'Paperback', asin: 'B0HRX3D73D' },
      { format: 'Hardcover', asin: 'B0HQY8G6HH' },
    ],
  },
  {
    title: 'A Return to What Worked',
    subtitle: 'Premodern Goods, Modern Losses, and the Recovery of Human Flourishing',
    editions: [{ format: 'Hardcover', asin: 'B0HQXZYC4S' }],
  },
  {
    title: 'The Social Sickness',
    subtitle: 'How a Disconnected Age Lost the Art of Belonging',
    editions: [{ format: 'Paperback', asin: 'B0HQXTNNR8' }],
  },
  {
    title: 'The Autistic Gospel',
    subtitle: 'Christianity for the Neurologically Divergent',
    editions: [
      { format: 'Kindle', asin: 'B0HF3N72S2' },
      { format: 'Paperback', asin: 'B0HQ155KV5' },
      { format: 'Hardcover', asin: 'B0HQ1562TF' },
    ],
  },
  {
    title: 'Mars Mission',
    subtitle: 'The Theological Foundations for Space Exploration',
    editions: [
      { format: 'Kindle', asin: 'B0HPW9NQJ4' },
      { format: 'Paperback', asin: 'B0HQ2MQ257' },
      { format: 'Hardcover', asin: 'B0HPZXY3Q9' },
    ],
  },
  {
    title: 'Encountering Messiah',
    subtitle: 'A Journey for Jewish Hearts',
    editions: [
      { format: 'Kindle', asin: 'B0G2D27Q3N' },
      { format: 'Paperback', asin: 'B0HPWQ89MD' },
      { format: 'Hardcover', asin: 'B0HPYZLXC6' },
    ],
  },
  {
    title: 'Engineering Influence',
    subtitle: 'A Playbook for the Remnant to Bring Christian Culture Back to America',
    editions: [
      { format: 'Kindle', asin: 'B0HPWQFD3Y' },
      { format: 'Paperback', asin: 'B0HPWB2JPJ' },
      { format: 'Hardcover', asin: 'B0HPWMD479' },
    ],
  },
];

/** Books in the Living Waters trilogy, in reading order. */
export const seriesBooks = books.filter((b) => b.series === LIVING_WATERS_SERIES);
/** Every other book. */
export const standaloneBooks = books.filter((b) => !b.series);

export function booksSummary(): string {
  const line = (b: Book) =>
    `${b.title}: ${b.subtitle} (${b.editions.map((e) => e.format).join(', ')})`;
  return (
    `Adam (listed as ${BOOK_AUTHOR}) has books on Amazon. ` +
    `${LIVING_WATERS_SERIES}: ${seriesBooks.map(line).join('; ')}. ` +
    `Other books: ${standaloneBooks.map(line).join('; ')}.`
  );
}
