import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  BOOK_AUTHOR,
  LIVING_WATERS_SERIES,
  amazonUrl,
  books,
  booksSummary,
  seriesBooks,
  standaloneBooks,
} from '../books';
import { kbSources } from '../kb-sources';

describe('books data', () => {
  it('lists every book once, with unique ASINs of the KDP form', () => {
    const asins = books.flatMap((b) => b.editions.map((e) => e.asin));
    expect(new Set(asins).size).toBe(asins.length);
    for (const asin of asins) expect(asin).toMatch(/^B0[A-Z0-9]{8}$/);
    expect(new Set(books.map((b) => b.title)).size).toBe(books.length);
    expect(books.every((b) => b.editions.length > 0)).toBe(true);
  });

  it('keeps the Living Waters trilogy together and in reading order', () => {
    expect(seriesBooks.map((b) => b.title)).toEqual(['Murky Water', 'Deep Water', 'Living Water']);
    expect(seriesBooks.every((b) => b.series === LIVING_WATERS_SERIES)).toBe(true);
    expect(standaloneBooks.some((b) => b.series)).toBe(false);
    expect(seriesBooks.length + standaloneBooks.length).toBe(books.length);
  });

  it('links to the public Amazon product page, never the author-only KDP dashboard', () => {
    expect(amazonUrl('B0HQY1G496')).toBe('https://www.amazon.com/dp/B0HQY1G496');
  });

  it('states no price, rating or review count', () => {
    const copy = JSON.stringify(books) + booksSummary();
    expect(copy).not.toMatch(/\$\d|price|rating|review|stars?\b/i);
  });

  it('summarises every book and format for the knowledge base', () => {
    const summary = booksSummary();
    expect(summary).toContain(BOOK_AUTHOR);
    for (const book of books) expect(summary).toContain(book.title);
    const kb = kbSources.find((s) => s.id === 'books');
    expect(kb?.text).toContain('Engineering Influence');
    expect(kb?.text).toContain('Murky Water');
  });

  it('is mirrored in public/llms.txt by title', () => {
    const llms = fs.readFileSync(path.join(process.cwd(), 'public/llms.txt'), 'utf8');
    for (const book of books) expect(llms).toContain(book.title);
    expect(llms).not.toMatch(/not for sale/i);
  });
});
