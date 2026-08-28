import { getAllBlogPosts, getFeaturedBlogPosts } from '@/lib/blogUtils';
import Link from 'next/link';
import MultipleCTAs from '@/components/MultipleCTAs';
import InfiniteScrollBlog from '@/components/InfiniteScrollBlog';

export const metadata = {
  title: 'AI Development Blog | Adam Matthew Steinberger',
  description: 'Insights on AI development, chatbot implementation, and business technology from an experienced AI developer in Greenville, SC.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();
  const featuredPosts = await getFeaturedBlogPosts();

  // Get non-featured posts for infinite scroll
  const featuredSlugs = new Set(featuredPosts.map(post => post.slug));
  const nonFeaturedPosts = allPosts.filter(post => !featuredSlugs.has(post.slug));

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center pt-8 pb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent mb-4">
          AI Development Blog
        </h1>
        <h2 className="text-xl font-semibold text-[var(--color-text-muted)] mb-6">
          Insights on AI Development, Chatbots, and Business Technology
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6 shadow-lg text-[var(--color-text-muted)]">
            Stay updated with the latest developments in AI technology, chatbot implementation strategies, and business applications. Learn from real-world experiences building custom AI solutions.
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 bg-clip-text text-transparent">
            Featured Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPosts.slice(0, 3).map((post) => (
              <div key={post.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-6 flex flex-col h-full">
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-accent-blue)] text-white rounded mr-2">{post.category}</span>
                  <span className="text-sm text-[var(--color-text-muted)]">{post.readTime}</span>
                </div>
                <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">{post.title}</h5>
                <p className="text-[var(--color-text-muted)] flex-grow mb-4">{post.description}</p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-4 text-sm text-[var(--color-text-muted)]">
                    <span>By {post.author}</span>
                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="block w-full text-center py-2 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] rounded-lg transition-colors no-underline font-medium" style={{ color: '#000000' }}>
                    Read Article
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All Posts Section with Infinite Scroll */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          All Articles
        </h3>
        {nonFeaturedPosts.length > 0 ? (
          <InfiniteScrollBlog allPosts={nonFeaturedPosts} postsPerPage={6} />
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-purple)]/30 rounded-xl p-8 text-center">
              <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">Blog Coming Soon</h4>
              <p className="text-[var(--color-text-muted)] mb-3">I&apos;m working on creating valuable content about AI development, chatbot implementation, and business technology insights.</p>
              <p className="text-[var(--color-text-muted)]">Check back soon for the latest articles and industry insights!</p>
            </div>
          </div>
        )}
      </section>

      {/* Multiple CTAs */}
      <MultipleCTAs />
    </>
  );
}
