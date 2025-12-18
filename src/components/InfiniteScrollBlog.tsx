'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BlogContent } from '@/lib/blogUtils';

interface InfiniteScrollBlogProps {
  allPosts: BlogContent[];
  postsPerPage?: number;
}

export default function InfiniteScrollBlog({ allPosts, postsPerPage = 6 }: InfiniteScrollBlogProps) {
  const [displayedPosts, setDisplayedPosts] = useState<BlogContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Initialize with first batch of posts
  useEffect(() => {
    const initialPosts = allPosts.slice(0, postsPerPage);
    setDisplayedPosts(initialPosts);
    setHasMore(allPosts.length > postsPerPage);
  }, [allPosts, postsPerPage]);

  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate async loading for better UX
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const newPosts = allPosts.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setDisplayedPosts(prev => [...prev, ...newPosts]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < allPosts.length);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }, 500);
  }, [allPosts, currentPage, postsPerPage, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post) => (
          <div key={post.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6 flex flex-col h-full hover:border-[var(--color-accent-gold)] transition-colors">
            <div className="mb-3">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded mr-2">{post.category}</span>
              <span className="text-sm text-[var(--color-text-muted)]">{post.readTime}</span>
            </div>
            <h5 className="text-lg font-bold text-[var(--color-text-primary)] mb-3">{post.title}</h5>
            <p className="text-[var(--color-text-muted)] flex-grow mb-4">{post.description}</p>
            <div className="mt-auto">
              {post.tags && post.tags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-block px-2 py-0.5 text-xs bg-[var(--color-dark-bg)] text-[var(--color-text-muted)] rounded">{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center mb-4 text-sm text-[var(--color-text-muted)]">
                <span>By {post.author}</span>
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="block w-full text-center py-2 border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center my-8">
          <div className="inline-block w-8 h-8 border-4 border-[var(--color-accent-blue)] border-t-transparent rounded-full animate-spin" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2 text-[var(--color-text-muted)]">Loading more articles...</p>
        </div>
      )}

      {!hasMore && displayedPosts.length > 0 && (
        <div className="text-center my-8">
          <p className="text-[var(--color-text-muted)]">You&apos;ve reached the end of our articles!</p>
        </div>
      )}

      {hasMore && !loading && displayedPosts.length > 0 && (
        <div className="text-center my-8">
          <button
            className="px-6 py-2 border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors font-medium"
            onClick={loadMorePosts}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
