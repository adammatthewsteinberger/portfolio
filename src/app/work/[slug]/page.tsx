import { Metadata } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/projectUtils';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const projectData = projects.find(p => p.slug === slug);

  if (!project || !projectData) {
    return {
       title: 'Work Not Found | Adam Matthew Steinberger',
      description: 'The requested case study could not be found.',
    };
  }

  return {
    title: `${project.title} | Adam Matthew Steinberger — Work`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Adam Matthew Steinberger — Work`,
      description: project.description,
      url: `https://hire.adam.matthewsteinberger.com/work/${slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const projectData = projects.find(p => p.slug === slug);

  if (!project || !projectData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">Work Not Found</h1>
        <p className="text-xl text-[var(--color-text-muted)] mb-6">The requested case study could not be found.</p>
        <Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] text-white font-bold rounded-lg transition-colors no-underline">
          <i className="fas fa-arrow-left"></i>
          Back to Work
        </Link>
      </div>
    );
  }

  const relatedProjects = projects
    .filter(p => p.category === projectData.category && p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {/* Breadcrumb */}
              <nav className="mb-4">
                <ol className="flex items-center gap-2 text-sm">
                  <li>
                    <Link href="/work" className="text-[var(--color-accent-blue)] hover:underline no-underline">Work</Link>
                  </li>
                  <li className="text-[var(--color-text-muted)]">/</li>
                  <li className="text-[var(--color-text-muted)]">{projectData.category}</li>
                  <li className="text-[var(--color-text-muted)]">/</li>
                  <li className="text-[var(--color-text-muted)]">{project.title}</li>
                </ol>
              </nav>

              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">{project.heroTitle || project.title}</h1>
              <h2 className="text-xl text-[var(--color-text-muted)] mb-6">{project.heroSubtitle || project.subtitle}</h2>
              <p className="text-lg text-[var(--color-text-muted)]">{project.description}</p>
            </div>
            <div>
              <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
                <div className="mb-4">
                  <strong className="text-[var(--color-text-primary)]">Category:</strong>
                  <span className="ml-2 px-2 py-1 text-sm bg-[var(--color-accent-blue)] text-white rounded">{projectData.category}</span>
                </div>
                <div className="mb-4">
                  <strong className="text-[var(--color-text-primary)]">Duration:</strong>
                  <span className="ml-2 text-[var(--color-text-muted)]">{project.duration}</span>
                </div>
                <div className="mb-4">
                  <strong className="text-[var(--color-text-primary)]">Status:</strong>
                  <span className={`ml-2 inline-flex items-center gap-1 ${project.status === 'completed' ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-gold)]'}`}>
                    <i className="fas fa-circle text-xs"></i>
                    {project.status}
                  </span>
                </div>
                {project.technologies && (
                  <div>
                    <strong className="text-[var(--color-text-primary)]">Technologies:</strong>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-0.5 text-xs bg-[var(--color-dark-bg)] text-[var(--color-text-muted)] rounded">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-coral)]/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle text-[var(--color-accent-coral)]"></i>
                Challenge
              </h3>
              <p className="text-[var(--color-text-muted)]">{project.challenge}</p>
            </div>
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-gold)]/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <i className="fas fa-lightbulb text-[var(--color-accent-gold)]"></i>
                Solution
              </h3>
              <p className="text-[var(--color-text-muted)]">{project.solution}</p>
            </div>
            <div className="bg-[var(--color-dark-card)] border border-[var(--color-accent-green)]/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <i className="fas fa-trophy text-[var(--color-accent-green)]"></i>
                Results
              </h3>
              <p className="text-[var(--color-text-muted)]">{project.results}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 md:p-8 article-body prose prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({children}) => <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent mb-4">{children}</h2>,
                    h2: ({children}) => <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 mt-6">{children}</h3>,
                    h3: ({children}) => <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 mt-4">{children}</h4>,
                    p: ({children}) => <p className="text-[var(--color-text-muted)] mb-4">{children}</p>,
                    ul: ({children}) => <ul className="text-[var(--color-text-muted)] mb-4 list-disc pl-6">{children}</ul>,
                    ol: ({children}) => <ol className="text-[var(--color-text-muted)] mb-4 list-decimal pl-6">{children}</ol>,
                    code: ({children, ...props}) => {
                      const isInline = !props.className;
                      return isInline
                        ? <code className="bg-[var(--color-dark-bg)] px-1 rounded text-[var(--color-accent-blue)]">{children}</code>
                        : <pre className="bg-[var(--color-dark-bg)] p-4 rounded-lg overflow-auto"><code>{children}</code></pre>;
                    },
                    blockquote: ({children}) => (
                      <blockquote className="border-l-4 border-[var(--color-accent-blue)] pl-4 my-4 italic text-[var(--color-text-muted)]">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {project.content}
                </ReactMarkdown>
              </div>
            </div>
            <div>
              {/* Technical Details */}
              <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6 mb-6">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Technical Details</h4>
                <div className="space-y-4">
                  <div>
                    <strong className="text-[var(--color-accent-blue)]">Tech Stack:</strong>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{project.techStack}</p>
                  </div>
                  <div>
                    <strong className="text-[var(--color-accent-blue)]">Architecture:</strong>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{project.architecture}</p>
                  </div>
                  <div>
                    <strong className="text-[var(--color-accent-blue)]">Key Learnings:</strong>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">{project.lessons}</p>
                  </div>
                </div>
              </div>

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="bg-[var(--color-dark-card)] border border-[var(--color-dark-border)] rounded-xl p-6">
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">Related Projects</h4>
                  <div className="space-y-4">
                    {relatedProjects.map((relatedProject) => (
                      <Link
                        key={relatedProject.slug}
                        href={`/work/${relatedProject.slug}`}
                        className="block no-underline"
                      >
                        <div className="bg-[var(--color-dark-bg)] border border-[var(--color-dark-border)] rounded-lg p-4 hover:border-[var(--color-accent-blue)]/50 transition-colors">
                          <h5 className="font-bold text-[var(--color-text-primary)] mb-2">{relatedProject.title}</h5>
                          <p className="text-sm text-[var(--color-text-muted)] mb-2">
                            {relatedProject.description.substring(0, 100)}...
                          </p>
                          <span className="px-2 py-0.5 text-xs bg-[var(--color-dark-card-alt)] text-[var(--color-text-muted)] rounded">{relatedProject.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-blue-light)] bg-clip-text text-transparent">
              Interested in Similar Work?
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-8">
              I&apos;d love to discuss how I can help you achieve similar results for your organization.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue-light)] font-bold rounded-lg transition-colors no-underline" style={{ color: '#000000' }}>
                <i className="fas fa-envelope"></i>
                Get In Touch
              </Link>
              <Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-accent-blue)] text-[var(--color-accent-blue)] hover:bg-[var(--color-accent-blue)] hover:text-white font-bold rounded-lg transition-colors no-underline">
                <i className="fas fa-arrow-left"></i>
                View All Work
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent-gold)] to-amber-500 hover:from-amber-500 hover:to-[var(--color-accent-gold)] font-bold rounded-lg transition-all no-underline" style={{ color: '#000000' }}>
                <i className="fas fa-cogs"></i>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
