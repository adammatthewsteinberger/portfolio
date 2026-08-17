import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InfiniteScrollBlog from '../InfiniteScrollBlog';
import { BlogContent } from '@/lib/blogUtils';

const createMockPosts = (count: number): BlogContent[] => {
  return Array.from({ length: count }, (_, i) => ({
    slug: `post-${i + 1}`,
    title: `Test Post ${i + 1}`,
    description: `Description for post ${i + 1}`,
    category: i % 2 === 0 ? 'AI Development' : 'Technology',
    author: 'Adam Steinberger',
    publishedDate: `2025-01-${String(i + 1).padStart(2, '0')}`,
    readTime: `${(i % 5) + 3} min read`,
    tags: ['AI', 'Testing', 'Tech'],
    featured: i < 3,
    content: `Content for post ${i + 1}`,
  }));
};

describe('InfiniteScrollBlog', () => {
  describe('rendering', () => {
    it('renders initial posts', () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={6} />);

      // Should show first 6 posts
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 6')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 7')).not.toBeInTheDocument();
    });

    it('renders post cards with all content', () => {
      const posts = createMockPosts(1);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={1} />);

      // Check for post elements
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Description for post 1')).toBeInTheDocument();
      expect(screen.getByText('AI Development')).toBeInTheDocument();
      expect(screen.getByText('By Adam Steinberger')).toBeInTheDocument();
    });

    it('renders category badges for multiple posts', () => {
      const posts = createMockPosts(4);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={4} />);

      expect(screen.getAllByText('AI Development').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Technology').length).toBeGreaterThan(0);
    });

    it('renders tags', () => {
      const posts = createMockPosts(1);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={1} />);

      expect(screen.getByText('AI')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
    });

    it('renders read more links', () => {
      const posts = createMockPosts(3);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      const readMoreLinks = screen.getAllByRole('link', { name: 'Read More' });
      expect(readMoreLinks).toHaveLength(3);
      expect(readMoreLinks[0]).toHaveAttribute('href', '/blog/post-1');
    });
  });

  describe('load more functionality', () => {
    it('shows load more button when there are more posts', () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      expect(
        screen.getByRole('button', { name: 'Load More Articles' })
      ).toBeInTheDocument();
    });

    it('does not show load more button when all posts are displayed', () => {
      const posts = createMockPosts(3);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={6} />);

      expect(
        screen.queryByRole('button', { name: 'Load More Articles' })
      ).not.toBeInTheDocument();
    });

    it('shows loading state when button is clicked', async () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      fireEvent.click(screen.getByRole('button', { name: 'Load More Articles' }));

      expect(screen.getByText('Loading more articles...')).toBeInTheDocument();
    });

    it('loads more posts after clicking and waiting', async () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      expect(screen.queryByText('Test Post 4')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Load More Articles' }));

      // Wait for the setTimeout to complete
      await waitFor(
        () => {
          expect(screen.getByText('Test Post 4')).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });
  });

  describe('empty state', () => {
    it('handles empty posts array', () => {
      render(<InfiniteScrollBlog allPosts={[]} postsPerPage={6} />);

      expect(
        screen.queryByRole('button', { name: 'Load More Articles' })
      ).not.toBeInTheDocument();
    });
  });

  describe('default props', () => {
    it('uses default postsPerPage of 6', () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} />);

      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 6')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 7')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('stops offering more posts once a load returns nothing new', async () => {
      // `hasMore` is seeded once from props and isn't resynced on prop
      // changes (a deliberate lazy-initializer trade-off — see
      // InfiniteScrollBlog.tsx). Shrinking `allPosts` after the first render
      // reproduces the case where a scheduled load finds nothing left,
      // exercising the `newPosts.length === 0` branch.
      const posts = createMockPosts(6);
      const { rerender } = render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);
      expect(screen.getByRole('button', { name: 'Load More Articles' })).toBeInTheDocument();

      rerender(<InfiniteScrollBlog allPosts={posts.slice(0, 3)} postsPerPage={3} />);
      fireEvent.click(screen.getByRole('button', { name: 'Load More Articles' }));

      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: 'Load More Articles' })
        ).not.toBeInTheDocument();
      });
    });

    it('loads more posts automatically when scrolled near the bottom of the page', async () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      expect(screen.queryByText('Test Post 4')).not.toBeInTheDocument();

      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 5000,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'offsetHeight', {
        value: 5200,
        configurable: true,
      });

      fireEvent.scroll(window);

      await waitFor(
        () => {
          expect(screen.getByText('Test Post 4')).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    it('does not trigger a load on scroll when nowhere near the bottom of the page', () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 0,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'offsetHeight', {
        value: 10_000,
        configurable: true,
      });

      fireEvent.scroll(window);

      expect(screen.queryByText('Test Post 4')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading more articles...')).not.toBeInTheDocument();
    });

    it('ignores a scroll-triggered load while already loading', async () => {
      const posts = createMockPosts(10);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={3} />);

      fireEvent.click(screen.getByRole('button', { name: 'Load More Articles' }));
      expect(screen.getByText('Loading more articles...')).toBeInTheDocument();

      // A scroll event that fires mid-load should be a no-op (the loading
      // guard short-circuits it) rather than scheduling a second load.
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 5000,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'offsetHeight', {
        value: 5200,
        configurable: true,
      });
      fireEvent.scroll(window);

      await waitFor(() => {
        expect(screen.getByText('Test Post 4')).toBeInTheDocument();
      });
      // Only the batch from the original click landed — posts 4-6.
      expect(screen.queryByText('Test Post 7')).not.toBeInTheDocument();
    });

    it('a bottom-of-page scroll is a no-op once hasMore is already false', () => {
      // hasMore is already false here (6 posts, 6 per page): no "Load More"
      // button renders, and a scroll event past the threshold must hit the
      // `!hasMore` side of the loadMorePosts guard rather than re-loading.
      const posts = createMockPosts(6);
      render(<InfiniteScrollBlog allPosts={posts} postsPerPage={6} />);

      expect(
        screen.queryByRole('button', { name: 'Load More Articles' })
      ).not.toBeInTheDocument();

      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        value: 5000,
        configurable: true,
      });
      Object.defineProperty(document.documentElement, 'offsetHeight', {
        value: 5200,
        configurable: true,
      });
      fireEvent.scroll(window);

      expect(screen.queryByText('Loading more articles...')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Load More Articles' })
      ).not.toBeInTheDocument();
    });
  });
});
