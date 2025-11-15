import { notFound } from 'next/navigation';
import { articles } from '@/data/articles';
import { getArticleBySlug, getArticleMetadata } from '@/lib/markdownUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import ContentGateModal from '@/components/ContentGateModal';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
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
  const pageUrl = `https://hire.adam.matthewsteinberger.com/novice-to-navigator/${slug}`;
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
      siteName: 'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="article-content">
            <div className="mb-3">
              <Link href="/novice-to-navigator" className="fw-bold">Novice to Navigator</Link>
            </div>

            <h1 className="article-title mb-4" style={{display: 'block'}}>{articleContent.title}</h1>
            <div className="article-meta mb-4">
              <span className="badge bg-primary me-2">{articleContent.meta.section}</span>
              <span className="text-muted">{articleContent.meta.date}</span>
              <span className="text-muted ms-2">•</span>
              <span className="text-muted ms-2">{articleContent.meta.readTime}</span>
            </div>

            {/* {articleContent.audioFile && (
              <div className="audio-player mb-4">
                <audio controls className="w-100">
                  <source src={`/audio/${articleContent.audioFile}`} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )} */}

            <div className="article-body mb-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {articleContent.content}
              </ReactMarkdown>
            </div>

            <MultipleCTAs />

            <div className="d-flex justify-content-between border-top pt-4 mt-5">
              {prevArticle ? (
                <Link href={`/novice-to-navigator/${prevArticle.slug}`} className="btn btn-outline-primary">
                  ← Previous
                </Link>
              ) : <span />}
              {nextArticle ? (
                <Link href={`/novice-to-navigator/${nextArticle.slug}`} className="btn btn-outline-primary ms-auto">
                  Next →
                </Link>
              ) : <span />}
            </div>
          </div>
        </div>
      </div>

      {/* Content Gate Modal - Only shows to human users after scrolling */}
      <ContentGateModal />
    </div>
  );
} 