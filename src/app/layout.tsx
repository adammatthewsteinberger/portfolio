import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:
    'Hire Expert AI Chatbot Developer in Greenville SC | Upstate Region Custom GPT Solutions | Adam Matthew Steinberger',
  description:
    "Hire Adam Matthew Steinberger—Greenville's leading AI chatbot developer for custom GPT solutions. Serving Upstate businesses with secure, branded chatbots using ChatGPT, Claude, Gemini & Mistral. Local Upstate region expertise.",
  keywords:
    'hire AI developer Greenville SC, custom chatbot developer Greenville, GPT engineer Upstate, Upstate Region AI expert, ChatGPT integration specialist, Claude AI developer SC, Gemini implementation Greenville, Mistral AI engineer Greenville, local AI developer Upstate, custom GPT solutions Greenville, AI chatbot agency Greenville, Greenville South Carolina AI engineer, Adam Matthew Steinberger, AI chatbot solutions SC, local AI expert Greenville, custom AI chatbots Upstate South Carolina, business AI solutions Greenville, Claude Gemini Mistral integration SC',
  authors: [{ name: 'Adam Matthew Steinberger' }],
  creator: 'Adam Matthew Steinberger',
  publisher: 'Adam Matthew Steinberger LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hire.adam.matthewsteinberger.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'Hire Local AI Chatbot Developer | Greenville & Upstate South Carolina',
    description:
      'Expert AI developer in Greenville, SC specializing in custom chatbots for Upstate Region businesses. Local expertise in ChatGPT, Claude, Gemini & Mistral solutions.',
    url: 'https://hire.adam.matthewsteinberger.com',
    siteName:
      'Hire Adam Matthew Steinberger - Upstate South Carolina AI Expert',
    images: [
      {
        url: '/images/social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Adam Matthew Steinberger - Upstate South Carolina AI Expert',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire Local AI Expert in Greenville | Custom Chatbot Solutions',
    description:
      "Greenville's premier AI developer for custom business chatbots. Local expertise in ChatGPT, Claude, Gemini & Mistral implementation.",
    images: ['/images/social-preview.png'],
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
  verification: {
    google: 'G-P4CX07CNRW',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.google-analytics.com' />
        <link rel='stylesheet' href='/bootstrap.min.css' />
        <link rel='stylesheet' href='/font-awesome.min.css' />
        <link rel='stylesheet' href='/fonts.css' />
        <link rel='stylesheet' href='/styles.css' />
      </head>
      <body className={inter.className}>
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-P4CX07CNRW'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P4CX07CNRW');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <script src='/bootstrap.bundle.min.js' defer></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
