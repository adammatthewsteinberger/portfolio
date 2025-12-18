import Link from 'next/link';
import { Metadata } from 'next';
import { projects, projectCategories } from '@/data/projects';

export const metadata: Metadata = {
  title: 'AI Development Projects | Adam Matthew Steinberger Portfolio',
  description: 'Explore Adam Matthew Steinberger\'s portfolio of AI development projects including enterprise solutions, RAG chatbots, and open-source tools.',
  openGraph: {
    title: 'AI Development Projects | Adam Matthew Steinberger Portfolio',
    description: 'Explore Adam Matthew Steinberger\'s portfolio of AI development projects including enterprise solutions, RAG chatbots, and open-source tools.',
    url: 'https://hire.adam.matthewsteinberger.com/projects',
  },
};

export default function ProjectsPage() {
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
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">AI Development Projects</h1>
        <p className="text-xl text-[var(--color-text-muted)] max-w-3xl mx-auto">
          Explore my portfolio of innovative AI solutions across enterprise, non-profit, and open-source projects.
          Each project showcases cutting-edge technology and real-world impact.
        </p>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featuredProjects.map((project) => (
            <div key={project.slug} className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 flex flex-col h-full">
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-[var(--color-accent-blue)] text-white rounded">{project.category}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                <Link href={`/projects/${project.slug}`} className="hover:text-[var(--color-accent-blue)] transition-colors no-underline">
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
              <Link href={`/projects/${project.slug}`} className="inline-flex items-center justify-center px-4 py-2 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline font-medium mt-auto">
                View Project <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Projects by Category */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
          All Projects by Category
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
                    <Link href={`/projects/${project.slug}`} className="hover:text-[var(--color-accent-blue)] transition-colors no-underline">
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
                      <Link href={`/projects/${project.slug}`} className="px-3 py-1 text-sm border border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white rounded-lg transition-colors no-underline">
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
          Ready to Start Your AI Project?
        </h2>
        <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
          Let&apos;s discuss how I can help bring your AI vision to life with proven expertise and innovative solutions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-bold rounded-lg transition-colors no-underline">
            <i className="fas fa-envelope"></i>
            Get In Touch
          </Link>
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline">
            <i className="fas fa-cogs"></i>
            View Services
          </Link>
        </div>
      </section>

      {/* Side Projects */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-center text-lg text-[var(--color-text-muted)] mb-6">Side Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-lg p-4">
            <h5 className="font-bold text-[var(--color-text-primary)] mb-1">
              <a
                href="https://humbleberger.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-blue)] transition-colors no-underline"
              >
                Humbleberger Ministries <i className="fas fa-external-link-alt text-xs ml-1"></i>
              </a>
            </h5>
            <p className="text-sm text-[var(--color-text-muted)]">Messianic ministry and outreach organization</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-lg p-4">
            <h5 className="font-bold text-[var(--color-text-primary)] mb-1">
              <a
                href="https://messiahfirst.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-blue)] transition-colors no-underline"
              >
                Messiah First for America PAC <i className="fas fa-external-link-alt text-xs ml-1"></i>
              </a>
            </h5>
            <p className="text-sm text-[var(--color-text-muted)]">Political action committee</p>
          </div>
          <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-lg p-4">
            <h5 className="font-bold text-[var(--color-text-primary)] mb-1">
              <a
                href="https://theautisticapologist.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-accent-blue)] transition-colors no-underline"
              >
                The Autistic Apologist <i className="fas fa-external-link-alt text-xs ml-1"></i>
              </a>
            </h5>
            <p className="text-sm text-[var(--color-text-muted)]">Messianic apologetics, philosophy and science</p>
          </div>
        </div>
      </section>
    </div>
  );
}
