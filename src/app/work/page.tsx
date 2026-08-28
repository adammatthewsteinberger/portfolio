import Link from 'next/link';
import { Metadata } from 'next';
import { projects, projectCategories } from '@/data/projects';
import { availabilitySentence } from '@/lib/availability';

export const metadata: Metadata = {
  title: 'Work | Case Studies in AI, Azure & Automation | Adam Matthew Steinberger',
  description: 'Case studies in RAG systems, event-driven microservices, and AI automation — built by Adam Matthew Steinberger, Staff Software Architect & AI Automation Engineer.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work | Case Studies in AI, Azure & Automation | Adam Matthew Steinberger',
    description: 'Case studies in RAG systems, event-driven microservices, and AI automation — built by Adam Matthew Steinberger, Staff Software Architect & AI Automation Engineer.',
    url: 'https://hire.adam.matthewsteinberger.com/work',
  },
};

export default function WorkPage() {
  const featuredProjects = projects.filter(project => project.featured);
  const projectsByCategory = projectCategories.map(category => ({
    category,
    categoryDescription: projects.find(p => p.category === category)?.categoryDescription || '',
    projects: projects.filter(project => project.category === category)
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center pt-8 pb-16 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Work</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-3xl mx-auto">
          Case studies from 13+ years of shipping software — the past year at The Vizius Group first,
          then consulting engagements, Lima One Capital, and volunteer work. Every number is traceable.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProjects.map((project) => (
            <div key={project.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 flex flex-col h-full">
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-accent-blue)] text-white rounded">{project.category}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent-blue)] transition-colors no-underline">
                  {project.title}
                </Link>
              </h3>
              <p className="text-[var(--color-text-muted)] mb-4 flex-grow">{project.description}</p>
              <div className="mb-4">
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs bg-[var(--color-dark-bg)] text-[var(--color-text-muted)] rounded">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-[var(--color-dark-bg)] text-[var(--color-text-muted)] rounded">+{project.technologies.length - 3} more</span>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                  <span><i className="fas fa-clock mr-1"></i>{project.duration}</span>
                  <span className={project.status === 'completed' ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-gold)]'}>
                    <i className="fas fa-circle mr-1 text-xs"></i>{project.status}
                  </span>
                </div>
              </div>
              <Link href={`/work/${project.slug}`} className="inline-flex items-center justify-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium mt-auto">
                View Project <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Projects by Category */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          All Work by Category
        </h2>

        {projectsByCategory.map(({ category, categoryDescription, projects: categoryProjects }) => (
          <div key={category} className="mb-6 max-w-5xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{category}</h3>
              <p className="text-[var(--color-text-muted)]">{categoryDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryProjects.map((project) => (
                <div key={project.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                    <Link href={`/work/${project.slug}`} className="hover:text-[var(--color-accent-blue)] transition-colors no-underline">
                      {project.title}
                    </Link>
                  </h4>
                  <p className="text-[var(--color-text-muted)] mb-4">{project.description}</p>
                  <div className="mb-4">
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span key={index} className="px-2 py-0.5 text-xs bg-[var(--color-dark-bg)] text-[var(--color-text-muted)] rounded">{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
                        <span><i className="fas fa-clock mr-1"></i>{project.duration}</span>
                        <span className={project.status === 'completed' ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-gold)]'}>
                          <i className="fas fa-circle mr-1 text-xs"></i>{project.status}
                        </span>
                      </div>
                      <Link href={`/work/${project.slug}`} className="px-3 py-1 text-sm border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          Want the Person Who Built These on Your Team?
        </h2>
        <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
          {availabilitySentence()} — here&apos;s what I&apos;m looking for and how I interview best.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/hire-me" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-bold rounded-lg transition-colors no-underline">
            <i className="fas fa-briefcase"></i>
            Hire Me
          </Link>
          <Link href="/expertise" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline">
            <i className="fas fa-layer-group"></i>
            The Specialties
          </Link>
        </div>
      </section>

    </div>
  );
}
