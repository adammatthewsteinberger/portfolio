import Link from 'next/link';

export default function MultipleCTAs() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h4 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-green)] bg-clip-text text-transparent">
        Ready to Transform Your Business with AI?
      </h4>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[var(--color-text-muted)] mb-8">Choose your next step based on your needs:</p>

        {/* Primary CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <a
              href="https://tidycal.com/adammatthewsteinberger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold bg-gradient-to-r from-[var(--color-accent-green)] to-emerald-500 hover:from-emerald-500 hover:to-[var(--color-accent-green)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
              style={{ color: '#ffffff' }}
            >
              <i className="fas fa-calendar"></i> Schedule Free Consultation
            </a>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>For businesses ready to explore AI solutions</p>
          </div>
          <div>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 font-bold bg-gradient-to-r from-[var(--color-accent-blue)] to-blue-500 hover:from-blue-500 hover:to-[var(--color-accent-blue)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 no-underline"
              style={{ color: '#ffffff' }}
            >
              <i className="fas fa-envelope"></i> Contact for Employment
            </Link>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>For employers looking to hire AI talent</p>
          </div>
        </div>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <a
              href="https://chat.adam.matthewsteinberger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold border-2 border-[var(--color-accent-blue-light)] hover:bg-[var(--color-accent-blue)] rounded-lg transition-all duration-300 no-underline"
              style={{ color: '#93c5fd' }}
            >
              <i className="fas fa-play"></i> Try the Demo
            </a>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>Experience the technology</p>
          </div>
          <div>
            <Link
              href="/novice-to-navigator"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold border-2 border-[var(--color-accent-blue-light)] hover:bg-[var(--color-accent-blue)] rounded-lg transition-all duration-300 no-underline"
              style={{ color: '#93c5fd' }}
            >
              <i className="fas fa-graduation-cap"></i> Learn about AI
            </Link>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>33-article education series</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Link
              href="/blog"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold border-2 border-[var(--color-accent-blue-light)] hover:bg-[var(--color-accent-blue)] rounded-lg transition-all duration-300 no-underline"
              style={{ color: '#93c5fd' }}
            >
              <i className="fas fa-newspaper"></i> Read the Blog
            </Link>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>AI insights & case studies</p>
          </div>
          <div>
            <Link
              href="/services"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 font-semibold border-2 border-[var(--color-accent-blue-light)] hover:bg-[var(--color-accent-blue)] rounded-lg transition-all duration-300 no-underline"
              style={{ color: '#93c5fd' }}
            >
              <i className="fas fa-tools"></i> My Services
            </Link>
            <p className="mt-2 text-sm" style={{ color: '#e2e8f0' }}>Browse all of my services</p>
          </div>
        </div>
      </div>
    </section>
  );
}
