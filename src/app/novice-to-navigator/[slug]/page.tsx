import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { getArticleBySlug, getArticleMetadata } from '@/lib/markdownUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import SecondEditionNudge from '@/components/SecondEditionNudge';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Prerendered at build: the Workers runtime has no filesystem, and these pages read Markdown.
export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleMetadata = getArticleMetadata(slug);

  if (!articleMetadata) {
    return {
      title: 'Article Not Found',
    };
  }

  const pageTitle = `${articleMetadata.title} | Novice to Navigator | Adam Matthew Steinberger`;
  const pageUrl = `https://vibe.with.adam.matthewsteinberger.com/novice-to-navigator/${slug}`;
  const description = `${articleMetadata.title} - ${articleMetadata.meta.section}. Learn about AI chatbot development and custom GPT solutions from Adam Matthew Steinberger.`;

  return {
    title: pageTitle,
    description: description,
    keywords: `AI chatbot development, ${articleMetadata.meta.section}, Novice to Navigator, AI education, Adam Matthew Steinberger, Greenville SC AI expert`,
    authors: [{ name: 'Adam Matthew Steinberger' }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    alternates: {
      canonical: `/novice-to-navigator/${slug}`,
    },
    openGraph: {
      title: articleMetadata.title,
      description: description,
      url: pageUrl,
      siteName: 'Adam Matthew Steinberger',
      images: [
        {
          url: '/images/social-preview.png',
          width: 1200,
          height: 630,
          alt: articleMetadata.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: articleMetadata.meta.date,
      section: articleMetadata.meta.section,
      tags: ['AI', 'Chatbots', 'AI Development', 'Machine Learning', 'GPT'],
    },
    twitter: {
      card: 'summary_large_image',
      title: articleMetadata.title,
      description: description,
      images: ['/images/social-preview.png'],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articleIndex = articles.findIndex(a => a.slug === slug);
  const article = articles[articleIndex];

  if (!article) {
    notFound();
  }

  // Get article content from Markdown file
  const articleContent = getArticleBySlug(slug);

  if (!articleContent) {
    notFound();
  }

  // Previous and next articles
  const prevArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="article-content">
            <div className="mb-4">
              <Link href="/novice-to-navigator" className="font-bold text-[var(--color-accent-blue)] hover:underline no-underline">Novice to Navigator</Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-6">
              {articleContent.title}
            </h1>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 text-sm font-medium bg-[var(--color-accent-blue)] text-white rounded">{articleContent.meta.section}</span>
              <span className="text-[var(--color-text-muted)]">{articleContent.meta.date}</span>
              <span className="text-[var(--color-text-muted)]">•</span>
              <span className="text-[var(--color-text-muted)]">{articleContent.meta.readTime}</span>
            </div>

            {/* {articleContent.audioFile && (
              <div className="audio-player mb-4">
                <audio controls className="w-full">
                  <source src={`/audio/${articleContent.audioFile}`} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )} */}

            <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 md:p-8 article-body prose prose-invert max-w-none mb-8">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {articleContent.content}
              </ReactMarkdown>
            </div>

            <MultipleCTAs />

            <div className="flex justify-between border-t border-[var(--color-dark-border)] pt-6 mt-8">
              {prevArticle ? (
                <Link href={`/novice-to-navigator/${prevArticle.slug}`} className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium">
                  ← Previous
                </Link>
              ) : <span />}
              {nextArticle ? (
                <Link href={`/novice-to-navigator/${nextArticle.slug}`} className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium ml-auto">
                  Next →
                </Link>
              ) : <span />}
            </div>
          </div>
        </div>
      </div>

      {/* Content Gate Modal - Only shows to human users after scrolling */}
      <SecondEditionNudge />
    </div>
  );
}
