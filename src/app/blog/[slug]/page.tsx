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
    <main>
      {/* Hero Section */}
      <section className="container text-center my-5" style={{marginTop: '0 !important', paddingTop: '0 !important'}}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <div className="d-flex justify-content-center">
                <Link href="/blog" className="text-decoration-none text-primary me-2">Blog</Link>
                <span className="text-muted">&gt;</span>
                <span className="text-muted ms-2">{post.title}</span>
              </div>
            </nav>

            {/* Article Meta */}
            <div className="mb-4">
              <span className="badge bg-primary me-2">{post.category}</span>
              <span className="badge bg-secondary">{post.readTime}</span>
            </div>

            <h1 className="fw-bold headline-gradient mb-4" style={{fontSize: '2.5rem'}}>
              {post.title}
            </h1>

            <div className="mx-auto mb-4" style={{maxWidth: '700px'}}>
              <div className="alert custom-alert p-4 mb-4 shadow-lg">
                {post.description}
              </div>
            </div>

            {/* Author and Date Info */}
            <div className="mb-4">
              <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
                <div className="d-flex align-items-center">
                  <i className="fas fa-user-circle me-2 text-primary"></i>
                  <span>By <strong>{post.author}</strong></span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-calendar-alt me-2 text-primary"></i>
                  <span>{new Date(post.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-clock me-2 text-primary"></i>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4">
                <div className="d-flex justify-content-center flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge bg-light text-dark">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card article-body mb-5 border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />

      {/* Back to Blog */}
      <section className="container my-5">
        <div className="text-center">
          <Link href="/blog" className="btn btn-outline-primary btn-lg">
            <i className="fas fa-arrow-left me-2"></i>
            Back to Blog
          </Link>
        </div>
      </section>
      
    </main>
  );
}