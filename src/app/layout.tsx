import CookieConsent from '@/components/CookieConsent';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { availabilityLong, availabilityShort } from '@/lib/availability';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { inter, rajdhani, shareTechMono } from './fonts';

const SITE_URL = 'https://hire.adam.matthewsteinberger.com';
const GA_MEASUREMENT_ID = 'G-P4CX07CNRW';

export const metadata: Metadata = {
  title: {
    default: 'Adam Matthew Steinberger | Staff Software Architect & AI Automation Engineer',
    template: '%s | Adam Matthew Steinberger',
  },
  description:
    'Staff Software Architect & AI Automation Engineer in Greenville, SC. RAG systems, event-driven Azure microservices, and automation pipelines. Available from September 2026.',
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
    siteName: 'Adam Matthew Steinberger',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Adam Matthew Steinberger — Staff Software Architect & AI Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
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
      knowsAbout: [
        'Software Architecture',
        'Retrieval-Augmented Generation',
        'Multi-vendor LLM Gateways and AI Governance',
        'Event-driven Microservices',
        'Microsoft Azure (AKS, Functions, Service Bus, Bicep, Terraform, Key Vault)',
        'Python and .NET Backends',
        'Kubernetes, Helm, GitOps, and Secretless DevSecOps',
        'Identity Governance (Okta IGA, Entra ID, SAML/OIDC)',
        'Process Engineering and Security-First Scrum',
      ],
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
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

        <Header availabilityShortLabel={availabilityShort()} availabilityLongLabel={availabilityLong()} />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
