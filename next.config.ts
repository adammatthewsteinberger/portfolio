import type { NextConfig } from 'next';

// Hosts for the "Ask about Adam" chat subdomain. chatwithadam.matthewsteinberger.com is a
// second custom domain on the same Cloudflare Worker; the host-aware rules below keep
// exactly one canonical URL per page. See AGENTS.md → "Chat subdomain" for the curl
// checklist to re-run after any Next.js / @opennextjs/cloudflare upgrade.
const CHAT_HOST = 'chatwithadam.matthewsteinberger.com';
// The canonical host of the main site; the chat has its own, CHAT_HOST.
const SITE_HOST = 'vibewithadam.matthewsteinberger.com';

// The consulting catalogue (/services/*) and its pre-2026 root-level aliases
// (/ai-greenville, /ai-greenville.html, …) were retired with the rest of the
// looking-for-work copy (the-vibey-project/vibey#238). Every old URL still
// lands somewhere real: the homepage, which says what the site is for now.
const LEGACY_SERVICE_SLUGS = [
  'ai-greer', 'ai-simpsonville', 'ai-greenville', 'ai-spartanburg', 'ai-financial-services',
  'ai-healthcare', 'ai-real-estate', 'ai-restaurants', 'ai-law-firms', 'ai-manufacturing',
  'ai-marketing-agencies', 'ai-sales-teams', 'ai-nonprofits', 'ai-startups', 'ai-enterprise',
  'ai-boutiques', 'ai-privacy-tech', 'ai-helpdesk', 'ai-copywriting', 'custom-chatbots',
  'chatgpt-developer', 'claude-ai', 'gemini-ai', 'llm-development', 'rag-development',
  'chat-engine-development', 'context-engineering', 'prompt-engineering', 'lora-fine-tuning',
  'vllm-api-development', 'ai-agents', 'ai-automation', 'ai-business', 'ai-consulting',
  'ai-consultant', 'ai-expert', 'ai-implementation', 'ai-integration', 'ai-marketing',
  'ai-solutions', 'ai-strategy', 'ai-training', 'ai-services', 'upstate-ai-developer',
  'ai-developer-near-me',
];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // chat host: "/" serves the /chat page (URL unchanged).
        { source: '/', has: [{ type: 'host', value: CHAT_HOST }], destination: '/chat' },
      ],
    };
  },
  async redirects() {
    return [
      // --- chat subdomain (must stay first) ---
      // chat host: /chat is canonical at the root.
      {
        source: '/chat',
        has: [{ type: 'host', value: CHAT_HOST }],
        destination: `https://${CHAT_HOST}/`,
        permanent: true,
      },
      // chat host: every other page belongs to the site host. The lookahead keeps
      // /api/*, /_next/* and file-extension assets serving on the chat host.
      {
        source: '/:path((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).+)',
        has: [{ type: 'host', value: CHAT_HOST }],
        destination: `https://${SITE_HOST}/:path`,
        permanent: true,
      },
      // site host: /chat lives on the chat host. Other hosts (localhost, deploy
      // previews) are untouched so /chat serves directly there.
      {
        source: '/chat',
        has: [{ type: 'host', value: SITE_HOST }],
        destination: `https://${CHAT_HOST}/`,
        permanent: true,
      },
      // --- retired with the looking-for-work copy (the-vibey-project/vibey#238) ---
      // /hire-me became /join-me: developers, then governments and military, then universities.
      { source: '/hire-me', destination: '/join-me', permanent: true },
      // The executive edition existed to sell (hire full-time, or engage the LLC). Each page
      // lands on the engineering page it mirrored.
      { source: '/for-executives', destination: '/', permanent: true },
      { source: '/for-executives/work', destination: '/work', permanent: true },
      { source: '/for-executives/work/:slug', destination: '/work/:slug', permanent: true },
      { source: '/for-executives/engage', destination: '/contact', permanent: true },
      // The consulting catalogue and its legacy aliases.
      { source: '/services', destination: '/', permanent: true },
      { source: '/services/:slug', destination: '/', permanent: true },
      ...LEGACY_SERVICE_SLUGS.flatMap((slug) => [
        { source: `/${slug}.html`, destination: '/', permanent: true },
        { source: `/${slug}`, destination: '/', permanent: true },
      ]),
      {
        source: '/novice-to-navigator.html',
        destination: '/novice-to-navigator',
        permanent: true,
      },
      {
        source: '/sitemap.html',
        destination: '/sitemap',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/what-is-ai-really.html',
        destination: '/novice-to-navigator/what-is-ai-really',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-are-the-different-types-of-ai-systems.html',
        destination:
          '/novice-to-navigator/what-are-the-different-types-of-ai-systems',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning.html',
        destination:
          '/novice-to-navigator/whats-the-difference-between-ai-machine-learning-and-deep-learning',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/how-does-ai-learn-from-data.html',
        destination: '/novice-to-navigator/how-does-ai-learn-from-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-prompt-engineering-and-why-is-it-important.html',
        destination:
          '/novice-to-navigator/what-is-prompt-engineering-and-why-is-it-important',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-a-chatbot-and-how-does-it-work.html',
        destination:
          '/novice-to-navigator/what-is-a-chatbot-and-how-does-it-work',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-chatbots-understand-human-language.html',
        destination:
          '/novice-to-navigator/how-do-chatbots-understand-human-language',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/why-do-some-chatbots-perform-better-than-others.html',
        destination:
          '/novice-to-navigator/why-do-some-chatbots-perform-better-than-others',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-makes-a-chatbot-valuable-for-businesses.html',
        destination:
          '/novice-to-navigator/what-makes-a-chatbot-valuable-for-businesses',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-chatbots-replace-human-roles-in-certain-tasks.html',
        destination:
          '/novice-to-navigator/can-chatbots-replace-human-roles-in-certain-tasks',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-retrieval-augmented-generation-rag.html',
        destination:
          '/novice-to-navigator/what-is-retrieval-augmented-generation-rag',
        permanent: true,
      },
      {
        source: '/novice-to-navigator/why-doesnt-ai-just-know-everything.html',
        destination: '/novice-to-navigator/why-doesnt-ai-just-know-everything',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-does-a-rag-chatbot-use-my-specific-data.html',
        destination:
          '/novice-to-navigator/how-does-a-rag-chatbot-use-my-specific-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-is-a-vector-database-and-why-is-it-used-in-rag.html',
        destination:
          '/novice-to-navigator/what-is-a-vector-database-and-why-is-it-used-in-rag',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-are-embeddings-and-how-do-they-help-chatbots.html',
        destination:
          '/novice-to-navigator/what-are-embeddings-and-how-do-they-help-chatbots',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-start-building-a-custom-ai-chatbot.html',
        destination:
          '/novice-to-navigator/how-do-you-start-building-a-custom-ai-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-technologies-power-a-rag-chatbot.html',
        destination:
          '/novice-to-navigator/what-technologies-power-a-rag-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers.html',
        destination:
          '/novice-to-navigator/how-do-you-ensure-a-chatbot-gives-accurate-and-relevant-answers',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-a-chatbot-integrate-with-my-existing-systems.html',
        destination:
          '/novice-to-navigator/can-a-chatbot-integrate-with-my-existing-systems',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-building-a-custom-chatbot-expensive-or-time-intensive.html',
        destination:
          '/novice-to-navigator/is-building-a-custom-chatbot-expensive-or-time-intensive',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-ai-chatbots-give-incorrect-or-made-up-answers.html',
        destination:
          '/novice-to-navigator/can-ai-chatbots-give-incorrect-or-made-up-answers',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses.html',
        destination:
          '/novice-to-navigator/how-do-you-prevent-a-chatbot-from-giving-harmful-or-off-brand-responses',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-my-business-data-safe-when-using-a-chatbot.html',
        destination:
          '/novice-to-navigator/is-my-business-data-safe-when-using-a-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-competitors-exploit-my-chatbots-knowledge-base.html',
        destination:
          '/novice-to-navigator/can-competitors-exploit-my-chatbots-knowledge-base',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-you-evaluate-a-chatbots-performance.html',
        destination:
          '/novice-to-navigator/how-do-you-evaluate-a-chatbots-performance',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-industries-are-using-ai-chatbots-effectively.html',
        destination:
          '/novice-to-navigator/what-industries-are-using-ai-chatbots-effectively',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-can-a-chatbot-increase-revenue-or-reduce-costs.html',
        destination:
          '/novice-to-navigator/how-can-a-chatbot-increase-revenue-or-reduce-costs',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/can-chatbots-streamline-lead-generation-or-customer-onboarding.html',
        destination:
          '/novice-to-navigator/can-chatbots-streamline-lead-generation-or-customer-onboarding',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/is-my-business-ready-for-an-ai-chatbot.html',
        destination:
          '/novice-to-navigator/is-my-business-ready-for-an-ai-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-if-my-business-has-limited-content-or-data.html',
        destination:
          '/novice-to-navigator/what-if-my-business-has-limited-content-or-data',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/what-should-i-consider-before-investing-in-a-custom-chatbot.html',
        destination:
          '/novice-to-navigator/what-should-i-consider-before-investing-in-a-custom-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/whats-involved-in-working-with-an-expert-to-build-a-chatbot.html',
        destination:
          '/novice-to-navigator/whats-involved-in-working-with-an-expert-to-build-a-chatbot',
        permanent: true,
      },
      {
        source:
          '/novice-to-navigator/how-do-i-get-my-own-custom-ai-chatbot.html',
        destination:
          '/novice-to-navigator/how-do-i-get-my-own-custom-ai-chatbot',
        permanent: true,
      },
      // --- 2026 site rebuild: old IA -> new IA ---
      { source: '/about', destination: '/story', permanent: true },
      { source: '/projects', destination: '/work', permanent: true },
      {
        source: '/projects/:slug',
        destination: '/work/:slug',
        permanent: true,
      },
      // Retired post about leaving a job; the career narrative lives on /story.
      {
        source: '/blog/why-im-leaving-a-job-i-liked',
        destination: '/story',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
