import Link from 'next/link';
import { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/seo';
import {
  BOOK_AUTHOR,
  LIVING_WATERS_SERIES,
  amazonUrl,
  books,
  seriesBooks,
  standaloneBooks,
  type Book,
} from '@/data/books';

const DESCRIPTION =
  'Books by Adam Steinberger on Amazon: the Living Waters Space Trilogy, The Case for Catholicism, Engineering Influence, and more, each linked by format.';

export const metadata: Metadata = {
  title: 'Books',
  description: DESCRIPTION,
  alternates: { canonical: '/books' },
  openGraph: {
    images: [OG_IMAGE],
    title: 'Books | Adam Matthew Steinberger',
    description: DESCRIPTION,
    url: 'https://vibewithadam.matthewsteinberger.com/books',
  },
};

const BOOK_FORMAT_URL = {
  Kindle: 'https://schema.org/EBook',
  Paperback: 'https://schema.org/Paperback',
  Hardcover: 'https://schema.org/Hardcover',
} as const;

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': books.map((book) => ({
    '@type': 'Book',
    name: book.title,
    alternateName: `${book.title}: ${book.subtitle}`,
    author: { '@type': 'Person', name: BOOK_AUTHOR },
    ...(book.series ? { isPartOf: { '@type': 'BookSeries', name: book.series } } : {}),
    workExample: book.editions.map((edition) => ({
      '@type': 'Book',
      bookFormat: BOOK_FORMAT_URL[edition.format],
      url: amazonUrl(edition.asin),
    })),
  })),
};

function BookCard({ book }: { book: Book }) {
  return (
    <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">{book.title}</h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4 italic">{book.subtitle}</p>
      <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
        {book.editions.map((edition) => (
          <li key={edition.asin}>
            <a
              href={amazonUrl(edition.asin)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${book.title}, ${edition.format}, on Amazon`}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline text-sm"
            >
              {edition.format}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BooksPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container mx-auto px-4 pt-8 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
          Books
        </h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Published as {BOOK_AUTHOR}. Each format links to its Amazon page.
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              {LIVING_WATERS_SERIES}
            </h2>
            <div className="space-y-4">
              {seriesBooks.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              More books
            </h2>
            <div className="space-y-4">
              {standaloneBooks.map((book) => (
                <BookCard key={book.title} book={book} />
              ))}
            </div>
          </div>

          <p className="text-[var(--color-text-muted)] text-sm text-center">
            Looking for the free series on AI chatbots for business? It is on the web:{' '}
            <Link href="/novice-to-navigator" className="text-[var(--color-accent-blue)] hover:underline">
              Novice to Navigator
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
