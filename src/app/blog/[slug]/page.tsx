import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blogUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import MultipleCTAs from '@/components/MultipleCTAs';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Adam Matthew Steinberger`,
    description: post.description,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    creator: 'Adam Matthew Steinberger',
    publisher: 'Adam Matthew Steinberger LLC',
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hire.adam.matthewsteinberger.com/blog/${slug}`,
      siteName: 'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
      images: [
        {
          url: '/images/social-preview.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/images/social-preview.png'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex justify-center items-center gap-2">
              <Link href="/blog" className="no-underline text-[var(--color-accent-blue)] hover:underline">Blog</Link>
              <span className="text-[var(--color-text-muted)]">&gt;</span>
              <span className="text-[var(--color-text-muted)]">{post.title}</span>
            </div>
          </nav>

          {/* Article Meta */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[var(--color-accent-blue)] text-white rounded mr-2">{post.category}</span>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded">{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-6">
            {post.title}
          </h1>

          <div className="max-w-2xl mx-auto mb-6">
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6 shadow-lg text-[var(--color-text-muted)]">
              {post.description}
            </div>
          </div>

          {/* Author and Date Info */}
          <div className="mb-6">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="flex items-center">
                <i className="fas fa-user-circle mr-2 text-[var(--color-accent-blue)]"></i>
                <span className="text-[var(--color-text-muted)]">By <strong className="text-[var(--color-text-primary)]">{post.author}</strong></span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-calendar-alt mr-2 text-[var(--color-accent-blue)]"></i>
                <span className="text-[var(--color-text-muted)]">{new Date(post.publishedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2 text-[var(--color-accent-blue)]"></i>
                <span className="text-[var(--color-text-muted)]">{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-center flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 md:p-10 article-body prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />

      {/* Back to Blog */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium">
            <i className="fas fa-arrow-left"></i>
            Back to Blog
          </Link>
        </div>
      </section>
    </>
  );
}
