import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { isPreview } from '@/lib/siteEnv';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { inter, rajdhani, shareTechMono } from './fonts';
import { OG_IMAGE } from '@/lib/seo';

const SITE_URL = 'https://vibewithadam.matthewsteinberger.com';
const GA_MEASUREMENT_ID = 'G-P4CX07CNRW';
// Set at build time (SITE_ENV=preview) for the develop-branch preview Worker.
const PREVIEW = isPreview();

export const metadata: Metadata = {
  title: {
    default: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    template: '%s | Adam Matthew Steinberger',
  },
  description:
    'Staff Software Architect & AI Automation Engineer in Greenville, SC, building vibey: free and open-source tooling for autonomous software delivery across a pool of coding agents. Looking for developers to help build it. AI platforms, identity, and secretless, auditable deployments for regulated environments.',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    images: [OG_IMAGE],
    siteName: 'Adam Matthew Steinberger',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
  // The preview site canonicalizes to production (metadataBase) and is never indexed.
  robots: PREVIEW ? { index: false, follow: false } : {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Set GOOGLE_SITE_VERIFICATION in the Netlify environment once a real
  // Search Console token exists — do not put the GA4 measurement ID here.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Adam Matthew Steinberger',
      jobTitle: 'Staff Software Architect & AI Automation Engineer',
      url: SITE_URL,
      image: `${SITE_URL}/images/profile-picture.jpg`,
      email: 'adam@matthewsteinberger.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Greenville',
        addressRegion: 'SC',
        addressCountry: 'US',
      },
      sameAs: [
        'https://www.linkedin.com/in/adammatthewsteinberger/',
        'https://github.com/adammatthewsteinberger',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Skidmore College',
        url: 'https://www.skidmore.edu/',
      },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified ScrumMaster (CSM)',
        credentialCategory: 'certification',
        recognizedBy: { '@type': 'Organization', name: 'Scrum Alliance' },
      },
      knowsAbout: [
        'Software Architecture',
        'Multi-agent Orchestration and Autonomous Software Delivery',
        'Agent Sandboxing and Egress Policy',
        'Identity and Access Management (Microsoft Entra ID, Okta IGA, SAML 2.0, OIDC)',
        'Workload Identity Federation and Secretless Delivery',
        'Identity Governance as Code',
        'Multi-vendor LLM Gateways and AI Governance',
        'Tamper-evident Audit Trails',
        'Software Supply-chain Security (SBOM, Keyless Signing, Policy-as-code Admission)',
        'OWASP Top 10 for LLM Applications and NIST AI RMF',
        'SOC 2 Readiness and STRIDE Threat Modeling',
        'Retrieval-Augmented Generation',
        'Model Context Protocol (MCP)',
        'Kubernetes, Helm, GitOps, and KEDA',
        'Microsoft Azure',
        'Python, TypeScript, and .NET',
      ],
      // Fixed-scope freelance packages, described in full on /freelance.
      makesOffer: {
        '@type': 'Offer',
        itemOffered: { '@id': `${SITE_URL}/freelance#service` },
        url: `${SITE_URL}/freelance`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Adam Matthew Steinberger',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${shareTechMono.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#161a26" />
        {!PREVIEW && (<>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        </>)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        {/* Analytics only on the production site. */}
        {!PREVIEW && (<>
        {/* Google Consent Mode v2 - Default Settings */}
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'functionality_storage': 'granted',
              'personalization_storage': 'denied',
              'security_storage': 'granted',
              'wait_for_update': 500
            });
          `}
        </Script>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
          `}
        </Script>
        </>)}

        <Header preview={PREVIEW} />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
