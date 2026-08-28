import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Adam Matthew Steinberger',
  description:
    'Learn how we collect, use, and protect your personal information when you visit our website.',
  alternates: { canonical: '/privacy' },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">Privacy Policy</h1>
        <p className="text-[var(--color-text-muted)] mb-16">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Introduction</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            This Privacy Policy explains how Adam Matthew Steinberger
            (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
            your personal information when you visit our website at{' '}
            <a href="https://hire.adam.matthewsteinberger.com" className="text-[var(--color-accent-blue)] hover:underline">
              hire.adam.matthewsteinberger.com
            </a>
            .
          </p>
          <p className="text-[var(--color-text-muted)]">
            We are committed to protecting your privacy and ensuring your data is
            handled responsibly and in compliance with applicable data protection
            laws, including the General Data Protection Regulation (GDPR) for
            European Economic Area (EEA) users.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Information We Collect</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            When you visit our website, we may collect the following types of
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
            <li>
              <strong className="text-[var(--color-text-primary)]">Analytics Data:</strong> Information about your visit, such as
              pages viewed, time spent on the site, referring websites, and general
              location (country/city).
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Technical Data:</strong> Your IP address (anonymized), browser
              type, device type, and operating system.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Cookie Data:</strong> Information stored in cookies to remember
              your preferences and improve your experience.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">How We Use Your Information</h2>
          <p className="text-[var(--color-text-muted)] mb-4">We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
            <li>
              <strong className="text-[var(--color-text-primary)]">Website Analytics:</strong> To understand how visitors use our
              site and improve our content and services.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Performance Optimization:</strong> To ensure our website loads
              quickly and functions properly on different devices.
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Security:</strong> To protect against malicious activity and
              ensure the security of our website.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Cookies and Tracking Technologies</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            We use Google Analytics to collect and analyze information about how
            visitors use our website. Google Analytics uses cookies and similar
            technologies to track user behavior.
          </p>
          <p className="text-[var(--color-text-muted)] mb-4">
            You can control cookie preferences through the cookie consent banner
            that appears when you first visit our site. You can change your
            preferences at any time by clearing your browser cookies and revisiting
            the site.
          </p>

          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-6 mb-4">Types of Cookies We Use:</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--color-dark-card)]">
                  <th className="border border-[var(--color-dark-border)] px-4 py-3 text-left text-[var(--color-text-primary)]">Cookie Type</th>
                  <th className="border border-[var(--color-dark-border)] px-4 py-3 text-left text-[var(--color-text-primary)]">Purpose</th>
                  <th className="border border-[var(--color-dark-border)] px-4 py-3 text-left text-[var(--color-text-primary)]">Required</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-muted)]">
                <tr>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Essential Cookies</td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">
                    Required for the website to function properly and remember your
                    cookie preferences
                  </td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Yes</td>
                </tr>
                <tr>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Analytics Cookies</td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">
                    Help us understand how visitors interact with our website
                    (Google Analytics)
                  </td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">No</td>
                </tr>
                <tr>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Advertising Cookies</td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Used to deliver personalized advertisements</td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">No</td>
                </tr>
                <tr>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">Personalization Cookies</td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">
                    Remember your preferences and settings for a better experience
                  </td>
                  <td className="border border-[var(--color-dark-border)] px-4 py-3">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Google Consent Mode v2</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            We have implemented Google Consent Mode v2 to ensure compliance with
            data protection regulations, particularly for users in the European
            Economic Area (EEA). This allows us to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
            <li>
              Set default consent states that deny data collection until you provide
              consent
            </li>
            <li>
              Dynamically adjust Google Analytics behavior based on your consent
              preferences
            </li>
            <li>
              Respect your privacy choices while still providing aggregate,
              anonymized insights
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Third-Party Services</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            We use Google Analytics, a web analytics service provided by Google
            LLC. Google Analytics uses cookies to help us analyze how users
            interact with our site.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Google&apos;s ability to use and share information collected by Google
            Analytics is restricted by the Google Analytics Terms of Service and
            Google Privacy Policy. Learn more about how Google uses data at{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-blue)] hover:underline"
            >
              How Google uses data when you use our partners&apos; sites or apps
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Your Rights (GDPR)</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            If you are located in the European Economic Area (EEA), you have
            certain data protection rights, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
            <li><strong className="text-[var(--color-text-primary)]">Right to Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Rectification:</strong> Request correction of inaccurate personal data</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Data Portability:</strong> Receive your data in a structured format</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Object:</strong> Object to our processing of your personal data</li>
            <li><strong className="text-[var(--color-text-primary)]">Right to Withdraw Consent:</strong> Withdraw your consent at any time</li>
          </ul>
          <p className="text-[var(--color-text-muted)] mt-4">
            To exercise any of these rights, please contact us using the contact
            information provided below.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Data Retention</h2>
          <p className="text-[var(--color-text-muted)]">
            We retain analytics data for a period of 26 months (Google Analytics
            default), after which it is automatically deleted. Cookie consent
            preferences are stored in your browser&apos;s local storage until you
            clear them or change your preferences.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Data Security</h2>
          <p className="text-[var(--color-text-muted)]">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access, loss, or
            misuse. However, please note that no method of transmission over the
            Internet is 100% secure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Children&apos;s Privacy</h2>
          <p className="text-[var(--color-text-muted)]">
            Our website is not directed to children under the age of 13, and we do
            not knowingly collect personal information from children under 13. If
            you believe we have inadvertently collected information from a child,
            please contact us immediately.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Changes to This Privacy Policy</h2>
          <p className="text-[var(--color-text-muted)]">
            We may update this Privacy Policy from time to time to reflect changes
            in our practices or legal requirements. We will notify you of any
            material changes by updating the &quot;Last updated&quot; date at the
            top of this page.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Contact Us</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <ul className="space-y-2 text-[var(--color-text-muted)]">
            <li>
              <strong className="text-[var(--color-text-primary)]">Email:</strong>{' '}
              <a href="mailto:adam@matthewsteinberger.com" className="text-[var(--color-accent-blue)] hover:underline">
                adam@matthewsteinberger.com
              </a>
            </li>
            <li>
              <strong className="text-[var(--color-text-primary)]">Website:</strong>{' '}
              <a href="https://hire.adam.matthewsteinberger.com" className="text-[var(--color-accent-blue)] hover:underline">
                hire.adam.matthewsteinberger.com
              </a>
            </li>
          </ul>
        </section>

        <div className="bg-[var(--color-accent-blue)]/20 border border-[var(--color-accent-blue)] rounded-lg p-4 mt-12">
          <p className="text-[var(--color-text-muted)]">
            <strong className="text-[var(--color-text-primary)]">Note:</strong> This privacy policy is a template and should be
            reviewed by a legal professional to ensure it meets all applicable
            legal requirements for your specific situation.
          </p>
        </div>
      </div>
    </div>
  );
}
