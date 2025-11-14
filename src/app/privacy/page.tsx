import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Adam Matthew Steinberger',
  description:
    'Learn how we collect, use, and protect your personal information when you visit our website.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-lg-10'>
          <h1 className='display-4 mb-4'>Privacy Policy</h1>
          <p className='text-muted mb-5'>
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Introduction</h2>
            <p>
              This Privacy Policy explains how Adam Matthew Steinberger
              (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects
              your personal information when you visit our website at{' '}
              <a href='https://hire.adam.matthewsteinberger.com'>
                hire.adam.matthewsteinberger.com
              </a>
              .
            </p>
            <p>
              We are committed to protecting your privacy and ensuring your data is
              handled responsibly and in compliance with applicable data protection
              laws, including the General Data Protection Regulation (GDPR) for
              European Economic Area (EEA) users.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Information We Collect</h2>
            <p>
              When you visit our website, we may collect the following types of
              information:
            </p>
            <ul>
              <li>
                <strong>Analytics Data:</strong> Information about your visit, such as
                pages viewed, time spent on the site, referring websites, and general
                location (country/city).
              </li>
              <li>
                <strong>Technical Data:</strong> Your IP address (anonymized), browser
                type, device type, and operating system.
              </li>
              <li>
                <strong>Cookie Data:</strong> Information stored in cookies to remember
                your preferences and improve your experience.
              </li>
            </ul>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>
                <strong>Website Analytics:</strong> To understand how visitors use our
                site and improve our content and services.
              </li>
              <li>
                <strong>Performance Optimization:</strong> To ensure our website loads
                quickly and functions properly on different devices.
              </li>
              <li>
                <strong>Security:</strong> To protect against malicious activity and
                ensure the security of our website.
              </li>
            </ul>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Cookies and Tracking Technologies</h2>
            <p>
              We use Google Analytics to collect and analyze information about how
              visitors use our website. Google Analytics uses cookies and similar
              technologies to track user behavior.
            </p>
            <p>
              You can control cookie preferences through the cookie consent banner
              that appears when you first visit our site. You can change your
              preferences at any time by clearing your browser cookies and revisiting
              the site.
            </p>

            <h3 className='h4 mt-4 mb-3'>Types of Cookies We Use:</h3>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead className='table-light'>
                  <tr>
                    <th>Cookie Type</th>
                    <th>Purpose</th>
                    <th>Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Essential Cookies</td>
                    <td>
                      Required for the website to function properly and remember your
                      cookie preferences
                    </td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Analytics Cookies</td>
                    <td>
                      Help us understand how visitors interact with our website
                      (Google Analytics)
                    </td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Advertising Cookies</td>
                    <td>Used to deliver personalized advertisements</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Personalization Cookies</td>
                    <td>
                      Remember your preferences and settings for a better experience
                    </td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Google Consent Mode v2</h2>
            <p>
              We have implemented Google Consent Mode v2 to ensure compliance with
              data protection regulations, particularly for users in the European
              Economic Area (EEA). This allows us to:
            </p>
            <ul>
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

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Third-Party Services</h2>
            <p>
              We use Google Analytics, a web analytics service provided by Google
              LLC. Google Analytics uses cookies to help us analyze how users
              interact with our site.
            </p>
            <p>
              Google&apos;s ability to use and share information collected by Google
              Analytics is restricted by the Google Analytics Terms of Service and
              Google Privacy Policy. Learn more about how Google uses data at{' '}
              <a
                href='https://policies.google.com/technologies/partner-sites'
                target='_blank'
                rel='noopener noreferrer'
              >
                How Google uses data when you use our partners&apos; sites or apps
              </a>
              .
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Your Rights (GDPR)</h2>
            <p>
              If you are located in the European Economic Area (EEA), you have
              certain data protection rights, including:
            </p>
            <ul>
              <li>
                <strong>Right to Access:</strong> Request a copy of the personal data
                we hold about you
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate personal data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your personal
                data
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request limitation of
                how we use your data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in a
                structured format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to our processing of your
                personal data
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw your consent at
                any time
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the contact
              information provided below.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Data Retention</h2>
            <p>
              We retain analytics data for a period of 26 months (Google Analytics
              default), after which it is automatically deleted. Cookie consent
              preferences are stored in your browser&apos;s local storage until you
              clear them or change your preferences.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access, loss, or
              misuse. However, please note that no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Children&apos;s Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13, and we do
              not knowingly collect personal information from children under 13. If
              you believe we have inadvertently collected information from a child,
              please contact us immediately.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes
              in our practices or legal requirements. We will notify you of any
              material changes by updating the &quot;Last updated&quot; date at the
              top of this page.
            </p>
          </section>

          <section className='mb-5'>
            <h2 className='h3 mb-3'>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul className='list-unstyled'>
              <li>
                <strong>Email:</strong>{' '}
                <a href='mailto:adam@matthewsteinberger.com'>
                  adam@matthewsteinberger.com
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href='https://hire.adam.matthewsteinberger.com'>
                  hire.adam.matthewsteinberger.com
                </a>
              </li>
            </ul>
          </section>

          <div className='alert alert-info mt-5'>
            <p className='mb-0'>
              <strong>Note:</strong> This privacy policy is a template and should be
              reviewed by a legal professional to ensure it meets all applicable
              legal requirements for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
