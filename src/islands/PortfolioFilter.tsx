import { useState, useMemo } from 'react';

interface Project {
  title: string;
  slug: string;
  client: string;
  industry: string;
  category: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  description: string;
  isFeatured?: boolean;
}

interface Props {
  projects: Project[];
}

const CATEGORIES = ['All', 'Web Design', 'Web Development', 'eCommerce', 'Mobile', 'Branding'];

export default function PortfolioFilter({ projects }: Props) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div>
      {/* Filter buttons */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2 mb-8 justify-center"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="button"
            aria-pressed={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
              activeFilter === cat
                ? 'bg-[var(--accent)] text-[#0A0E1A] font-bold'
                : 'border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live region */}
      <p aria-live="polite" className="sr-only">
        {filtered.length} project{filtered.length !== 1 ? 's' : ''} shown
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <article
            key={project.slug}
            className="group rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-colors"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-[var(--bg)]">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-sm">
                  No image
                </div>
              )}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-sm">
                {project.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-[var(--text)] text-base mb-1 group-hover:text-[var(--accent)] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">{project.client}</p>
              <p className="text-sm text-[var(--text-dim)] line-clamp-2 mb-4">{project.description}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs border border-[var(--border)] text-[var(--text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={`/portfolio/${project.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:gap-2 transition-all duration-150"
              >
                View Case Study →
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p className="text-3xl mb-3" aria-hidden="true">📂</p>
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
