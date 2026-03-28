import { useState, useMemo } from 'react';

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
  posts: BlogPost[];
}

const CATEGORIES = [
  'All',
  'Web Design',
  'SEO',
  'eCommerce',
  'Digital Marketing',
  'Nagpur Business',
  'Accessibility',
];

export default function BlogFilter({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <div>
      {/* Category filter */}
      <div
        role="group"
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2 mb-8"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              activeCategory === cat
                ? 'bg-[var(--accent)] text-[#0A0E1A] font-bold'
                : 'border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="group rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] flex flex-col hover:border-[var(--accent)] transition-colors"
          >
            {/* Cover image */}
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
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] before:absolute before:inset-0 before:z-10"
                >
                  {post.title}
                </a>
              </h3>
              <p className="text-sm text-[var(--text-dim)] line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-3">
                <time dateTime={post.publishDate}>{post.publishDate}</time>
                {post.readTime && <span>{post.readTime}</span>}
              </div>
              <a
                href={`/blog/${post.slug}`}
                aria-label={`Read more: ${post.title}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:gap-2 transition-all duration-150 relative z-20"
              >
                Read More →
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p className="text-3xl mb-3" aria-hidden="true">📭</p>
          <p>No articles in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
