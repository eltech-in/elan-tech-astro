import { useRef, useState } from 'react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime?: string;
  coverImage?: string;
}

interface Props {
  allPosts: BlogPost[];
  initialCount?: number;
}

const PAGE_SIZE = 6;

export default function LoadMorePosts({ allPosts, initialCount = 6 }: Props) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const newPostsStartRef = useRef<number>(initialCount);
  const containerRef = useRef<HTMLDivElement>(null);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  function loadMore() {
    setIsLoading(true);
    newPostsStartRef.current = visibleCount;
    // Simulate async (could be instant since data is already available)
    setTimeout(() => {
      setVisibleCount((prev) => {
        const next = prev + PAGE_SIZE;
        return Math.min(next, allPosts.length);
      });
      setIsLoading(false);
      // Focus first newly added post
      requestAnimationFrame(() => {
        const articles = containerRef.current?.querySelectorAll<HTMLElement>('article');
        if (articles && articles[newPostsStartRef.current]) {
          articles[newPostsStartRef.current].focus();
        }
      });
    }, 10);
  }

  return (
    <div>
      <div
        ref={containerRef}
        aria-live="polite"
        aria-label="Blog posts"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {visiblePosts.map((post, i) => (
          <article
            key={post.slug}
            tabIndex={i >= newPostsStartRef.current && i > initialCount - 1 ? -1 : undefined}
            className="group rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] flex flex-col hover:border-[var(--accent)] transition-colors focus:outline-none"
          >
            {/* Cover */}
            <div className="relative h-44 overflow-hidden bg-[var(--bg)]">
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="600"
                  height="350"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--accent-dim)] to-[var(--bg)]" aria-hidden="true" />
              )}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-[var(--text)] text-base leading-snug line-clamp-2 mb-2 group-hover:text-[var(--accent)] transition-colors">
                <a
                  href={`/blog/${post.slug}`}
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] before:absolute before:inset-0"
                >
                  {post.title}
                </a>
              </h3>
              <p className="text-sm text-[var(--text-dim)] line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-3">
                <time dateTime={post.publishDate}>{post.publishDate}</time>
                {post.readTime && <span>{post.readTime}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="rounded-xl border-2 border-[var(--border)] px-8 py-3 text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {isLoading ? 'Loading...' : `Load More (${allPosts.length - visibleCount} remaining)`}
          </button>
        </div>
      )}
    </div>
  );
}
